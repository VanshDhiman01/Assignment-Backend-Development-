/**
 * API Gateway Server
 * Main server setup
 */
export declare class GatewayServer {
    private app;
    private configLoader;
    private routingService;
    private server;
    constructor();
    /**
     * Setup Express middleware
     */
    private setupMiddleware;
    /**
     * Setup routes
     */
    private setupRoutes;
    /**
     * Setup error handling
     */
    private setupErrorHandling;
    /**
     * Start the gateway server
     */
    start(): void;
    /**
     * Stop the gateway server
     */
    stop(): void;
}
//# sourceMappingURL=server.d.ts.map