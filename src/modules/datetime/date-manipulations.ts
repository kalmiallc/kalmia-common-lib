export class DateTimeHelper {
  public static addHours(currDate: Date, hours: number): Date {
    currDate.setTime(currDate.getTime() + hours * 60 * 60 * 1000);
    return currDate;
  }
  public static addDays(currDate: Date, days: number): Date {
    currDate.setTime(currDate.getTime() + days * 24 * 60 * 60 * 1000);
    return currDate;
  }
  public static addMinutes(currDate: Date, minutes: number): Date {
    currDate.setTime(currDate.getTime() + minutes * 60 * 1000);
    return currDate;
  }
}
