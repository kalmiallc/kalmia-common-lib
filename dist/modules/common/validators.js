"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumInclusionValidator = enumInclusionValidator;
exports.conditionalPresenceValidator = conditionalPresenceValidator;
/**
 * Validates if value is inside enumerator

 * @param enumerator to be validated
 * @param allowNull if true, null and undefined values will be considered valid
 * @returns True if value is inside enumerator
 * @example
 * enum MyEnum {
 *  A = 'A',
 *  B = 'B',
 *  C = 'C'
 * }
 * const validator = enumInclusionValidator(MyEnum);
 * validator('A'); // true
 * validator('D'); // false
 * validator(null); // false
 * validator(undefined); // false
 *
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
//# sourceMappingURL=validators.js.map