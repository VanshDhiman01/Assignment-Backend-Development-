/**
 * JWT Authentication Middleware
 * Validates JWT tokens from Authorization header
 */

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/index.js';
import { Logger } from '../utils/logger.js';
import { ConfigLoader } from '../utils/config-loader.js';

export class AuthMiddleware {
  private configLoader: ConfigLoader;

  constructor(configLoader: ConfigLoader) {
    this.configLoader = configLoader;
  }

  /**
   * Middleware to verify JWT token
   */
  verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        Logger.warn('No authorization header provided');
        res.status(401).json({
          error: 'Unauthorized',
          message: 'No authorization token provided'
        });
        return;
      }

      const token = authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : authHeader;

      if (!token) {
        Logger.warn('Invalid authorization header format');
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid authorization header format'
        });
        return;
      }

      const config = this.configLoader.getConfig();
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

      // Attach user info to request
      (req as any).user = decoded;
      (req as any).userId = decoded.userId;

      Logger.debug(`User authenticated: ${decoded.userId}`);
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        Logger.warn(`JWT verification failed: ${error.message}`);
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid or expired token'
        });
        return;
      }

      Logger.error('Auth middleware error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Authentication failed'
      });
    }
  };
}

