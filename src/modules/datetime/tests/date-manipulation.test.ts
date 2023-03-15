import { DateTimeHelper } from './../date-manipulations';

describe('Date time manipulation tests', () => {
  it('Get start of the day, end of the day', () => {
    const testDate = new Date('2021-10-10T12:21:22');
    expect(DateTimeHelper.startOfTheDay(testDate)).toEqual(new Date('2021-10-10T00:00:00'));
    expect(DateTimeHelper.endOfTheDay(testDate)).toEqual(new Date('2021-10-10T23:59:59.999'));
  });

  it('Get start of the week', () => {
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-21T12:21:22'))).toEqual(new Date('2021-11-15T00:00:00')); // sunday
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-22T12:21:22'))).toEqual(new Date('2021-11-22T00:00:00')); // monday
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-23T12:21:22'))).toEqual(new Date('2021-11-22T00:00:00'));
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-24T12:21:22'))).toEqual(new Date('2021-11-22T00:00:00'));
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-25T12:21:22'))).toEqual(new Date('2021-11-22T00:00:00'));
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-26T12:21:22'))).toEqual(new Date('2021-11-22T00:00:00'));
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-27T12:21:22'))).toEqual(new Date('2021-11-22T00:00:00'));
    expect(DateTimeHelper.startOfWeek(new Date('2021-11-28T12:21:22'))).toEqual(new Date('2021-11-22T00:00:00')); //sunday
    expect(DateTimeHelper.startOfWeek(new Date('2021-12-01T12:21:22'))).toEqual(new Date('2021-11-29T00:00:00'));

    //leap year
    expect(DateTimeHelper.startOfWeek(new Date('2022-03-01T12:21:22'))).toEqual(new Date('2022-02-28T00:00:00'));
    expect(DateTimeHelper.startOfWeek(new Date('2022-02-28T12:21:22'))).toEqual(new Date('2022-02-28T00:00:00'));
    expect(DateTimeHelper.startOfWeek(new Date('2022-03-06T12:21:22'))).toEqual(new Date('2022-02-28T00:00:00'));

    expect(DateTimeHelper.startOfWeek(new Date('2022-01-01T12:21:22'))).toEqual(new Date('2021-12-27T00:00:00'));
  });

  it('Get end of the week', () => {
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-21T12:21:22'))).toEqual(new Date('2021-11-21T23:59:59.999')); // sunday
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-22T12:21:22'))).toEqual(new Date('2021-11-28T23:59:59.999')); // monday
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-23T12:21:22'))).toEqual(new Date('2021-11-28T23:59:59.999'));
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-24T12:21:22'))).toEqual(new Date('2021-11-28T23:59:59.999'));
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-25T12:21:22'))).toEqual(new Date('2021-11-28T23:59:59.999'));
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-26T12:21:22'))).toEqual(new Date('2021-11-28T23:59:59.999'));
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-27T12:21:22'))).toEqual(new Date('2021-11-28T23:59:59.999'));
    expect(DateTimeHelper.endOfWeek(new Date('2021-11-28T12:21:22'))).toEqual(new Date('2021-11-28T23:59:59.999')); //sunday
    expect(DateTimeHelper.endOfWeek(new Date('2021-12-01T12:21:22'))).toEqual(new Date('2021-12-05T23:59:59.999'));

    //leap year
    expect(DateTimeHelper.endOfWeek(new Date('2022-03-01T12:21:22'))).toEqual(new Date('2022-03-06T23:59:59.999'));
    expect(DateTimeHelper.endOfWeek(new Date('2022-02-28T12:21:22'))).toEqual(new Date('2022-03-06T23:59:59.999'));
    expect(DateTimeHelper.endOfWeek(new Date('2022-03-06T12:21:22'))).toEqual(new Date('2022-03-06T23:59:59.999'));

    expect(DateTimeHelper.endOfWeek(new Date('2021-12-27T12:21:22'))).toEqual(new Date('2022-01-02T23:59:59.999'));
  });

  it('Get start of the month', () => {
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-21T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00')); // sunday
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-22T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00')); // monday
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-23T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00'));
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-24T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00'));
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-25T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00'));
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-26T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00'));
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-27T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00'));
    expect(DateTimeHelper.startOfMonth(new Date('2021-11-28T12:21:22'))).toEqual(new Date('2021-11-01T00:00:00')); //sunday
    expect(DateTimeHelper.startOfMonth(new Date('2021-12-01T12:21:22'))).toEqual(new Date('2021-12-01T00:00:00'));

    //leap year
    expect(DateTimeHelper.startOfMonth(new Date('2022-03-01T12:21:22'))).toEqual(new Date('2022-03-01T00:00:00'));
    expect(DateTimeHelper.startOfMonth(new Date('2022-02-28T12:21:22'))).toEqual(new Date('2022-02-01T00:00:00'));
    expect(DateTimeHelper.startOfMonth(new Date('2022-03-06T12:21:22'))).toEqual(new Date('2022-03-01T00:00:00'));

    expect(DateTimeHelper.startOfMonth(new Date('2021-01-02T12:21:22'))).toEqual(new Date('2021-01-01T00:00:00'));
  });

  it('Get end of the month', () => {
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-21T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-22T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999')); // monday
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-23T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-24T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-25T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-26T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-27T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2021-11-28T12:21:22'))).toEqual(new Date('2021-11-30T23:59:59.999')); //sunday
    expect(DateTimeHelper.endOfMonth(new Date('2021-12-01T12:21:22'))).toEqual(new Date('2021-12-31T23:59:59.999'));

    //leap year
    expect(DateTimeHelper.endOfMonth(new Date('2022-03-01T12:21:22'))).toEqual(new Date('2022-03-31T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2022-02-28T12:21:22'))).toEqual(new Date('2022-02-28T23:59:59.999'));
    expect(DateTimeHelper.endOfMonth(new Date('2022-03-06T12:21:22'))).toEqual(new Date('2022-03-31T23:59:59.999'));
  });

  it('Append time to date', () => {
    expect(DateTimeHelper.appendTimeToDate(new Date('2021-11-21T00:10:00'), '12:40:15')).toEqual(new Date('2021-11-21T12:40:15'));
    expect(DateTimeHelper.appendTimeToDate(new Date('2021-11-20T00:10:00'), '17:40:19.522')).toEqual(new Date('2021-11-20T17:40:19.522'));
    expect(DateTimeHelper.appendTimeToDate(new Date('2021-11-20T00:10:00'), '25:40:19')).toEqual(new Date('2021-11-21T01:40:19'));
  });
});
