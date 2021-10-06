

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
 * 
 * @param fieldNames 
 * @returns 
 */
export function conditionalPresenceValidator(fieldNames: string[]) {
  return async function (this: any) {
    for (const fieldName of fieldNames) {
      if (this[fieldName]) {
        return true;
      }
    }
    return false;
  };
}
