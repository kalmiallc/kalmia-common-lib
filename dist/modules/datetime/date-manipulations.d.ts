export declare class DateTimeHelper {
    /**
     * Adds hours to date and returns new instance of the date with the added hours.
     * NOTICE: This method uses the Date object which uses system defined daylight savings time offsets.
     * Be aware, that on the dates when time changes, the drift is expected. For example, if the time changes on
     * 24.10 03:00 (to -1 h), adding one hour will result in the same time 24.10 03:00.
     *
     * @param inDate - input date
     * @param hours - hours to be added
     * @returns new date with additional hours.
     */
    static addHours(inDate: Date, hours: number): Date;
    /**
     * Adds days to date and returns new instance of the date with the added hours.
     * NOTICE: This method uses the Date object which uses system defined daylight savings time offsets.
     * Be aware, that on the dates when time changes, the drift is expected. For example, if the time changes on
     * 24.10 03:00 (to -1 h), adding one hour will result in the same time 24.10 03:00.
     *
     * @param inDate - input date
     * @param hours - hours to be added
     * @returns new date with additional hours.
     */
    static addDays(inDate: Date, days: number): Date;
    /**
     * Adds days to date and returns new instance of the date with the added hours.
     * NOTICE: This method uses the Date object which uses system defined daylight savings time offsets.
     * Be aware, that on the dates when time changes, the drift is expected. For example, if the time changes on
     * 24.10 03:00 (to -1 h), adding one hour will result in the same time 24.10 03:00.
     *
     * @param inDate - input date
     * @param hours - hours to be added
     * @returns new date with additional hours.
     */
    static addMinutes(inDate: Date, minutes: number): Date;
    static calculateIntervalTime(intervalStart: Date, intervalEnd: Date): number;
    static convertMillisecondsToMinutes(milliseconds: number): number;
    static convertMillisecondsToHours(milliseconds: number): number;
    /**
     * Get start of the day
     *
     * @param date reference date
     * @returns start of the day in new date instance
     */
    static startOfTheDay(date: Date): Date;
    /**
     * Get end of the day
     *
     * @param date reference date
     * @returns start of the day in new date instance
     */
    static endOfTheDay(date: Date): Date;
    /**
     * Get start of the week
     *
     * @param date reference date
     * @param startDay do we need to start with the 00:00:00
     * @returns start of the day in new date instance
     */
    static startOfWeek(date: Date, startDay?: boolean): Date;
    /**
     * Get end of the week
     *
     * @param date reference date
     * @param endDay do we need to end with 23:59:59.999
     * @returns start of the day in new date instance
     */
    static endOfWeek(date: Date, endDay?: boolean): Date;
    /**
     * Get start of the month
     *
     * @param date reference date
     * @param startDay do we need to start with the 00:00:00
     * @returns start of the day in new date instance
     */
    static startOfMonth(date: Date, startDay?: boolean): Date;
    /**
     * Get end of the month
     *
     * @param date reference date
     * @param endDay do we need to end with 23:59:59.999
     * @returns start of the day in new date instance
     */
    static endOfMonth(date: Date, endDay?: boolean): Date;
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
     * will be converted to 2000-01-23T00:00:00.000,
     *
     * @param date Date to be converted
     * @returns converted date in iso string (no timezone)
     */
    static toISOStringNoTimezone(date: any): string;
}
//# sourceMappingURL=date-manipulations.d.ts.map