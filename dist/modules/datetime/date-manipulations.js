"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeHelper = void 0;
class DateTimeHelper {
    static addHours(currDate, hours) {
        const newDate = new Date(currDate);
        newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
        return newDate;
    }
    static addDays(currDate, days) {
        const newDate = new Date(currDate);
        newDate.setTime(newDate.getTime() + days * 24 * 60 * 60 * 1000);
        return newDate;
    }
    static addMinutes(currDate, minutes) {
        const newDate = new Date(currDate);
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
}
exports.DateTimeHelper = DateTimeHelper;
//# sourceMappingURL=date-manipulations.js.map