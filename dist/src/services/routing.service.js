"use strict";
/**
 * Routing Service
 * Handles dynamic route matching and middleware application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingService = void 0;
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const rate_limit_middleware_js_1 = require("../middlewares/rate-limit.middleware.js");
const validation_middleware_js_1 = require("../middlewares/validation.middleware.js");
const proxy_service_js_1 = require("./proxy.service.js");
const logger_js_1 = require("../utils/logger.js");
class RoutingService {
    constructor(configLoader) {
        /**
         * Handle incoming request and route to appropriate backend
         */
        this.handleRequest = (req, res, next) => {
            const method = req.method;
            const path = req.path;
            logger_js_1.Logger.debug(`Incoming request: ${method} ${path}`);
            // Find matching route
            const route = this.configLoader.findRoute(path, method);
            if (!route) {
                logger_js_1.Logger.warn(`No route found for ${method} ${path}`);
                res.status(404).json({
                    error: 'Not Found',
                    message: `No route configured for ${method} ${path}`
                });
                return;
            }
            logger_js_1.Logger.info(`Routing ${method} ${path} to ${route.target}`);
            // Store route in request for middleware access
            req.route = route;
            // Build middleware chain
            const middlewareChain = [];
            // 1. Authentication (if required)
            if (route.authRequired) {
                middlewareChain.push(this.authMiddleware.verifyToken);
            }
            // 2. Rate limiting
            const rateLimiter = this.rateLimitMiddleware.getRateLimiter(route);
            middlewareChain.push(rateLimiter);
            // 3. Validation
            if (route.validation) {
                middlewareChain.push(this.validationMiddleware.validateRequest(route));
            }
            // 4. Proxy to backend
            const proxy = this.proxyService.createProxy(route);
            middlewareChain.push(proxy);
            // Execute middleware chain
            this.executeMiddlewareChain(middlewareChain, req, res, next);
        };
        this.configLoader = configLoader;
        this.authMiddleware = new auth_middleware_js_1.AuthMiddleware(configLoader);
        this.rateLimitMiddleware = new rate_limit_middleware_js_1.RateLimitMiddleware(configLoader);
        this.validationMiddleware = new validation_middleware_js_1.ValidationMiddleware();
        this.proxyService = new proxy_service_js_1.ProxyService();
    }
    /**
     * Execute middleware chain sequentially
     */
    executeMiddlewareChain(middlewares, req, res, next, index = 0) {
        if (index >= middlewares.length) {
            next();
            return;
        }
        const middleware = middlewares[index];
        middleware(req, res, (err) => {
            if (err) {
                logger_js_1.Logger.error('Middleware error:', err);
                if (!res.headersSent) {
                    res.status(500).json({
                        error: 'Internal Server Error',
                        message: err.message || 'An error occurred while processing the request'
                    });
                }
                return;
            }
            this.executeMiddlewareChain(middlewares, req, res, next, index + 1);
        });
    }
}
exports.RoutingService = RoutingService;
//# sourceMappingURL=routing.service.js.map