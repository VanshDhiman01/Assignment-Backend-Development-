"use strict";
/**
 * Proxy Service
 * Handles forwarding requests to backend services
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyService = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const logger_js_1 = require("../utils/logger.js");
class ProxyService {
    /**
     * Create proxy middleware for a route
     */
    createProxy(route) {
        const proxyOptions = {
            target: route.target,
            changeOrigin: true,
            pathRewrite: (path) => {
                // Remove the gateway path prefix and forward the rest
                // e.g., /users/123 -> /users/123 (no change needed)
                return path;
            },
            on: {
                proxyReq: (proxyReq, req, res) => {
                    // Forward all headers
                    if (req.headers) {
                        Object.keys(req.headers).forEach(key => {
                            const value = req.headers[key];
                            if (value && typeof value === 'string') {
                                proxyReq.setHeader(key, value);
                            }
                            else if (Array.isArray(value)) {
                                proxyReq.setHeader(key, value.join(', '));
                            }
                        });
                    }
                    // Add custom headers
                    proxyReq.setHeader('X-Forwarded-By', 'API-Gateway');
                    const userId = req.userId;
                    if (userId) {
                        proxyReq.setHeader('X-User-Id', String(userId));
                    }
                    const method = req.method || 'UNKNOWN';
                    const path = req.url || '/';
                    logger_js_1.Logger.debug(`Proxying ${method} ${path} to ${route.target}`);
                },
                proxyRes: (proxyRes, req, res) => {
                    const path = req.url || '/';
                    logger_js_1.Logger.debug(`Received response ${proxyRes.statusCode} from ${route.target} for ${path}`);
                },
                error: (err, req, res) => {
                    const path = req.url || '/';
                    logger_js_1.Logger.error(`Proxy error for ${path}:`, err);
                    // Check if res is a ServerResponse (not a Socket)
                    if (res && typeof res === 'object' && 'statusCode' in res && 'setHeader' in res) {
                        const serverRes = res;
                        if (!serverRes.headersSent) {
                            serverRes.statusCode = 502;
                            serverRes.setHeader('Content-Type', 'application/json');
                            serverRes.end(JSON.stringify({
                                error: 'Bad Gateway',
                                message: `Unable to connect to backend service at ${route.target}`,
                                details: err.message
                            }));
                        }
                    }
                }
            }
        };
        return (0, http_proxy_middleware_1.createProxyMiddleware)(proxyOptions);
    }
}
exports.ProxyService = ProxyService;
//# sourceMappingURL=proxy.service.js.map