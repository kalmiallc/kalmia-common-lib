export declare class DateTimeHelper {
    static addHours(currDate: Date, hours: number): Date;
    static addDays(currDate: Date, days: number): Date;
    static addMinutes(currDate: Date, minutes: number): Date;
    static calculateIntervalTime(intervalStart: Date, intervalEnd: Date): number;
    static convertMillisecondsToMinutes(milliseconds: number): number;
    static convertMillisecondsToHours(milliseconds: number): number;
    /**
    * Converts Date to local time based ISO string
    * Example Sun Jan 23 2000 00:00:00 GMT+0100 which equals 2000-01-22T23:00:00.000Z
    * will be converted to 2000-01-23T00:00:00+01:00,
    *
    * @param date Date to be converted
    * @returns converted date in iso string
    */
    static toISOString(date: Date): string;
    /**
     * Converts Date to local time based ISO string without timezone part.
     * Example Sun Jan 23 2000 00:00:00 GMT+0100 which equals 2000-01-22T23:00:00.000Z
     *  will be converted to 2000-01-23T00:00:00.000,
     *
     * @param date Date to be converted
     * @returns converted date in iso string (no timezone)
     */
    static toISOStringNoTimezone(date: any): string;
}
//# sourceMappingURL=date-manipulations.d.ts.map