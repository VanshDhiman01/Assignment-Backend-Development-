import { Request, Response, NextFunction } from 'express';
import { RoutingService } from '../../services/routing.service.js';

/**
 * Create proxy middleware with the routing service
 * This is a catch-all middleware, not a route
 */
export function createProxyMiddleware(routingService: RoutingService) {
  return (req: Request, res: Response, next: NextFunction): void => {
    routingService.handleRequest(req, res, next);
  };
}

