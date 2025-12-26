/**
 * JWT Authentication Middleware
 * Validates JWT tokens from Authorization header
 */
import { Request, Response, NextFunction } from 'express';
import { ConfigLoader } from '../utils/config-loader.js';
export declare class AuthMiddleware {
    private configLoader;
    constructor(configLoader: ConfigLoader);
    /**
     * Middleware to verify JWT token
     */
    verifyToken: (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=auth.middleware.d.ts.map