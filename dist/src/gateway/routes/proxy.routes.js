"use strict";
/**
 * Proxy Routes
 * Dynamic routing to backend services
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxyMiddleware = createProxyMiddleware;
/**
 * Create proxy middleware with the routing service
 * This is a catch-all middleware, not a route
 */
function createProxyMiddleware(routingService) {
    return (req, res, next) => {
        routingService.handleRequest(req, res, next);
    };
}
//# sourceMappingURL=proxy.routes.js.map