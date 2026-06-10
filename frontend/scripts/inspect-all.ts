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
  console.log('Posts in database:');
  posts.forEach(p => {
    console.log(`- ID: ${p._id.toString()}`);
    console.log(`  Title: ${p.title}`);
    console.log(`  Slug: ${p.slug}`);
    console.log(`  Status: ${p.status}`);
  });

  process.exit(0);
}

main().catch(console.error);
