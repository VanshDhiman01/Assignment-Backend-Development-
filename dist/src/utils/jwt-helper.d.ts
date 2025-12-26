/**
 * JWT Helper Utilities
 * Helper functions for generating and managing JWT tokens
 */
import { JwtPayload } from '../types/index.js';
import { ConfigLoader } from './config-loader.js';
export declare class JwtHelper {
    private configLoader;
    constructor(configLoader: ConfigLoader);
    /**
     * Generate a JWT token for testing purposes
     */
    generateToken(payload: JwtPayload): string;
    /**
     * Verify a JWT token
     */
    verifyToken(token: string): JwtPayload;
}
//# sourceMappingURL=jwt-helper.d.ts.map