"use strict";
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
    LOGGER_TYPE: process.env['LOGGER_TYPE'] || types_1.LoggerType.STANDARD
};
//# sourceMappingURL=env.js.map