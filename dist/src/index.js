"use strict";
/**
 * Main Entry Point
 * Start the API Gateway
 */
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("./gateway/server.js");
const gateway = new server_js_1.GatewayServer();
gateway.start();
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    gateway.stop();
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    gateway.stop();
    process.exit(0);
});
//# sourceMappingURL=index.js.map