export class DateTimeHelper {
  public static addHours(currDate: Date, hours: number): Date {
    const newDate = new Date(currDate);
    newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000);
    return newDate;
  }
  public static addDays(currDate: Date, days: number): Date {
    const newDate = new Date(currDate);
    newDate.setTime(newDate.getTime() + days * 24 * 60 * 60 * 1000);
    return newDate;
  }
  public static addMinutes(currDate: Date, minutes: number): Date {
    const newDate = new Date(currDate);
    newDate.setTime(newDate.getTime() + + minutes * 60 * 1000);
    return newDate;
  }
}
