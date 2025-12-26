export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RouteConfig {
  path: string;
  target: string;
  methods: HttpMethod[];
  authRequired?: boolean;
  rateLimit?: {
    windowMs: number;
    max: number;
  };
  validation?: {
    body?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, any>;
  };
}

export interface GatewayConfig {
  port: number;
  routes: RouteConfig[];
  jwt: {
    secret: string;
    expiresIn: string;
  };
  defaultRateLimit?: {
    windowMs: number;
    max: number;
  };
}

export interface JwtPayload {
  userId: string;
  email?: string;
  [key: string]: any;
}

export interface RequestContext {
  route: RouteConfig;
  userId?: string;
  ip: string;
}

