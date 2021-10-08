

/**
 * Validates if value is inside enumerator
 */
export function enumInclusionValidator(enumerator: any, allowNull = false) {
  return function (value: any) {
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
export function conditionalPresenceValidator(fieldNames: string[]) {
  return async function (this: any) {
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
