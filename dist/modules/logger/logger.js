"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardLogger = void 0;
const safe_1 = require("colors/safe");
const env_1 = require("../../config/env");
const types_1 = require("../../config/types");
function currentDateTime() {
    const currDate = new Date();
    return currDate.toLocaleString('sl-SI') + '.' + currDate.getMilliseconds();
}
function expressInConsole(type, message, error) {
    message = `${typeof message == 'string' ? message : JSON.stringify(message, null, 2)}${message && error && error.message ? ', ' : ''}${error ? `${error.message}` || '' : ''}`;
    if (type === types_1.LogType.ERROR) {
        console.error(`[${type}][${currentDateTime()}]: ${message}`);
    }
    else if (type === types_1.LogType.WARN) {
        console.warn(`[${type}][${currentDateTime()}]: ${message}`);
    }
    else {
        console.log(`[${type}][${currentDateTime()}]: ${message}`);
    }
}
function expressInColor(type, message, error) {
    let bgColor = safe_1.bgBlack;
    let color = safe_1.black;
    switch (type) {
        case types_1.LogType.TEST:
            bgColor = safe_1.bgYellow;
            color = safe_1.green;
            break;
        case types_1.LogType.DB:
            bgColor = safe_1.bgMagenta;
            color = safe_1.magenta;
            break;
        case types_1.LogType.VERBOSE:
            bgColor = safe_1.bgCyan;
            color = safe_1.cyan;
            break;
        case types_1.LogType.DEBUG:
            bgColor = safe_1.bgBlue;
            color = safe_1.blue;
            break;
        case types_1.LogType.INFO:
            bgColor = safe_1.bgGreen;
            color = safe_1.green;
            break;
        case types_1.LogType.WARN:
            bgColor = safe_1.bgYellow;
            color = safe_1.yellow;
            break;
        case types_1.LogType.ERROR:
            bgColor = safe_1.bgRed;
            color = safe_1.red;
            break;
        default:
            bgColor = safe_1.bgBlack;
            color = safe_1.white;
    }
    console.log(bgColor((0, safe_1.black)(`[${type}]`)), (0, safe_1.gray)(`[${currentDateTime()}]:`), color(`${typeof message == 'string' ? message : JSON.stringify(message, null, 2)}${message && error && error.message ? ', ' : ''}${error ? `${error.message}` || '' : ''}`));
}
function writeLog(type, message, error, loglevel) {
    if (!loglevel) {
        loglevel = env_1.env.LOG_OUT_LEVEL;
    }
    // filter out log level
    if (loglevel === types_1.LogType.ERROR) {
        if (type === types_1.LogType.DEBUG ||
            type === types_1.LogType.VERBOSE ||
            type === types_1.LogType.WARN ||
            type === types_1.LogType.INFO ||
            type === types_1.LogType.TEST ||
            type === types_1.LogType.DB) {
            return;
        }
    }
    if (loglevel === types_1.LogType.INFO || loglevel === types_1.LogType.ERROR) {
        if (type === types_1.LogType.DEBUG || type === types_1.LogType.VERBOSE || type === types_1.LogType.WARN || type === types_1.LogType.DB) {
            return;
        }
    }
    if (loglevel === types_1.LogType.WARN || loglevel === types_1.LogType.INFO || loglevel === types_1.LogType.ERROR) {
        if (type === types_1.LogType.DEBUG || type === types_1.LogType.VERBOSE || type === types_1.LogType.DB) {
            return;
        }
    }
    if (loglevel === types_1.LogType.DEBUG) {
        if (type === types_1.LogType.VERBOSE) {
            return;
        }
    }
    if (loglevel === types_1.LogType.DB) {
        const allTypes = Object.values(types_1.LogType).filter((k) => k !== types_1.LogType.DB);
        if (allTypes.find((x) => x === type)) {
            return;
        }
    }
    if (loglevel === types_1.LogType.TEST) {
        const allTypes = Object.values(types_1.LogType).filter((m) => m !== types_1.LogType.TEST);
        if (allTypes.find((x) => x === type)) {
            return;
        }
    }
    if (env_1.env.LOG_TARGET == 'color') {
        expressInColor(type, message, error);
    }
    else if (env_1.env.LOG_TARGET == 'console') {
        expressInConsole(type, message, error);
    }
}
/**
 * Standard logger. This logger uses common logging methods with addition to test and db methods.
 * Test method runs on [INF] level, providing additional [ TEST ] argument.
 * DB method runs on [VERBOSE] level, providing additional [ DB ] argument.
 *
 * Both test and db level can be filtered regardless of the level, but be included in corresponding levels.
 *
 */
class StandardLogger {
    setLogLevel(ll) {
        this.loglevel = ll;
    }
    info(args) {
        const fileName = args.shift();
        const methodName = args.shift();
        const location = `[${fileName}/${methodName}]`;
        args.push(location);
        writeLog(types_1.LogType.INFO, args.join(', '), null, this.loglevel);
    }
    debug(args) {
        const fileName = args.shift();
        const methodName = args.shift();
        const location = `[${fileName}/${methodName}]`;
        args.push(location);
        writeLog(types_1.LogType.DEBUG, args.join(' '), null, this.loglevel);
    }
    verbose(args) {
        const fileName = args.shift();
        const methodName = args.shift();
        const location = `[${fileName}/${methodName}]`;
        args.push(location);
        writeLog(types_1.LogType.VERBOSE, args.join(' '), null, this.loglevel);
    }
    warn(args) {
        const fileName = args.shift();
        const methodName = args.shift();
        const location = `[${fileName}/${methodName}]`;
        args.push(location);
        writeLog(types_1.LogType.WARN, args.join(' '), null, this.loglevel);
    }
    error(args) {
        const fileName = args.shift();
        const methodName = args.shift();
        const location = `[${fileName}/${methodName}]`;
        args.push(location);
        writeLog(types_1.LogType.ERROR, args.join(' '), null, this.loglevel);
    }
    // Intended for the messages form the tests
    test(args) {
        const fileName = args.shift();
        const methodName = args.shift();
        args.unshift('[ TEST ] ');
        const location = `[${fileName}/${methodName}]`;
        args.push(location);
        writeLog(types_1.LogType.TEST, args.join(' '), null, this.loglevel);
    }
    // Intended for the messages form the db
    db(args) {
        const fileName = args.shift();
        const methodName = args.shift();
        args.unshift('[ DB ] ');
        const location = `[${fileName}/${methodName}]`;
        args.push(location);
        writeLog(types_1.LogType.DB, args.join(' '), null, this.loglevel);
    }
}
exports.StandardLogger = StandardLogger;
//# sourceMappingURL=logger.js.map