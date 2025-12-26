import { Request, Response } from 'express';
import { ConfigLoader } from '../../utils/config-loader.js';

export class HealthController {
  private configLoader: ConfigLoader;

  constructor(configLoader: ConfigLoader) {
    this.configLoader = configLoader;
  }

  healthCheck(req: Request, res: Response): void {
    res.json({
      status: 'ok',
      service: 'API Gateway',
      timestamp: new Date().toISOString()
    });
  }

  gatewayInfo(req: Request, res: Response): void {
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

