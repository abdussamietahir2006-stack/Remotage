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
  console.log('Number of posts found:', posts.length);
  for (const post of posts) {
    console.log(`- ID: ${post._id}, Title: "${post.title}", Slug: "${post.slug}"`);
  }

  process.exit(0);
}

main().catch(console.error);
