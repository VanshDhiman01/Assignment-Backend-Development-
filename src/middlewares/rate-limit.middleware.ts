/**
 * Rate Limiting Middleware
 * Limits requests per IP/user based on route configuration
 */

import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { RouteConfig } from '../types/index.js';
import { Logger } from '../utils/logger.js';
import { ConfigLoader } from '../utils/config-loader.js';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export class RateLimitMiddleware {
  private configLoader: ConfigLoader;
  private stores: Map<string, RateLimitStore> = new Map();

  constructor(configLoader: ConfigLoader) {
    this.configLoader = configLoader;
  }

  /**
   * Create rate limiter for a specific route
   */
  createRateLimiter(route: RouteConfig) {
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

    const store = this.stores.get(routeKey)!;

    return rateLimit({
      windowMs: rateLimitConfig.windowMs,
      max: rateLimitConfig.max,
      message: {
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Maximum ${rateLimitConfig.max} requests per ${rateLimitConfig.windowMs / 1000} seconds.`
      },
      standardHeaders: true,
      legacyHeaders: false,
      // Custom key generator to use IP or user ID
      keyGenerator: (req: Request): string => {
        const userId = (req as any).userId;
        const ip = req.ip || req.socket.remoteAddress || 'unknown';
        return userId ? `user:${userId}` : `ip:${ip}`;
      },
      // Custom handler
      handler: (req: Request, res: Response) => {
        const key = (req as any).userId 
          ? `user:${(req as any).userId}` 
          : `ip:${req.ip || req.socket.remoteAddress || 'unknown'}`;
        
        Logger.warn(`Rate limit exceeded for ${key} on route ${route.path}`);
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
  getRateLimiter(route: RouteConfig) {
    return this.createRateLimiter(route);
  }
}

