"use strict";
/**
 * JWT Authentication Middleware
 * Validates JWT tokens from Authorization header
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const logger_js_1 = require("../utils/logger.js");
class AuthMiddleware {
    constructor(configLoader) {
        /**
         * Middleware to verify JWT token
         */
        this.verifyToken = (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    logger_js_1.Logger.warn('No authorization header provided');
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
                    logger_js_1.Logger.warn('Invalid authorization header format');
                    res.status(401).json({
                        error: 'Unauthorized',
                        message: 'Invalid authorization header format'
                    });
                    return;
                }
                const config = this.configLoader.getConfig();
                const decoded = jwt.verify(token, config.jwt.secret);
                // Attach user info to request
                req.user = decoded;
                req.userId = decoded.userId;
                logger_js_1.Logger.debug(`User authenticated: ${decoded.userId}`);
                next();
            }
            catch (error) {
                if (error instanceof jwt.JsonWebTokenError) {
                    logger_js_1.Logger.warn(`JWT verification failed: ${error.message}`);
                    res.status(401).json({
                        error: 'Unauthorized',
                        message: 'Invalid or expired token'
                    });
                    return;
                }
                logger_js_1.Logger.error('Auth middleware error:', error);
                res.status(500).json({
                    error: 'Internal Server Error',
                    message: 'Authentication failed'
                });
            }
        };
        this.configLoader = configLoader;
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map