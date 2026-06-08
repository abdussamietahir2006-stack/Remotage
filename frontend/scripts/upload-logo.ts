import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Parse env variables manually
const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8');
const envVars: Record<string, string> = {};
for (const line of envFile.split('\n')) {
  const cleanLine = line.trim();
  if (cleanLine && !cleanLine.startsWith('#')) {
    const index = cleanLine.indexOf('=');
    if (index !== -1) {
      const key = cleanLine.slice(0, index).trim();
      const value = cleanLine.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
      envVars[key] = value;
    }
  }
}

const {
  MONGODB_URI,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = envVars;

if (!MONGODB_URI || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('Missing required environment variables in .env.local!');
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key:    CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Define Schema
const PageContentSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, unique: true },
  content: { type: Map, of: String },
  images: { type: Map, of: String },
}, { strict: false });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema, 'pagecontents');

const LOGO_PATH = 'C:\\Users\\abdus\\.gemini\\antigravity-ide\\brain\\e9b6e2f1-dc09-4fa5-8817-b49c9cf53261\\monogram_wide_themed_1780958221653.png';

async function main() {
  if (!fs.existsSync(LOGO_PATH)) {
    console.error(`Logo file not found at ${LOGO_PATH}`);
    process.exit(1);
  }

  console.log('Uploading logo to Cloudinary...');
  const uploadResult = await cloudinary.uploader.upload(LOGO_PATH, {
    folder: 'remotage',
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });

  const logoUrl = uploadResult.secure_url;
  console.log(`✅ Uploaded successfully! Cloudinary URL: ${logoUrl}`);

  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI!);

  const homeDoc = await PageContent.findOne({ pageSlug: 'home' });
  if (!homeDoc) {
    console.error('Home document not found in database!');
    process.exit(1);
  }

  // Set images.clientLogo3 to the new URL
  const images = homeDoc.images || new Map();
  images.set('clientLogo3', logoUrl);
  homeDoc.images = images;

  // Mark modified for Map in Mongoose
  homeDoc.markModified('images');
  await homeDoc.save();

  console.log('✅ Updated clientLogo3 in database successfully!');
  await mongoose.disconnect();
}

main().catch(console.error);
