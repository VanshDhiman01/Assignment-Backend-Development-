import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`[Service2] ${req.method} ${req.path}`);
  next();
};

