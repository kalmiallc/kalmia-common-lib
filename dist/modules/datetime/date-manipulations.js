"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeHelper = void 0;
class DateTimeHelper {
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
    static addHours(inDate, hours) {
        const newDate = new Date(inDate);
        newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
        return newDate;
    }
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
    static addDays(inDate, days) {
        const newDate = new Date(inDate);
        newDate.setTime(newDate.getTime() + days * 24 * 60 * 60 * 1000);
        return newDate;
    }
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
    static addMinutes(inDate, minutes) {
        const newDate = new Date(inDate);
        newDate.setTime(newDate.getTime() + +minutes * 60 * 1000);
        return newDate;
    }
    static calculateIntervalTime(intervalStart, intervalEnd) {
        return Math.abs(intervalStart.getTime() - intervalEnd.getTime());
    }
    static convertMillisecondsToMinutes(milliseconds) {
        return milliseconds / 1000 / 60;
    }
    static convertMillisecondsToHours(milliseconds) {
        return milliseconds / 1000 / 60 / 60;
    }
    /**
    * Converts Date to local time based ISO string
    * Example Sun Jan 23 2000 00:00:00 GMT+0100 which equals 2000-01-22T23:00:00.000Z
    * will be converted to 2000-01-23T00:00:00+01:00,
    *
    * @param date Date to be converted
    * @returns converted date in iso string
    */
    static toISOString(date) {
        const tzo = -date.getTimezoneOffset();
        const dif = tzo >= 0 ? '+' : '-';
        const pad = (num) => {
            const norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
        return (date.getFullYear() +
            '-' +
            pad(date.getMonth() + 1) +
            '-' +
            pad(date.getDate()) +
            'T' +
            pad(date.getHours()) +
            ':' +
            pad(date.getMinutes()) +
            ':' +
            pad(date.getSeconds()) +
            dif +
            pad(tzo / 60) +
            ':' +
            pad(tzo % 60));
    }
    /**
     * Converts Date to local time based ISO string without timezone part.
     * Example Sun Jan 23 2000 00:00:00 GMT+0100 which equals 2000-01-22T23:00:00.000Z
     *  will be converted to 2000-01-23T00:00:00.000,
     *
     * @param date Date to be converted
     * @returns converted date in iso string (no timezone)
     */
    static toISOStringNoTimezone(date) {
        const local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toISOString().slice(0, local.toISOString().length - 1);
    }
}
exports.DateTimeHelper = DateTimeHelper;
//# sourceMappingURL=date-manipulations.js.map