"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = void 0;
/**
 * Tells if tested variable is plain object.
 * @param testVar Tested variable
 * @returns boolean
 */
function isPlainObject(testVar) {
    if (testVar === null || testVar === undefined || typeof testVar !== 'object' || Array.isArray(testVar) || typeof (testVar === null || testVar === void 0 ? void 0 : testVar.getMonth) === 'function') {
        return false;
    }
    return true;
}
exports.isPlainObject = isPlainObject;
//# sourceMappingURL=utils.js.map