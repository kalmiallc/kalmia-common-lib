/**
 * Validates if value is inside enumerator
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