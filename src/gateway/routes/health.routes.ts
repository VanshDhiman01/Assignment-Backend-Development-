import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.js';
import { ConfigLoader } from '../../utils/config-loader.js';

// Create router factory function to accept shared configLoader
export function createHealthRoutes(configLoader: ConfigLoader): Router {
  const router = Router();
  const healthController = new HealthController(configLoader);
  
  router.get('/health', healthController.healthCheck.bind(healthController));
  router.get('/gateway/info', healthController.gatewayInfo.bind(healthController));
  
  return router;
}

