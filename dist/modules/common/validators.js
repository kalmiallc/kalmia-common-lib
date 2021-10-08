"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionalPresenceValidator = exports.enumInclusionValidator = void 0;
/**
 * Validates if value is inside enumerator
 */
function enumInclusionValidator(enumerator, allowNull = false) {
    return function (value) {
        if (allowNull && (value === null || value === undefined)) {
            return true;
        }
        let valid = false;
        for (const key in enumerator) {
            if (Object.prototype.hasOwnProperty.call(enumerator, key) && value === enumerator[key]) {
                valid = true;
                break;
            }
        }
        return valid;
    };
}
exports.enumInclusionValidator = enumInclusionValidator;
/**
 * Validates the presence of fields in current object.
 * If field is not empty it will return true.
 *
 * @param fieldNames to be validated
 * @returns True if field not empty
 */
function conditionalPresenceValidator(fieldNames) {
    return async function () {
        for (const fieldName of fieldNames) {
            // This handles boolean value. When the field value is explicity set to false.
            if (this[fieldName] === false) {
                return true;
            }
            if (this[fieldName]) {
                return true;
            }
        }
        return false;
    };
}
exports.conditionalPresenceValidator = conditionalPresenceValidator;
//# sourceMappingURL=validators.js.map