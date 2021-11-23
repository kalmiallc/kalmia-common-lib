import { DateTimeHelper } from './../date-manipulations';

describe('Date time manipulation tests', () => {
  it('Get start of the day, end of the day', () => {
    const testDate = new Date('2011-10-10T12:21:22');
    expect(DateTimeHelper.startOfTheDay(testDate)).toEqual(new Date('2011-10-10T00:00:00'));
    expect(DateTimeHelper.endOfTheDay(testDate)).toEqual(new Date('2011-10-10T23:59:59.999'));
  });
});
