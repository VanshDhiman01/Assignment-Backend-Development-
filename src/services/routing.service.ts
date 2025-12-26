import { Request, Response, NextFunction } from 'express';
import { RouteConfig } from '../types/index.js';
import { ConfigLoader } from '../utils/config-loader.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { RateLimitMiddleware } from '../middlewares/rate-limit.middleware.js';
import { ValidationMiddleware } from '../middlewares/validation.middleware.js';
import { ProxyService } from './proxy.service.js';
import { Logger } from '../utils/logger.js';

export class RoutingService {
  private configLoader: ConfigLoader;
  private authMiddleware: AuthMiddleware;
  private rateLimitMiddleware: RateLimitMiddleware;
  private validationMiddleware: ValidationMiddleware;
  private proxyService: ProxyService;

  constructor(configLoader: ConfigLoader) {
    this.configLoader = configLoader;
    this.authMiddleware = new AuthMiddleware(configLoader);
    this.rateLimitMiddleware = new RateLimitMiddleware(configLoader);
    this.validationMiddleware = new ValidationMiddleware();
    this.proxyService = new ProxyService();
  }

  handleRequest = (req: Request, res: Response, next: NextFunction): void => {
    const method = req.method as string;
    const path = req.path;

    Logger.debug(`Incoming request: ${method} ${path}`);

    // Find matching route
    const route = this.configLoader.findRoute(path, method);

    if (!route) {
      Logger.warn(`No route found for ${method} ${path}`);
      res.status(404).json({
        error: 'Not Found',
        message: `No route configured for ${method} ${path}`
      });
      return;
    }

    Logger.info(`Routing ${method} ${path} to ${route.target}`);

    // Store route in request for middleware access
    (req as any).route = route;

    // Build middleware chain
    const middlewareChain: Array<(req: Request, res: Response, next: NextFunction) => void> = [];

    // 1. Authentication (if required)
    if (route.authRequired) {
      middlewareChain.push(this.authMiddleware.verifyToken);
    }

    // 2. Rate limiting
    const rateLimiter = this.rateLimitMiddleware.getRateLimiter(route);
    middlewareChain.push(rateLimiter);

    // 3. Validation
    if (route.validation) {
      middlewareChain.push(this.validationMiddleware.validateRequest(route));
    }

    // 4. Proxy to backend
    const proxy = this.proxyService.createProxy(route);
    middlewareChain.push(proxy as any);

    // Execute middleware chain
    this.executeMiddlewareChain(middlewareChain, req, res, next);
  };

  /**
   * Execute middleware chain sequentially
   */
  private executeMiddlewareChain(
    middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>,
    req: Request,
    res: Response,
    next: NextFunction,
    index: number = 0
  ): void {
    if (index >= middlewares.length) {
      next();
      return;
    }

    const middleware = middlewares[index];
    middleware(req, res, (err?: any) => {
      if (err) {
        Logger.error('Middleware error:', err);
        if (!res.headersSent) {
          res.status(500).json({
            error: 'Internal Server Error',
            message: err.message || 'An error occurred while processing the request'
          });
        }
        return;
      }
      this.executeMiddlewareChain(middlewares, req, res, next, index + 1);
    });
  }
}

