"use strict";
/**
 * Simple logging utility
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    static formatMessage(level, message, ...args) {
        const timestamp = new Date().toISOString();
        const formattedArgs = args.length > 0 ? ' ' + args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ') : '';
        return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
    }
    static info(message, ...args) {
        console.log(this.formatMessage(LogLevel.INFO, message, ...args));
    }
    static warn(message, ...args) {
        console.warn(this.formatMessage(LogLevel.WARN, message, ...args));
    }
    static error(message, ...args) {
        console.error(this.formatMessage(LogLevel.ERROR, message, ...args));
    }
    static debug(message, ...args) {
        if (process.env.DEBUG === 'true') {
            console.debug(this.formatMessage(LogLevel.DEBUG, message, ...args));
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map