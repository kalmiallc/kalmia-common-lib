"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMonitor = void 0;
const util_1 = require("util");
const monitor_logger_1 = require("./monitor-logger");
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
class AppMonitor {
    static setLogLevel(ll) {
        if (!ll) {
            AppMonitor.logger.warn({ location: 'appLogger.ts', methodName: 'AppLogger', message: 'Could not set log level, as it is not defined' });
            return;
        }
        this.logger.setLogLevel(ll);
    }
    static setLogger(logger) {
        AppMonitor.logger = logger;
    }
    /**
     * send info log object to monitoring API
     * @param params MonitorLog params
     */
    static sendInfo(params) {
        AppMonitor.logger.info(params);
    }
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendInfo' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static info(fileName, methodName, ...args) {
        AppMonitor.sendInfo({
            methodName,
            location: fileName,
            message: args
                .map((x) => {
                let out = '<unknown>';
                try {
                    out = x.toString();
                }
                catch (e) { }
                return out;
            })
                .join('|')
        });
    }
    /**
     * send debug log object to monitoring API
     * @param params MonitorLog params
     */
    static sendDebug(params) {
        AppMonitor.logger.debug(params);
    }
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendDebug' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static debug(fileName, methodName, ...args) {
        AppMonitor.sendDebug({
            methodName,
            location: fileName,
            message: args
                .map((x) => {
                let out = '<unknown>';
                try {
                    out = x.toString();
                }
                catch (e) { }
                return out;
            })
                .join('|')
        });
    }
    /**
     * send DB log object to monitoring API
     * @param params MonitorLog params
     */
    static sendDb(params) {
        AppMonitor.logger.db(params);
    }
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendDb' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static db(fileName, methodName, ...args) {
        AppMonitor.sendDb({
            methodName,
            location: fileName,
            message: args
                .map((x) => {
                let out = '<unknown>';
                try {
                    out = x.toString();
                }
                catch (e) { }
                return out;
            })
                .join('|')
        });
    }
    /**
     * send verbose log object to monitoring API
     * @param params MonitorLog params
     */
    static sendVerbose(params) {
        AppMonitor.logger.verbose(params);
    }
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendVerbose' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static trace(fileName, methodName, ...args) {
        AppMonitor.sendVerbose({
            methodName,
            location: fileName,
            message: args
                .map((x) => {
                let out = '<unknown>';
                try {
                    out = x.toString();
                }
                catch (e) { }
                return out;
            })
                .join('|')
        });
    }
    /**
     * send warn log object to monitoring API
     * @param params MonitorLog params
     */
    static sendWarn(params) {
        AppMonitor.logger.warn(params);
    }
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendWarn' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static warn(fileName, methodName, ...args) {
        AppMonitor.sendWarn({
            methodName,
            location: fileName,
            message: args
                .map((x) => {
                let out = '<unknown>';
                try {
                    out = x.toString();
                }
                catch (e) { }
                return out;
            })
                .join('|')
        });
    }
    /**
     * send error log object to monitoring API
     * @param params MonitorLog params
     */
    static sendError(params) {
        AppMonitor.logger.error(params);
    }
    /**
     * @deprecated
     * Wrapper method to provide easy transition from standard logger. Use 'sendError' method for better results.
     * @param fileName
     * @param methodName
     * @param args
     */
    static error(fileName, methodName, ...args) {
        AppMonitor.sendError({
            methodName,
            location: fileName,
            message: args
                .map((x) => {
                let out = '<unknown>';
                try {
                    out = x.toString();
                }
                catch (e) { }
                return out;
            })
                .join('|')
        });
    }
    // Intended for the messages form the tests
    static test(location, methodName, message, context = {}, data = {}, tags) {
        AppMonitor.logger.test({
            location,
            methodName,
            message,
            data,
            userId: (context === null || context === void 0 ? void 0 : context.userId) || (context === null || context === void 0 ? void 0 : context.user_id) || (context === null || context === void 0 ? void 0 : context.user_uuid),
            tags,
            requestId: (context === null || context === void 0 ? void 0 : context.requestId) || (context === null || context === void 0 ? void 0 : context.request_id)
        });
    }
    static stringifyObjectForLog(data, depth = 3, showHidden = false) {
        return (0, util_1.inspect)(data, { showHidden, depth });
    }
    static overrideLevel(level) {
        this.logger.setLogLevel(level);
    }
}
exports.AppMonitor = AppMonitor;
AppMonitor.logger = new monitor_logger_1.MonitorLogger();
//# sourceMappingURL=app-monitor.js.map