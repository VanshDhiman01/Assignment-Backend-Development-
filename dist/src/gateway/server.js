"use strict";
/**
 * API Gateway Server
 * Main server setup
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayServer = void 0;
const express_1 = __importDefault(require("express"));
const config_loader_js_1 = require("../utils/config-loader.js");
const routing_service_js_1 = require("../services/routing.service.js");
const logger_js_1 = require("../utils/logger.js");
const health_routes_js_1 = __importDefault(require("./routes/health.routes.js"));
const proxy_routes_js_1 = require("./routes/proxy.routes.js");
class GatewayServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.configLoader = new config_loader_js_1.ConfigLoader();
        this.routingService = new routing_service_js_1.RoutingService(this.configLoader);
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
        // Listen for config changes
        this.configLoader.onConfigChange((config) => {
            logger_js_1.Logger.info('Configuration reloaded, routing updated');
            // Recreate routing service with new config
            this.routingService = new routing_service_js_1.RoutingService(this.configLoader);
        });
    }
    /**
     * Setup Express middleware
     */
    setupMiddleware() {
        // Parse JSON bodies
        this.app.use(express_1.default.json());
        // Parse URL-encoded bodies
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Trust proxy for accurate IP addresses
        this.app.set('trust proxy', true);
        // Request logging
        this.app.use((req, res, next) => {
            logger_js_1.Logger.info(`${req.method} ${req.path} from ${req.ip}`);
            next();
        });
    }
    /**
     * Setup routes
     */
    setupRoutes() {
        // Health and info routes
        this.app.use('/', health_routes_js_1.default);
        // Dynamic proxy middleware (catch-all) - use the same routing service instance
        // This must be last to catch all unmatched routes
        const proxyMiddleware = (0, proxy_routes_js_1.createProxyMiddleware)(this.routingService);
        this.app.use(proxyMiddleware);
    }
    /**
     * Setup error handling
     */
    setupErrorHandling() {
        // 404 handler
        this.app.use((req, res) => {
            if (!res.headersSent) {
                res.status(404).json({
                    error: 'Not Found',
                    message: `Route ${req.method} ${req.path} not found`
                });
            }
        });
        // Global error handler
        this.app.use((err, req, res, next) => {
            logger_js_1.Logger.error('Unhandled error:', err);
            if (!res.headersSent) {
                res.status(500).json({
                    error: 'Internal Server Error',
                    message: err.message || 'An unexpected error occurred'
                });
            }
        });
    }
    /**
     * Start the gateway server
     */
    start() {
        const config = this.configLoader.getConfig();
        const port = config.port || 3000;
        this.server = this.app.listen(port, () => {
            logger_js_1.Logger.info(`API Gateway started on port ${port}`);
            logger_js_1.Logger.info(`Health check: http://localhost:${port}/health`);
            logger_js_1.Logger.info(`Gateway info: http://localhost:${port}/gateway/info`);
        });
    }
    /**
     * Stop the gateway server
     */
    stop() {
        if (this.server) {
            this.server.close();
            this.configLoader.stopWatching();
            logger_js_1.Logger.info('API Gateway stopped');
        }
    }
}
exports.GatewayServer = GatewayServer;
// This file is imported by index.ts, so no direct execution needed here
//# sourceMappingURL=server.js.map