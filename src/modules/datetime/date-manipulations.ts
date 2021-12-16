export class DateTimeHelper {
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
  public static addHours(inDate: Date, hours: number): Date {
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
  public static addDays(inDate: Date, days: number): Date {
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
  public static addMinutes(inDate: Date, minutes: number): Date {
    const newDate = new Date(inDate);
    newDate.setTime(newDate.getTime() + +minutes * 60 * 1000);
    return newDate;
  }

  public static calculateIntervalTime(intervalStart: Date, intervalEnd: Date) {
    return Math.abs(intervalStart.getTime() - intervalEnd.getTime());
  }

  public static convertMillisecondsToMinutes(milliseconds: number) {
    return milliseconds / 1000 / 60;
  }

  public static convertMillisecondsToHours(milliseconds: number) {
    return milliseconds / 1000 / 60 / 60;
  }

  /**
   * Get start of the day
   *
   * @param date reference date
   * @returns start of the day in new date instance
   */

  public static startOfTheDay(date: Date) {
    const stDay = new Date(date);
    stDay.setHours(0);
    stDay.setMinutes(0);
    stDay.setSeconds(0);
    stDay.setMilliseconds(0);
    return stDay;
  }

  /**
   * Get end of the day
   *
   * @param date reference date
   * @returns start of the day in new date instance
   */

  public static endOfTheDay(date: Date) {
    const endDay = new Date(date);
    endDay.setHours(23);
    endDay.setMinutes(59);
    endDay.setSeconds(59);
    endDay.setMilliseconds(999);
    return endDay;
  }

  /**
   * Get start of the week
   *
   * @param date reference date
   * @param startDay do we need to start with the 00:00:00
   * @returns start of the day in new date instance
   */

  public static startOfWeek(date: Date, startDay = true) {
    const d = new Date(date);
    const ddrif = d.getDay();
    const start = new Date(d.setDate(d.getDate() - ddrif - (ddrif === 0 ? 6 : -1))); // fix as week starts with sunday.
    if (startDay) {
      return DateTimeHelper.startOfTheDay(start);
    }
    return new Date(start);
  }

  /**
   * Get end of the week
   *
   * @param date reference date
   * @param endDay do we need to end with 23:59:59.999
   * @returns start of the day in new date instance
   */

  public static endOfWeek(date: Date, endDay = true) {
    const d = new Date(date);
    const ddrif = d.getDay();
    const end = new Date(d.setDate(d.getDate() - ddrif - (ddrif === 0 ? 6 : -1) + 6)); // fix as week starts with sunday.
    if (endDay) {
      return DateTimeHelper.endOfTheDay(new Date(end));
    }
    return new Date(end);
  }

  /**
   * Get start of the month
   *
   * @param date reference date
   * @param startDay do we need to start with the 00:00:00
   * @returns start of the day in new date instance
   */
  public static startOfMonth(date: Date, startDay = true) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    if (startDay) {
      return DateTimeHelper.startOfTheDay(new Date(start));
    }
    return new Date(start);
  }

  /**
   * Get end of the month
   *
   * @param date reference date
   * @param endDay do we need to end with 23:59:59.999
   * @returns start of the day in new date instance
   */
  public static endOfMonth(date: Date, endDay = true) {
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    if (endDay) {
      return DateTimeHelper.endOfTheDay(new Date(end));
    }
    return new Date(end);
  }

  /**
   * Converts Date to local time based ISO string
   * Example Sun Jan 23 2000 00:00:00 GMT+0100 which equals 2000-01-22T23:00:00.000Z
   * will be converted to 2000-01-23T00:00:00+01:00,
   *
   * @param date Date to be converted
   * @returns converted date in iso string
   */
  public static toISOString(date: Date): string {
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = (num) => {
      const norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };

    return (
      date.getFullYear() +
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
      pad(tzo % 60)
    );
  }

  /**
   * Converts Date to local time based ISO string without timezone part.
   * Example Sun Jan 23 2000 00:00:00 GMT+0100 which equals 2000-01-22T23:00:00.000Z
   * will be converted to 2000-01-23T00:00:00.000,
   *
   * @param date Date to be converted
   * @returns converted date in iso string (no timezone)
   */
  public static toISOStringNoTimezone(date) {
    const local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toISOString().slice(0, local.toISOString().length - 1);
  }

  /**
   * Appends - sets time to current date
   *
   * @param date date to which we append time to.
   * @param time time to be appended
   * @returns date with appended time
   */

  public static appendTimeToDate(date: Date, time: string) {
    const timeParts = time.split(':');
    date.setHours(Number(timeParts[0]));
    date.setMinutes(Number(timeParts[1]));
    date.setSeconds(Number(timeParts[2]));
    const ms = timeParts[2].split('.');
    if (ms[1]) {
      date.setMilliseconds(Number(ms[1]));
    }
    return date;
  }
}
