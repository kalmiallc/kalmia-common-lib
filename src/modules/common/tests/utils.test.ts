import { CommonUtils } from './../utils';
class NotificationSeverity {
  public static INFO = 1;
  public static WARNING = 2;
  public static ERROR = 3;
}

describe('Common utils tests ', () => {
  it('Should return object by value', () => {
    const object = CommonUtils.getObjectByValue(NotificationSeverity, NotificationSeverity.ERROR);
    expect(object.key).toBe('ERROR');
    expect(object.value).toBe(3);
  });
  it('Should not return object by value', () => {
    const t = () => {
      CommonUtils.getObjectByValue(NotificationSeverity, 'ERROR');
    };
    expect(t).toThrow(Error);
  });

  it('Should return object by key', () => {
    const object = CommonUtils.getObjectByKey(NotificationSeverity, 'ERROR');
    expect(object.key).toBe('ERROR');
    expect(object.value).toBe(3);
  });

  it('Should not return object by key', () => {
    const t = () => {
      CommonUtils.getObjectByValue(NotificationSeverity, 'ddd');
    };
    expect(t).toThrow(Error);
  });

  it('Should return true for empty object', () => {
    expect(CommonUtils.isEmpty({})).toBe(true);
    expect(CommonUtils.isEmpty([])).toBe(true);
    expect(CommonUtils.isEmpty(null)).toBe(true);
    expect(CommonUtils.isEmpty(undefined)).toBe(true);
    expect(CommonUtils.isEmpty(1)).toBe(false);
    expect(CommonUtils.isEmpty(NotificationSeverity.INFO)).toBe(false);
    expect(CommonUtils.isEmpty('Test string')).toBe(false);
    expect(CommonUtils.isEmpty([1, 2])).toBe(false);
    expect(CommonUtils.isEmpty({ a: 10 })).toBe(false);
  });
  it('Should return true for plain object', () => {
    expect(CommonUtils.isPlainObject({})).toBe(true);
    expect(CommonUtils.isPlainObject([])).toBe(false);
    expect(CommonUtils.isPlainObject(null)).toBe(false);
    expect(CommonUtils.isPlainObject(undefined)).toBe(false);
    expect(CommonUtils.isPlainObject(1)).toBe(false);
    expect(CommonUtils.isPlainObject(NotificationSeverity.INFO)).toBe(false);
    expect(CommonUtils.isPlainObject('Test string')).toBe(false);
    expect(CommonUtils.isPlainObject([1, 2])).toBe(false);
    expect(CommonUtils.isPlainObject({ a: 10 })).toBe(true);
  });
});
