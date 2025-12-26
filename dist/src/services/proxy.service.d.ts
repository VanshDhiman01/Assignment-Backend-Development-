/**
 * Proxy Service
 * Handles forwarding requests to backend services
 */
import { ServerResponse } from 'http';
import { RouteConfig } from '../types/index.js';
export declare class ProxyService {
    /**
     * Create proxy middleware for a route
     */
    createProxy(route: RouteConfig): import("http-proxy-middleware").RequestHandler<import("node:http").IncomingMessage, ServerResponse<import("node:http").IncomingMessage>, (err?: any) => void>;
}
//# sourceMappingURL=proxy.service.d.ts.map