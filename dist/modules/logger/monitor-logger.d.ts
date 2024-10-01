import { IMonitorLogParams } from './app-monitor';
export declare enum MonitorLogType {
    DB = "DB",
    INFO = "INFO",
    MSG = "MSG",
    WARN = "WARNING",
    ERROR = "ERROR",
    ALERT = "ALERT",
    VERBOSE = "VERBOSE",
    DEBUG = "DEBUG",
    TEST = "TEST"
}
export interface MonitorLogPayload {
    logType: MonitorLogType;
    methodName: string;
    message: string;
    location?: string;
    requestId?: string;
    userId?: string;
    data?: any;
    timestamp?: Date;
    tags?: string[];
}
/**
 * Monitoring logger. This logger uses common logging methods with addition to test and db methods.
 *
 * Logs are sent via API to Kalmia Monitoring service. It requires K_MONITOR_API_KEY and K_MONITOR_API_SECRET env variables to be set.
 *
 * Additional env variables:
 *  * K_MONITOR_API_URL - override default API URL
 *  * K_MONITOR_DISABLE_API - if 'true' logs will not be sent to server.
 *  * K_MONITOR_NO_CONSOLE - logs will only be sent to server, without printing to console
 *  * K_MONITOR_LOG_LEVEL - default log level
 *  * LOG_TARGET - "color"/"console"/"none" - controlling output of logs to console
 *
 * Test method runs on [INF] level, providing additional [ TEST ] argument and is not send to monitoring API.
 * DB method runs on [VERBOSE] level, providing additional [ DB ] argument.
 *
 * Both test and db level can be filtered regardless of the level, but be included in corresponding levels.
 *
 */
export declare class MonitorLogger {
    private apiUrl;
    private apiKey;
    private apiSecret;
    private disableApi;
    private logLevel;
    setLogLevel(ll: MonitorLogType): void;
    info(params: IMonitorLogParams): void;
    debug(params: IMonitorLogParams): void;
    verbose(params: IMonitorLogParams): void;
    warn(params: IMonitorLogParams): void;
    error(params: IMonitorLogParams): void;
    test(params: IMonitorLogParams): void;
    db(params: IMonitorLogParams): void;
    private logToMonitor;
    private sendPayload;
}
//# sourceMappingURL=monitor-logger.d.ts.map