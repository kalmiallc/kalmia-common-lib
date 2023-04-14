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
export declare function enumInclusionValidator(enumerator: any, allowNull?: boolean): (value: any) => boolean;
/**
 * Validates the presence of fields in current object.
 * If field is not empty it will return true.
 *
 * @param fieldNames to be validated
 * @returns True if field not empty
 */
export declare function conditionalPresenceValidator(fieldNames: string[]): (this: any) => Promise<boolean>;
//# sourceMappingURL=validators.d.ts.map