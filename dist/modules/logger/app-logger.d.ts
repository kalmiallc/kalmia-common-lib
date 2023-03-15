/**
 * AppLogger is general wrapper that is compliant with other logging frameworks, such as Pino, Winston, NestJs logger.
 * This class provides wrapper for logging. Developer should always use methods from this class for the logging.
 * Currently standard logger is used as default.
 *
 * The default logger can be overridden with the setLogger method.
 */
export interface IAppLogger {
    error(args: any[]): any;
    info(args: any[]): any;
    warn(args: any[]): any;
    debug(args: any[]): any;
    verbose(args: any[]): any;
    test?(args: any[]): any;
    db?(args: any[]): any;
    setLogLevel(ll: string): any;
}
export declare class AppLogger {
    private static logger;
    static setLogLevel(ll: string): void;
    static setLogger(logger: IAppLogger): void;
    static info(fileName: string, methodName: string, ...args: any[]): void;
    static debug(fileName: string, methodName: string, ...args: any[]): void;
    static db(fileName: string, methodName: string, ...args: any[]): void;
    static trace(fileName: string, methodName: string, ...args: any[]): void;
    static warn(fileName: string, methodName: string, ...args: any[]): void;
    static error(fileName: string, methodName: string, ...args: any[]): void;
    static test(fileName: string, methodName: string, ...args: any[]): void;
    static stringifyObjectForLog(data: any, depth?: number, showHidden?: boolean): string;
    static overrideLevel(level: string): void;
}
//# sourceMappingURL=app-logger.d.ts.map