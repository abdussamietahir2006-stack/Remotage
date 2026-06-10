import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import mongoose from 'mongoose';
import { BlogPost } from '../models/index';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found');
    process.exit(1);
  }
  await mongoose.connect(uri, { dbName: 'remotage' });
  console.log('Connected to DB');

  const posts = await BlogPost.find({});
  console.log(`Found ${posts.length} posts. Starting migration...`);

  for (const post of posts) {
    const oldSlug = post.slug;
    
    // Clean the slug just like we do in the frontend/backend:
    // 1. Strip domain/blog prefix and leading slashes
    let cleaned = oldSlug.toLowerCase()
      .replace(/^(https?:\/\/[^\/]+)?(\/)?blog\//i, "")
      .replace(/^\/+/, "");

    // 2. Convert other slashes to hyphens
    cleaned = cleaned.replace(/\//g, "-");

    // 3. Remove non-slug characters
    cleaned = cleaned.replace(/[^a-z0-9\s-]/g, "");

    // 4. Clean spaces and multiple hyphens
    cleaned = cleaned
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    // 5. Strip leading/trailing hyphens/slashes
    cleaned = cleaned.replace(/^[-\/]+|[-\/]+$/g, "");

    if (oldSlug !== cleaned) {
      console.log(`Migrating post "${post.title}":`);
      console.log(`  Old Slug: "${oldSlug}"`);
      console.log(`  New Slug: "${cleaned}"`);
      
      // Update slug
      post.slug = cleaned;
      await post.save();
      console.log(`  Status: Successfully updated!`);
    } else {
      console.log(`Post "${post.title}" already has clean slug: "${oldSlug}"`);
    }
  }

  console.log('Migration complete!');
  process.exit(0);
}

main().catch(console.error);
