import express, { Express, Request, Response, NextFunction } from 'express';
import taskRoutes from './routes/task.routes.js';
import projectRoutes from './routes/project.routes.js';
import { loggerMiddleware } from './middlewares/logger.middleware.js';

const app: Express = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Routes
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Backend Service 2',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  if (!res.headersSent) {
    res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Route ${req.method} ${req.path} not found`,
      service: 'Service 2'
    });
  }
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Service2] Error:', err);
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: err.message || 'An unexpected error occurred',
      service: 'Service 2'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`[Service2] Backend Service 2 running on port ${PORT}`);
  console.log(`[Service2] Health check: http://localhost:${PORT}/health`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('[Service2] Uncaught Exception:', error);
  // Don't exit - log and continue
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('[Service2] Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit - log and continue
});
