/**
 * Routing Service
 * Handles dynamic route matching and middleware application
 */
import { Request, Response, NextFunction } from 'express';
import { ConfigLoader } from '../utils/config-loader.js';
export declare class RoutingService {
    private configLoader;
    private authMiddleware;
    private rateLimitMiddleware;
    private validationMiddleware;
    private proxyService;
    constructor(configLoader: ConfigLoader);
    /**
     * Handle incoming request and route to appropriate backend
     */
    handleRequest: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Execute middleware chain sequentially
     */
    private executeMiddlewareChain;
}
//# sourceMappingURL=routing.service.d.ts.map