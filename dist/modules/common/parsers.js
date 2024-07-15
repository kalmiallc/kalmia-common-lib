"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParser = JSONParser;
/**
 * Parses JSON from the given field.
 *
 * @returns Parsed JSON.
 */
function JSONParser() {
    return (value) => {
        try {
            if (typeof value == 'string') {
                return JSON.parse(value);
            }
            return value;
        }
        catch (e) {
            return null;
        }
    };
}
//# sourceMappingURL=parsers.js.map