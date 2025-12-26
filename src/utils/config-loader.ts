import * as fs from 'fs';
import * as path from 'path';
import { GatewayConfig, RouteConfig } from '../types/index.js';

export class ConfigLoader {
  private configPath: string;
  private config: GatewayConfig | null = null;
  private isWatching: boolean = false;
  private listeners: Array<(config: GatewayConfig) => void> = [];
  private sortedRoutesCache: RouteConfig[] | null = null; // Cache sorted routes

  constructor(configPath: string = path.join(process.cwd(), 'src', 'config', 'routes.json')) {
    this.configPath = configPath;
    this.loadConfig();
    this.startWatching();
  }

  private loadConfig(): void {
    try {
      const configData = fs.readFileSync(this.configPath, 'utf-8');
      this.config = JSON.parse(configData) as GatewayConfig;
      // Clear cache when config reloads
      this.sortedRoutesCache = null;
      console.log(`[ConfigLoader] Configuration loaded from ${this.configPath}`);
    } catch (error) {
      console.error(`[ConfigLoader] Error loading config:`, error);
      throw new Error(`Failed to load configuration: ${error}`);
    }
  }
  
  private getSortedRoutes(): RouteConfig[] {
    if (!this.config) {
      return [];
    }
    
    // Return cached sorted routes if available
    if (this.sortedRoutesCache) {
      return this.sortedRoutesCache;
    }
    
    // Sort routes by specificity (longer paths first, then exact matches)
    this.sortedRoutesCache = [...this.config.routes].sort((a, b) => {
      const aHasWildcard = a.path.includes('*');
      const bHasWildcard = b.path.includes('*');
      
      if (aHasWildcard && !bHasWildcard) return 1;
      if (!aHasWildcard && bHasWildcard) return -1;
      
      return b.path.length - a.path.length;
    });
    
    return this.sortedRoutesCache;
  }


  private startWatching(): void {
    try {
      fs.watchFile(this.configPath, { interval: 1000 }, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
          console.log(`[ConfigLoader] Configuration file changed, reloading...`);
          const oldConfig = this.config;
          this.loadConfig();
          
          // Notify listeners about the change
          if (this.config && oldConfig) {
            this.listeners.forEach(listener => listener(this.config!));
          }
        }
      });
      this.isWatching = true;
      console.log(`[ConfigLoader] Watching ${this.configPath} for changes`);
    } catch (error) {
      console.warn(`[ConfigLoader] Could not watch config file:`, error);
    }
  }

  getConfig(): GatewayConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config;
  }

  
  findRoute(path: string, method: string): RouteConfig | null {
    if (!this.config) {
      return null;
    }

    // Sort routes by specificity (longer paths first, then exact matches)
    const sortedRoutes = [...this.config.routes].sort((a, b) => {
      const aHasWildcard = a.path.includes('*');
      const bHasWildcard = b.path.includes('*');
      
      if (aHasWildcard && !bHasWildcard) return 1;
      if (!aHasWildcard && bHasWildcard) return -1;
      
      return b.path.length - a.path.length;
    });

    for (const route of sortedRoutes) {
      // Check if method is allowed
      if (!route.methods.includes(method as any)) {
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

  
  onConfigChange(listener: (config: GatewayConfig) => void): void {
    this.listeners.push(listener);
  }

  stopWatching(): void {
    if (this.isWatching) {
      fs.unwatchFile(this.configPath);
      this.isWatching = false;
    }
  }
}

