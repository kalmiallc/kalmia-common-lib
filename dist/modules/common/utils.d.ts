/**
 * Tells if tested variable is plain object.
 *
 * @param testVar Tested variable
 * @returns boolean
 */
export declare function isPlainObject(testVar: any): boolean;
export declare class CommonUtils {
    /**
     * Tells if tested variable is plain object.
     *
     * @param testVar Tested variable
     * @returns boolean
     */
    static isPlainObject(testVar: any): boolean;
    /**
     * Checks if object, variable is null, undefined
     *
     * @param testVar object to be tested
     * @returns true if empty
     */
    static isEmpty(testVar: any): boolean;
    /**
     * Returns object key by it's corresponding value. Use with caution -- not very fast
     *
     * @param kvo any object with keys and values.
     * @param val - value of the object
     * @returns key, value pair
     */
    static getObjectByValue(kvo: any, val: any): {
        key: any;
        value: any;
    };
    /**
     *
     * Returns object key by it's corresponding value. Use with caution -- not very fast
     *
     * @param kvo any object with keys and values.
     * @param key - value of the object
     * @returns key, value pair
     */
    static getObjectByKey(kvo: any, key: any): {
        key: any;
        value: any;
    };
}
//# sourceMappingURL=utils.d.ts.map