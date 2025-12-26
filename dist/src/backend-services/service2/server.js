"use strict";
/**
 * Backend Service 2 Server
 * Handles tasks and projects
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_routes_js_1 = __importDefault(require("./routes/task.routes.js"));
const project_routes_js_1 = __importDefault(require("./routes/project.routes.js"));
const logger_middleware_js_1 = require("./middlewares/logger.middleware.js");
const app = (0, express_1.default)();
const PORT = 3002;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_middleware_js_1.loggerMiddleware);
// Routes
app.use('/tasks', task_routes_js_1.default);
app.use('/projects', project_routes_js_1.default);
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Backend Service 2',
        port: PORT,
        timestamp: new Date().toISOString()
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`[Service2] Backend Service 2 running on port ${PORT}`);
    console.log(`[Service2] Health check: http://localhost:${PORT}/health`);
});
//# sourceMappingURL=server.js.map