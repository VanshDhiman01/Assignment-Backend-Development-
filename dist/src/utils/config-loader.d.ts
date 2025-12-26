/**
 * Configuration loader with hot-reload support
 * Watches the config file for changes and reloads automatically
 */
import { GatewayConfig, RouteConfig } from '../types/index.js';
export declare class ConfigLoader {
    private configPath;
    private config;
    private isWatching;
    private listeners;
    constructor(configPath?: string);
    /**
     * Load configuration from JSON file
     */
    private loadConfig;
    /**
     * Start watching the config file for changes
     */
    private startWatching;
    /**
     * Get current configuration
     */
    getConfig(): GatewayConfig;
    /**
     * Find matching route for a given path and method
     */
    findRoute(path: string, method: string): RouteConfig | null;
    /**
     * Subscribe to configuration changes
     */
    onConfigChange(listener: (config: GatewayConfig) => void): void;
    /**
     * Stop watching the config file
     */
    stopWatching(): void;
}
//# sourceMappingURL=config-loader.d.ts.map