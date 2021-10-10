export class DateTimeHelper {
  private static addHours(currDate: Date, hours: number): Date {
    currDate.setTime(currDate.getTime() + hours * 60 * 60 * 1000);
    return currDate;
  }
}
