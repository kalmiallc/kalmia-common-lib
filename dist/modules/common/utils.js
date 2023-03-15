"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUtils = exports.isPlainObject = void 0;
/**
 * Tells if tested variable is plain object.
 *
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
class CommonUtils {
    /**
     * Tells if tested variable is plain object.
     *
     * @param testVar Tested variable
     * @returns boolean
     */
    static isPlainObject(testVar) {
        return isPlainObject(testVar);
    }
    /**
     * Checks if object, variable is null, undefined
     *
     * @param testVar object to be tested
     * @returns true if empty
     */
    static isEmpty(testVar) {
        if (testVar === null || testVar === undefined) {
            return true;
        }
        if (Array.isArray(testVar) && testVar.length === 0) {
            return true;
        }
        if (typeof testVar === 'object' && Object.entries(testVar).length === 0) {
            return true;
        }
        return false;
    }
    /**
     * Returns object key by it's corresponding value. Use with caution -- not very fast
     *
     * @param kvo any object with keys and values.
     * @param val - value of the object
     * @returns key, value pair
     */
    static getObjectByValue(kvo, val) {
        const obj = Object.entries(kvo).find((pair) => pair[1] == val);
        if (!obj) {
            throw new Error(`Object with value ${val} not found`);
        }
        return {
            key: obj[0],
            value: obj[1]
        };
    }
    /**
     *
     * Returns object key by it's corresponding value. Use with caution -- not very fast
     *
     * @param kvo any object with keys and values.
     * @param key - value of the object
     * @returns key, value pair
     */
    static getObjectByKey(kvo, key) {
        const obj = Object.entries(kvo).find((pair) => pair[0] == key);
        if (!obj) {
            throw new Error(`Object with key ${key} not found`);
        }
        return {
            key: obj[0],
            value: obj[1]
        };
    }
}
exports.CommonUtils = CommonUtils;
//# sourceMappingURL=utils.js.map