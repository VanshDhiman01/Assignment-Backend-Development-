/**
 * Rate Limiting Middleware
 * Limits requests per IP/user based on route configuration
 */
import { RouteConfig } from '../types/index.js';
import { ConfigLoader } from '../utils/config-loader.js';
export declare class RateLimitMiddleware {
    private configLoader;
    private stores;
    constructor(configLoader: ConfigLoader);
    /**
     * Create rate limiter for a specific route
     */
    createRateLimiter(route: RouteConfig): import("express-rate-limit").RateLimitRequestHandler;
    /**
     * Get rate limiter middleware for a route
     */
    getRateLimiter(route: RouteConfig): import("express-rate-limit").RateLimitRequestHandler;
}
//# sourceMappingURL=rate-limit.middleware.d.ts.map