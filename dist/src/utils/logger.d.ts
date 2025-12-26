/**
 * Simple logging utility
 */
export declare enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
export declare class Logger {
    private static formatMessage;
    static info(message: string, ...args: any[]): void;
    static warn(message: string, ...args: any[]): void;
    static error(message: string, ...args: any[]): void;
    static debug(message: string, ...args: any[]): void;
}
//# sourceMappingURL=logger.d.ts.map