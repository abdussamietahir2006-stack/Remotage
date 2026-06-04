import { dbConnect } from '@/lib/backend/db';
import { Admin } from '@/lib/backend/models/Admin.model';
import { PasswordReset } from '@/lib/backend/models/PasswordReset.model';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { env } from '@/lib/backend/config/env';
import { ApiResponse } from '@/lib/backend/utils/ApiResponse';
import { ApiError } from '@/lib/backend/utils/ApiError';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    let email = '';
    try {
      const body = await request.json();
      email = body.email;
    } catch {
      throw new ApiError(400, 'Invalid request body.');
    }

    if (!email) {
      throw new ApiError(400, 'Email is required.');
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return ApiResponse({
        statusCode: 200,
        message: 'If this email exists, a reset link has been sent.',
      });
    }

    await PasswordReset.deleteMany({ email });

    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await PasswordReset.create({
      email,
      token: resetToken,
      expiresAt,
    });

    const resetLink = `${env.FRONTEND_URL}/admin/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    try {
      const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: false,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: env.SMTP_FROM,
        to: email,
        subject: 'Reset Your Remotage Admin Password',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
                .header { background: #0A0A0A; color: #D4AF37; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
                .button { background: #D4AF37; color: black; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
                .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
                .link { word-break: break-all; color: #D4AF37; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>REMOTAGE</h1>
                </div>
                <div class="content">
                  <h2>Password Reset Request</h2>
                  <p>Hello Admin,</p>
                  <p>You requested to reset your Remotage admin password. Click the button below to proceed:</p>
                  
                  <a href="${resetLink}" class="button">Reset Password</a>
                  
                  <p>Or copy and paste this link in your browser:</p>
                  <p class="link">${resetLink}</p>
                  
                  <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                  
                  <p><strong>Important:</strong></p>
                  <ul>
                    <li>This link expires in 1 hour</li>
                    <li>If you didn't request this, please ignore this email</li>
                    <li>Never share this link with anyone</li>
                  </ul>
                  
                  <p>Questions? Contact support@remotage.com</p>
                </div>
                <div class="footer">
                  <p>&copy; 2026 Remotage. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Reset email sent to ${email}`);

    } catch (error) {
      console.error('❌ Email send error:', error);
      console.log(`\n🔗 Test link (copy to browser):\n${resetLink}\n`);
    }

    return ApiResponse({
      statusCode: 200,
      message: 'If this email exists, a reset link has been sent.',
    });
  } catch (error: any) {
    return ApiResponse({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error',
    });
  }
}
