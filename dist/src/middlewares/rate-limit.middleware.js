"use strict";
/**
 * Rate Limiting Middleware
 * Limits requests per IP/user based on route configuration
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_js_1 = require("../utils/logger.js");
class RateLimitMiddleware {
    constructor(configLoader) {
        this.stores = new Map();
        this.configLoader = configLoader;
    }
    /**
     * Create rate limiter for a specific route
     */
    createRateLimiter(route) {
        const config = this.configLoader.getConfig();
        const routeKey = route.path;
        // Use route-specific rate limit or default
        const rateLimitConfig = route.rateLimit || config.defaultRateLimit || {
            windowMs: 60000,
            max: 1000
        };
        // Create in-memory store for this route
        if (!this.stores.has(routeKey)) {
            this.stores.set(routeKey, {});
        }
        const store = this.stores.get(routeKey);
        return (0, express_rate_limit_1.default)({
            windowMs: rateLimitConfig.windowMs,
            max: rateLimitConfig.max,
            message: {
                error: 'Too Many Requests',
                message: `Rate limit exceeded. Maximum ${rateLimitConfig.max} requests per ${rateLimitConfig.windowMs / 1000} seconds.`
            },
            standardHeaders: true,
            legacyHeaders: false,
            // Custom key generator to use IP or user ID
            keyGenerator: (req) => {
                const userId = req.userId;
                const ip = req.ip || req.socket.remoteAddress || 'unknown';
                return userId ? `user:${userId}` : `ip:${ip}`;
            },
            // Custom handler
            handler: (req, res) => {
                const key = req.userId
                    ? `user:${req.userId}`
                    : `ip:${req.ip || req.socket.remoteAddress || 'unknown'}`;
                logger_js_1.Logger.warn(`Rate limit exceeded for ${key} on route ${route.path}`);
                res.status(429).json({
                    error: 'Too Many Requests',
                    message: `Rate limit exceeded. Maximum ${rateLimitConfig.max} requests per ${rateLimitConfig.windowMs / 1000} seconds.`
                });
            }
        });
    }
    /**
     * Get rate limiter middleware for a route
     */
    getRateLimiter(route) {
        return this.createRateLimiter(route);
    }
}
exports.RateLimitMiddleware = RateLimitMiddleware;
//# sourceMappingURL=rate-limit.middleware.js.map