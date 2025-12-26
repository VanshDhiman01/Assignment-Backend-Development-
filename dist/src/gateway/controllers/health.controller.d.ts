/**
 * Health Controller
 * Handles health check and gateway info endpoints
 */
import { Request, Response } from 'express';
import { ConfigLoader } from '../../utils/config-loader.js';
export declare class HealthController {
    private configLoader;
    constructor(configLoader: ConfigLoader);
    healthCheck(req: Request, res: Response): void;
    gatewayInfo(req: Request, res: Response): void;
}
//# sourceMappingURL=health.controller.d.ts.map