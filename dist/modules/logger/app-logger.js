"use strict";
/**
 * AppLogger is general wrapper that is compliant with other logging frameworks, such as Pino, Winston, NestJs logger.
 * This class provides wrapper for logging. Developer should always use methods from this class for the logging.
 * Currently standard logger is used as default.
 *
 * The default logger can be overridden with the setLogger method.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const util_1 = require("util");
const logger_1 = require("./logger");
class AppLogger {
    static setLogLevel(ll) {
        if (!ll) {
            AppLogger.logger.warn(['appLogger.ts', 'AppLogger', 'Could not set log level, as it is not defined']);
            return;
        }
        this.logger.setLogLevel(ll);
    }
    static setLogger(logger) {
        AppLogger.logger = logger;
    }
    static info(fileName, methodName, ...args) {
        AppLogger.logger.info([fileName, methodName, ...args]);
    }
    static debug(fileName, methodName, ...args) {
        AppLogger.logger.debug([fileName, methodName, ...args]);
    }
    static trace(fileName, methodName, ...args) {
        AppLogger.logger.verbose([fileName, methodName, ...args]);
    }
    static warn(fileName, methodName, ...args) {
        AppLogger.logger.warn([fileName, methodName, ...args]);
    }
    static error(fileName, methodName, ...args) {
        AppLogger.logger.error([fileName, methodName, ...args]);
    }
    // Intended for the messages form the tests
    static test(fileName, methodName, ...args) {
        args.unshift('[ TEST ] ');
        AppLogger.logger.info([fileName, methodName, ...args]);
    }
    static stringifyObjectForLog(data, depth = 3, showHidden = false) {
        return (0, util_1.inspect)(data, { showHidden, depth });
    }
    static overrideLevel(level) {
        this.logger.setLogLevel(level);
    }
}
exports.AppLogger = AppLogger;
AppLogger.logger = new logger_1.StandardLogger();
//# sourceMappingURL=app-logger.js.map