/**
 * Proxy Routes
 * Dynamic routing to backend services
 */
import { Request, Response, NextFunction } from 'express';
import { RoutingService } from '../../services/routing.service.js';
/**
 * Create proxy middleware with the routing service
 * This is a catch-all middleware, not a route
 */
export declare function createProxyMiddleware(routingService: RoutingService): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=proxy.routes.d.ts.map