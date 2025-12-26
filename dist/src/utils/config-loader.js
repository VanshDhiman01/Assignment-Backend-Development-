"use strict";
/**
 * Configuration loader with hot-reload support
 * Watches the config file for changes and reloads automatically
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ConfigLoader {
    constructor(configPath = path.join(process.cwd(), 'src', 'config', 'routes.json')) {
        this.config = null;
        this.isWatching = false;
        this.listeners = [];
        this.configPath = configPath;
        this.loadConfig();
        this.startWatching();
    }
    /**
     * Load configuration from JSON file
     */
    loadConfig() {
        try {
            const configData = fs.readFileSync(this.configPath, 'utf-8');
            this.config = JSON.parse(configData);
            console.log(`[ConfigLoader] Configuration loaded from ${this.configPath}`);
        }
        catch (error) {
            console.error(`[ConfigLoader] Error loading config:`, error);
            throw new Error(`Failed to load configuration: ${error}`);
        }
    }
    /**
     * Start watching the config file for changes
     */
    startWatching() {
        try {
            fs.watchFile(this.configPath, { interval: 1000 }, (curr, prev) => {
                if (curr.mtime !== prev.mtime) {
                    console.log(`[ConfigLoader] Configuration file changed, reloading...`);
                    const oldConfig = this.config;
                    this.loadConfig();
                    // Notify listeners about the change
                    if (this.config && oldConfig) {
                        this.listeners.forEach(listener => listener(this.config));
                    }
                }
            });
            this.isWatching = true;
            console.log(`[ConfigLoader] Watching ${this.configPath} for changes`);
        }
        catch (error) {
            console.warn(`[ConfigLoader] Could not watch config file:`, error);
        }
    }
    /**
     * Get current configuration
     */
    getConfig() {
        if (!this.config) {
            throw new Error('Configuration not loaded');
        }
        return this.config;
    }
    /**
     * Find matching route for a given path and method
     */
    findRoute(path, method) {
        if (!this.config) {
            return null;
        }
        // Sort routes by specificity (longer paths first, then exact matches)
        const sortedRoutes = [...this.config.routes].sort((a, b) => {
            const aHasWildcard = a.path.includes('*');
            const bHasWildcard = b.path.includes('*');
            if (aHasWildcard && !bHasWildcard)
                return 1;
            if (!aHasWildcard && bHasWildcard)
                return -1;
            return b.path.length - a.path.length;
        });
        for (const route of sortedRoutes) {
            // Check if method is allowed
            if (!route.methods.includes(method)) {
                continue;
            }
            // Check exact match
            if (route.path === path) {
                return route;
            }
            // Check wildcard match
            if (route.path.endsWith('/*')) {
                const basePath = route.path.slice(0, -2);
                if (path.startsWith(basePath + '/') || path === basePath) {
                    return route;
                }
            }
        }
        return null;
    }
    /**
     * Subscribe to configuration changes
     */
    onConfigChange(listener) {
        this.listeners.push(listener);
    }
    /**
     * Stop watching the config file
     */
    stopWatching() {
        if (this.isWatching) {
            fs.unwatchFile(this.configPath);
            this.isWatching = false;
        }
    }
}
exports.ConfigLoader = ConfigLoader;
//# sourceMappingURL=config-loader.js.map