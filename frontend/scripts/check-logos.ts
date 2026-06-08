import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
let MONGODB_URI = '';
try {
  const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const cleanLine = line.trim();
    if (cleanLine && !cleanLine.startsWith('#')) {
      const index = cleanLine.indexOf('=');
      if (index !== -1) {
        const key = cleanLine.slice(0, index).trim();
        const value = cleanLine.slice(index + 1).trim().replace(/^['"]|['"]$/g, ''); // strip quotes
        if (key === 'MONGODB_URI') {
          MONGODB_URI = value;
          break;
        }
      }
    }
  }
} catch (e) {
  console.error('Error reading env file:', e);
}

if (!MONGODB_URI) {
  console.error('MONGODB_URI is missing!');
  process.exit(1);
}

// Define Schema
const PageContentSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, unique: true },
  content: { type: Map, of: String },
  images: { type: Map, of: String },
}, { strict: false });

const PageContent = mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema, 'pagecontents');

async function main() {
  await mongoose.connect(MONGODB_URI!);
  console.log('Connected to MongoDB successfully.');

  const homeDoc = await PageContent.findOne({ pageSlug: 'home' });
  if (!homeDoc) {
    console.log('No home document found!');
  } else {
    console.log('Current images in Home Page:');
    const images = Object.fromEntries(homeDoc.images || new Map());
    console.log(JSON.stringify(images, null, 2));
  }

  await mongoose.disconnect();
}

main().catch(console.error);
