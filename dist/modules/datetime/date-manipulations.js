"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeHelper = void 0;
class DateTimeHelper {
    static addHours(currDate, hours) {
        currDate.setTime(currDate.getTime() + hours * 60 * 60 * 1000);
        return currDate;
    }
}
exports.DateTimeHelper = DateTimeHelper;
//# sourceMappingURL=date-manipulations.js.map