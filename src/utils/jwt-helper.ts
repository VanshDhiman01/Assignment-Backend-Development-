import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/index.js';
import { ConfigLoader } from './config-loader.js';

export class JwtHelper {
  private configLoader: ConfigLoader;

  constructor(configLoader: ConfigLoader) {
    this.configLoader = configLoader;
  }
  generateToken(payload: JwtPayload): string {
    const config = this.configLoader.getConfig();
    const expiresIn = typeof config.jwt.expiresIn === 'string' 
      ? config.jwt.expiresIn 
      : String(config.jwt.expiresIn);
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: expiresIn
    } as jwt.SignOptions);
  }
  verifyToken(token: string): JwtPayload {
    const config = this.configLoader.getConfig();
    return jwt.verify(token, config.jwt.secret) as JwtPayload;
  }
}

