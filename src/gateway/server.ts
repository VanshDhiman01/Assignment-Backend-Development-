import express, { Express, Request, Response } from 'express';
import { ConfigLoader } from '../utils/config-loader.js';
import { RoutingService } from '../services/routing.service.js';
import { Logger } from '../utils/logger.js';
import { createHealthRoutes } from './routes/health.routes.js';
import { createProxyMiddleware } from './routes/proxy.routes.js';

export class GatewayServer {
  private app: Express;
  private configLoader: ConfigLoader;
  private routingService: RoutingService;
  private server: any;

  constructor() {
    this.app = express();
    this.configLoader = new ConfigLoader();
    this.routingService = new RoutingService(this.configLoader);
    
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
    
    // Listen for config changes
    this.configLoader.onConfigChange((config) => {
      Logger.info('Configuration reloaded, routing updated');
      // Recreate routing service with new config
      this.routingService = new RoutingService(this.configLoader);
    });
  }

  /**
   * Setup Express middleware
   */
  private setupMiddleware(): void {
    // Parse JSON bodies
    this.app.use(express.json());
    
    // Parse URL-encoded bodies
    this.app.use(express.urlencoded({ extended: true }));

    // Trust proxy for accurate IP addresses
    this.app.set('trust proxy', true);

    // Request logging
    this.app.use((req: Request, res: Response, next) => {
      Logger.info(`${req.method} ${req.path} from ${req.ip}`);
      next();
    });
  }

  /**
   * Setup routes
   */
  private setupRoutes(): void {
    // Health and info routes - use shared configLoader
    const healthRoutes = createHealthRoutes(this.configLoader);
    this.app.use('/', healthRoutes);
    
    // Dynamic proxy middleware (catch-all) - use the same routing service instance
    // This must be last to catch all unmatched routes
    const proxyMiddleware = createProxyMiddleware(this.routingService);
    this.app.use(proxyMiddleware);
  }

  /**
   * Setup error handling
   */
  private setupErrorHandling(): void {
    // 404 handler
    this.app.use((req: Request, res: Response) => {
      if (!res.headersSent) {
        res.status(404).json({
          error: 'Not Found',
          message: `Route ${req.method} ${req.path} not found`
        });
      }
    });

    // Global error handler
    this.app.use((err: Error, req: Request, res: Response, next: any) => {
      Logger.error('Unhandled error:', err);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: err.message || 'An unexpected error occurred'
        });
      }
    });
  }

  /**
   * Start the gateway server
   */
  start(): void {
    const config = this.configLoader.getConfig();
    const port = config.port || 3000;

    this.server = this.app.listen(port, () => {
      Logger.info(`API Gateway started on port ${port}`);
      Logger.info(`Health check: http://localhost:${port}/health`);
      Logger.info(`Gateway info: http://localhost:${port}/gateway/info`);
    });
  }

  /**
   * Stop the gateway server
   */
  stop(): void {
    if (this.server) {
      this.server.close();
      this.configLoader.stopWatching();
      Logger.info('API Gateway stopped');
    }
  }
}

// This file is imported by index.ts, so no direct execution needed here

