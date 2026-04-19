import dotenv from 'dotenv';
dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

const optional = (key: string, fallback: string): string =>
  process.env[key] ?? fallback;

export const env = {
  NODE_ENV:              optional('NODE_ENV', 'development'),
  PORT:                  parseInt(optional('PORT', '5000'), 10),
  MONGODB_URI:           required('MONGODB_URI'),
  JWT_SECRET:            required('JWT_SECRET'),
  JWT_EXPIRES_IN:        optional('JWT_EXPIRES_IN', '7d'),
  CLOUDINARY_CLOUD_NAME: optional('CLOUDINARY_CLOUD_NAME', ''),
  CLOUDINARY_API_KEY:    optional('CLOUDINARY_API_KEY', ''),
  CLOUDINARY_API_SECRET: optional('CLOUDINARY_API_SECRET', ''),
  ADMIN_EMAIL:           required('ADMIN_EMAIL'),
  ADMIN_PASSWORD:        required('ADMIN_PASSWORD'),
  FRONTEND_URL:          optional('FRONTEND_URL', 'http://localhost:3000'),
  ALLOWED_ORIGINS:       optional('ALLOWED_ORIGINS', 'http://localhost:3000').split(','),
};