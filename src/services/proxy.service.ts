import { Request, Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { ServerResponse } from 'http';
import { RouteConfig } from '../types/index.js';
import { Logger } from '../utils/logger.js';

export class ProxyService {
  createProxy(route: RouteConfig) {
    const proxyOptions: Options = {
      target: route.target,
      changeOrigin: true,
      timeout: 30000, // 30 second timeout
      proxyTimeout: 30000, // 30 second proxy timeout
      pathRewrite: (path: string) => {
        return path;
      },
      on: {
        proxyReq: (proxyReq, req, res) => {
          // Forward all headers
          if (req.headers) {
            Object.keys(req.headers).forEach(key => {
              const value = req.headers[key];
              if (value && typeof value === 'string') {
                proxyReq.setHeader(key, value);
              } else if (Array.isArray(value)) {
                proxyReq.setHeader(key, value.join(', '));
              }
            });
          }

          // Add custom headers
          proxyReq.setHeader('X-Forwarded-By', 'API-Gateway');
          const userId = (req as any).userId;
          if (userId) {
            proxyReq.setHeader('X-User-Id', String(userId));
          }

          const method = req.method || 'UNKNOWN';
          const path = req.url || '/';
          Logger.debug(`Proxying ${method} ${path} to ${route.target}`);
        },
        proxyRes: (proxyRes, req, res) => {
          const path = req.url || '/';
          Logger.debug(`Received response ${proxyRes.statusCode} from ${route.target} for ${path}`);
        },
        error: (err, req, res) => {
          const path = req.url || '/';
          Logger.error(`Proxy error for ${path}:`, err);
          
          // Check if res is a ServerResponse (not a Socket)
          if (res && typeof res === 'object' && 'statusCode' in res && 'setHeader' in res) {
            const serverRes = res as ServerResponse;
            if (!serverRes.headersSent) {
              serverRes.statusCode = 502;
              serverRes.setHeader('Content-Type', 'application/json');
              serverRes.end(JSON.stringify({
                error: 'Bad Gateway',
                message: `Unable to connect to backend service at ${route.target}`,
                details: err.message
              }));
            }
          }
        }
      }
    };

    return createProxyMiddleware(proxyOptions);
  }
}

