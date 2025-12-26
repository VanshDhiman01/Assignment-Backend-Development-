"use strict";
/**
 * Health Routes
 * Gateway health and info endpoints
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_controller_js_1 = require("../controllers/health.controller.js");
const config_loader_js_1 = require("../../utils/config-loader.js");
const router = (0, express_1.Router)();
const configLoader = new config_loader_js_1.ConfigLoader();
const healthController = new health_controller_js_1.HealthController(configLoader);
router.get('/health', healthController.healthCheck.bind(healthController));
router.get('/gateway/info', healthController.gatewayInfo.bind(healthController));
exports.default = router;
//# sourceMappingURL=health.routes.js.map