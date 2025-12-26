"use strict";
/**
 * Health Controller
 * Handles health check and gateway info endpoints
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
class HealthController {
    constructor(configLoader) {
        this.configLoader = configLoader;
    }
    healthCheck(req, res) {
        res.json({
            status: 'ok',
            service: 'API Gateway',
            timestamp: new Date().toISOString()
        });
    }
    gatewayInfo(req, res) {
        const config = this.configLoader.getConfig();
        res.json({
            service: 'API Gateway',
            version: '1.0.0',
            routes: config.routes.map(route => ({
                path: route.path,
                target: route.target,
                methods: route.methods,
                authRequired: route.authRequired || false
            }))
        });
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map