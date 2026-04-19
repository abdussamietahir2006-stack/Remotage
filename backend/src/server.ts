import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { connectDB, disconnectDB } from './config/db';
import { errorHandler } from './middleware/error.middleware';
import { ApiError } from './utils/ApiError';
import routes from './routes/index';

const app = express();

// ── Security ──────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────
app.use(cors({
  origin:      env.ALLOWED_ORIGINS,
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// ── Logging ───────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Rate Limiting ─────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      100,
  message:  'Too many requests, please try again later.',
}));

// ── Health Check ──────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success:     true,
    message:     'Remotage API is running.',
    environment: env.NODE_ENV,
    timestamp:   new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────
app.use('/api', routes);

// ── 404 Handler ───────────────────────────────────────
app.use((_req, _res, next) => {
  next(new ApiError(404, 'Route not found.'));
});

// ── Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────
const start = async () => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Remotage API running on port ${env.PORT}`);
    console.log(`📍 Environment: ${env.NODE_ENV}`);
    console.log(`🌐 Health: http://localhost:${env.PORT}/api/health`);
  });

  // ── Graceful Shutdown ────────────────────────────────
  const shutdown = async (signal: string) => {
    console.log(`\n⚠️  ${signal} received. Shutting down...`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
};

start();