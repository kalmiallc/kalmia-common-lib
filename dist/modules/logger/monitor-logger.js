"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorLogger = exports.MonitorLogType = void 0;
const safe_1 = require("colors/safe");
const env_1 = require("../../config/env");
var MonitorLogType;
(function (MonitorLogType) {
    MonitorLogType["DB"] = "DB";
    MonitorLogType["INFO"] = "INFO";
    MonitorLogType["MSG"] = "MSG";
    MonitorLogType["WARN"] = "WARNING";
    MonitorLogType["ERROR"] = "ERROR";
    MonitorLogType["ALERT"] = "ALERT";
    MonitorLogType["VERBOSE"] = "VERBOSE";
    MonitorLogType["DEBUG"] = "DEBUG";
    MonitorLogType["TEST"] = "TEST";
})(MonitorLogType || (exports.MonitorLogType = MonitorLogType = {}));
function currentDateTime() {
    const currDate = new Date();
    return currDate.toLocaleString('sl-SI') + '.' + currDate.getMilliseconds();
}
function expressInConsole(type, message, location) {
    console.log(`[${type}][${currentDateTime()}][${location}]: `, message);
}
function expressInColor(type, message, location) {
    let bgColor = safe_1.bgBlack;
    let color = safe_1.black;
    switch (type) {
        case MonitorLogType.TEST:
            bgColor = safe_1.bgYellow;
            color = safe_1.green;
            break;
        case MonitorLogType.DB:
            bgColor = safe_1.bgMagenta;
            color = safe_1.magenta;
            break;
        case MonitorLogType.VERBOSE:
            bgColor = safe_1.bgCyan;
            color = safe_1.cyan;
            break;
        case MonitorLogType.DEBUG:
            bgColor = safe_1.bgBlue;
            color = safe_1.blue;
            break;
        case MonitorLogType.INFO:
            bgColor = safe_1.bgWhite;
            color = safe_1.white;
            break;
        case MonitorLogType.WARN:
            bgColor = safe_1.bgYellow;
            color = safe_1.yellow;
            break;
        case MonitorLogType.ERROR:
            bgColor = safe_1.bgRed;
            color = safe_1.red;
            break;
        default:
            bgColor = safe_1.bgBlack;
            color = safe_1.white;
    }
    console.log(bgColor((0, safe_1.black)(`[${type}]`)), (0, safe_1.gray)(`[${currentDateTime()}][${location}]:`), color(message));
}
function allowLog(type, logLevel) {
    var _a;
    if (!logLevel) {
        logLevel = (_a = env_1.env.K_MONITOR_LOG_LEVEL) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    }
    // filter out log level
    if (logLevel === MonitorLogType.ERROR) {
        if (type === MonitorLogType.DEBUG ||
            type === MonitorLogType.VERBOSE ||
            type === MonitorLogType.WARN ||
            type === MonitorLogType.INFO ||
            type === MonitorLogType.TEST ||
            type === MonitorLogType.DB) {
            return false;
        }
    }
    if (logLevel === MonitorLogType.INFO) {
        if (type === MonitorLogType.DEBUG || type === MonitorLogType.VERBOSE) {
            return false;
        }
    }
    if (logLevel === MonitorLogType.WARN) {
        if (type === MonitorLogType.DEBUG || type === MonitorLogType.VERBOSE) {
            return false;
        }
    }
    if (logLevel === MonitorLogType.DEBUG) {
        if (type === MonitorLogType.VERBOSE) {
            return false;
        }
    }
    if (logLevel === MonitorLogType.DB) {
        const allTypes = Object.values(MonitorLogType).filter((k) => k !== MonitorLogType.DB);
        if (allTypes.find((x) => x === type)) {
            return false;
        }
    }
    if (logLevel === MonitorLogType.TEST) {
        const allTypes = Object.values(MonitorLogType).filter((m) => m !== MonitorLogType.TEST);
        if (allTypes.find((x) => x === type)) {
            return false;
        }
    }
    return true;
}
function writeLogToConsole(type, message, location, logLevel) {
    const logToConsole = !env_1.env.K_MONITOR_NO_CONSOLE;
    if (!allowLog(type, logLevel) || !logToConsole) {
        return;
    }
    if (env_1.env.LOG_TARGET == 'color') {
        expressInColor(type, message, location);
    }
    else {
        expressInConsole(type, message, location);
    }
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
class MonitorLogger {
    constructor() {
        this.apiUrl = env_1.env.K_MONITOR_API_URL || 'https://api.monitor.kalmia.si';
        this.apiKey = env_1.env.K_MONITOR_API_KEY || '';
        this.apiSecret = env_1.env.K_MONITOR_API_SECRET || '';
        this.disableApi = env_1.env.K_MONITOR_DISABLE_API;
    }
    setLogLevel(ll) {
        this.logLevel = ll;
    }
    info(params) {
        const payload = Object.assign({ logType: MonitorLogType.INFO, timestamp: new Date() }, params);
        this.logToMonitor(payload);
    }
    debug(params) {
        const payload = Object.assign({ logType: MonitorLogType.DEBUG, timestamp: new Date() }, params);
        this.logToMonitor(payload);
    }
    verbose(params) {
        const payload = Object.assign({ logType: MonitorLogType.VERBOSE, timestamp: new Date() }, params);
        this.logToMonitor(payload);
    }
    warn(params) {
        const payload = Object.assign({ logType: MonitorLogType.WARN, timestamp: new Date() }, params);
        this.logToMonitor(payload);
    }
    error(params) {
        const payload = Object.assign({ logType: MonitorLogType.ERROR, timestamp: new Date() }, params);
        this.logToMonitor(payload);
    }
    // Intended for the messages form the tests
    test(params) {
        const payload = Object.assign({ logType: MonitorLogType.DB, timestamp: new Date() }, params);
        writeLogToConsole(MonitorLogType.TEST, JSON.stringify(payload), payload.location, this.logLevel);
    }
    // Intended for the messages form the db
    db(params) {
        const payload = Object.assign({ logType: MonitorLogType.DB, timestamp: new Date() }, params);
        this.logToMonitor(payload);
    }
    request(params) {
        const payload = Object.assign({ timestamp: new Date() }, params);
        this.logRequestToMonitor(payload);
    }
    async logRequestToMonitor(payload) {
        await this.sendPayload('write-request-log', payload);
    }
    async logToMonitor(payload) {
        if (!allowLog(payload.logType, this.logLevel)) {
            return;
        }
        writeLogToConsole(payload.logType, JSON.stringify(payload), 'monitor-logger.ts/logToMonitor');
        await this.sendPayload('write-log', payload);
    }
    async sendPayload(endpoint, payload) {
        if (this.disableApi) {
            writeLogToConsole(MonitorLogType.DEBUG, `API is disabled!`, 'monitor-logger.ts', this.logLevel);
            return;
        }
        if (!this.apiUrl || !this.apiKey || !this.apiSecret) {
            writeLogToConsole(MonitorLogType.WARN, `Missing SDK environment configuration! Logs will not be sent!
         Set your API credentials or set env variable K_MONITOR_DISABLE_API=true to stop showing this warning.`, 'monitor-logger.ts', this.logLevel);
            return;
        }
        const url = `${this.apiUrl}/${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')
                },
                body: JSON.stringify(payload)
            });
            writeLogToConsole(MonitorLogType.DEBUG, `Payload sent successfully to ${url}. Response: ${JSON.stringify(await response.json())}`, 'monitor-logger.ts', this.logLevel);
        }
        catch (error) {
            writeLogToConsole(MonitorLogType.ERROR, `Failed to send payload to ${url}. Error: ${error.message}`, 'monitor-logger.ts', this.logLevel);
        }
    }
}
exports.MonitorLogger = MonitorLogger;
//# sourceMappingURL=monitor-logger.js.map