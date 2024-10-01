"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
/* eslint-disable radix */
const dotenv = require("dotenv");
const types_1 = require("./types");
/**
 * Load variables from .env.
 */
dotenv.config();
exports.env = {
    APP_ENV: process.env['APP_ENV'] || types_1.ApplicationEnv.DEV,
    /**
     * Log writing destination.
     */
    LOG_TARGET: process.env['LOG_TARGET'] || 'color',
    LOG_OUT_LEVEL: process.env['LOG_OUT_LEVEL'] || 'WRN',
    LOGGER_TYPE: process.env['LOGGER_TYPE'] || types_1.LoggerType.STANDARD,
    /**
     * Kalmia monitor integration parameters
     */
    K_MONITOR_LOG_LEVEL: process.env['K_MONITOR_LOG_LEVEL'] || 'INFO',
    K_MONITOR_API_URL: process.env['K_MONITOR_API_URL'],
    K_MONITOR_API_KEY: process.env['K_MONITOR_API_KEY'],
    K_MONITOR_API_SECRET: process.env['K_MONITOR_API_SECRET'],
    K_MONITOR_DISABLE_API: ((_a = process.env['K_MONITOR_DISABLE_API']) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true',
    K_MONITOR_NO_CONSOLE: ((_b = process.env['K_MONITOR_NO_CONSOLE']) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'true'
};
//# sourceMappingURL=env.js.map