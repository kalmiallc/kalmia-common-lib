import { MonitorLogType } from './monitor-logger';
export interface IMonitorLogger {
    error(params: IMonitorLogParams): void;
    info(params: IMonitorLogParams): void;
    warn(params: IMonitorLogParams): void;
    debug(params: IMonitorLogParams): void;
    verbose(params: IMonitorLogParams): void;
    test?(params: IMonitorLogParams): void;
    db?(params: IMonitorLogParams): void;
    cost?(params: IMonitorLogParams): void;
    setLogLevel(ll: MonitorLogType): void;
    request(payload: IMonitorRequestLogParams): void;
}
export interface IMonitorLogParams {
    methodName: string;
    message: string;
    location?: string;
    requestId?: string;
    userId?: string | number;
    data?: any;
    tags?: string[];
}
export interface IMonitorRequestLogParams {
    status: number;
    method: string;
    url: string;
    requestId?: string;
    apiName?: string;
    host?: string;
    origin?: string;
    referer?: string;
    ip?: string;
    country?: string;
    endpoint?: string;
    userAgent?: string;
    body?: string;
    responseTime?: number;
    userId?: string | number;
    projectId?: string;
}
/**
 * AppMonitor is a logging wrapper that uses MonitorLogger to send logs to Kalmia Monitor server via API.
 *
 * It requires K_MONITOR_API_KEY and K_MONITOR_API_SECRET env variables to be set.
 *
 * Additional env variables:
 *  * K_MONITOR_API_URL - override default API URL
 *  * K_MONITOR_DISABLE_API - if 'true' logs will not be sent to server.
 *  * K_MONITOR_NO_CONSOLE - logs will only be sent to server, without printing to console
 *  * K_MONITOR_LOG_LEVEL - default log level
 *  * LOG_TARGET - "color"/"console"/"none" - controlling output of logs to console
 */
export declare class AppMonitor {
    private static logger;
    static setLogLevel(ll: MonitorLogType): void;
    static setLogger(logger: IMonitorLogger): void;
    /**
     * send info log object to monitoring API
     * @param params MonitorLog params
     */
    static sendInfo(params: IMonitorLogParams): void;
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendInfo' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static info(fileName: string, methodName: string, ...args: any[]): void;
    /**
     * send debug log object to monitoring API
     * @param params MonitorLog params
     */
    static sendDebug(params: IMonitorLogParams): void;
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendDebug' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static debug(fileName: string, methodName: string, ...args: any[]): void;
    /**
     * send DB log object to monitoring API
     * @param params MonitorLog params
     */
    static sendDb(params: IMonitorLogParams): void;
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendDb' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static db(fileName: string, methodName: string, ...args: any[]): void;
    /**
     * send verbose log object to monitoring API
     * @param params MonitorLog params
     */
    static sendVerbose(params: IMonitorLogParams): void;
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendVerbose' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static trace(fileName: string, methodName: string, ...args: any[]): void;
    /**
     * send warn log object to monitoring API
     * @param params MonitorLog params
     */
    static sendWarn(params: IMonitorLogParams): void;
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendWarn' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static warn(fileName: string, methodName: string, ...args: any[]): void;
    /**
     * send error log object to monitoring API
     * @param params MonitorLog params
     */
    static sendError(params: IMonitorLogParams): void;
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendError' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static error(fileName: string, methodName: string, ...args: any[]): void;
    static test(location: string, methodName: string, message: string, context?: {
        [key: string]: any;
    }, data?: any, tags?: string[]): void;
    static stringifyObjectForLog(data: any, depth?: number, showHidden?: boolean): string;
    static overrideLevel(level: MonitorLogType): void;
    static sendRequest(payload: IMonitorRequestLogParams): void;
}
//# sourceMappingURL=app-monitor.d.ts.map