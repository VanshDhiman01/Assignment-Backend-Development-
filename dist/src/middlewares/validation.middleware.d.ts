/**
 * Request Validation Middleware
 * Validates request body, query parameters, and headers
 */
import { Request, Response, NextFunction } from 'express';
import { RouteConfig } from '../types/index.js';
export declare class ValidationMiddleware {
    /**
     * Validate request based on route configuration
     */
    validateRequest(route: RouteConfig): (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Validate an object against a schema
     */
    private validateObject;
}
//# sourceMappingURL=validation.middleware.d.ts.map