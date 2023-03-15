"use strict";
/* eslint-disable no-shadow */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationEnv = exports.LogType = exports.LoggerType = void 0;
var LoggerType;
(function (LoggerType) {
    LoggerType["STANDARD"] = "STD";
    LoggerType["NEST"] = "NEST";
})(LoggerType = exports.LoggerType || (exports.LoggerType = {}));
var LogType;
(function (LogType) {
    LogType["TEST"] = "TST";
    LogType["DB"] = "DB";
    LogType["VERBOSE"] = "VBS";
    LogType["DEBUG"] = "DBG";
    LogType["INFO"] = "INF";
    LogType["WARN"] = "WRN";
    LogType["ERROR"] = "ERR";
})(LogType = exports.LogType || (exports.LogType = {}));
/**
 * List of possible applications run environments.
 */
var ApplicationEnv;
(function (ApplicationEnv) {
    ApplicationEnv["TEST"] = "testing";
    ApplicationEnv["DEV"] = "development";
    ApplicationEnv["STG"] = "staging";
    ApplicationEnv["PROD"] = "production";
})(ApplicationEnv = exports.ApplicationEnv || (exports.ApplicationEnv = {}));
//# sourceMappingURL=types.js.map