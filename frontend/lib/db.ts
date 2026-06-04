import mongoose from 'mongoose';
import { env } from '@/lib/env-config';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: 'remotage',
      bufferCommands: false,
    };

    console.log('🔌 Connecting to MongoDB...');
    cached.promise = mongoose.connect(env.MONGODB_URI, opts).then((m) => {
      console.log('✅ MongoDB connected successfully.');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
