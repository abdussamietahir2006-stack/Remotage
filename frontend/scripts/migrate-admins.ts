import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

const migrateAdmins = async () => {
  try {
    const mongoose = (await import('mongoose')).default;
    const { Admin } = await import('../models/Admin');
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not found in environment');

    await mongoose.connect(uri, { dbName: 'remotage' } as any);
    console.log('✅ Connected to MongoDB');

    // Delete existing admins (optional)
    await Admin.deleteMany({});

    const admin1_email = process.env.ADMIN_EMAIL_1;
    const admin1_password = process.env.ADMIN_PASSWORD_1;
    const admin2_email = process.env.ADMIN_EMAIL_2;
    const admin2_password = process.env.ADMIN_PASSWORD_2;

    if (!admin1_email || !admin1_password) {
      throw new Error('Admin credentials (ADMIN_EMAIL_1, ADMIN_PASSWORD_1) are missing in environment variables.');
    }

    // Create admin users
    const admins = [
      {
        email: admin1_email,
        password: admin1_password,
        role: 'admin',
      },
    ];

    if (admin2_email && admin2_password) {
      admins.push({
        email: admin2_email,
        password: admin2_password,
        role: 'admin',
      });
    }

    for (const adminData of admins) {
      const existing = await Admin.findOne({ email: adminData.email });
      if (!existing) {
        const admin = new Admin(adminData);
        await admin.save();
        console.log(`✅ Created admin: ${adminData.email}`);
      } else {
        console.log(`⚠️  Admin already exists: ${adminData.email}`);
      }
    }

    console.log('✅ Migration complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrateAdmins();
