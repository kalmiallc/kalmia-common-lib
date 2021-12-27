import { env } from '../../../config/env';
import { LogType } from './../../../config/types';
import { AppLogger } from './../app-logger';

describe('Logger tests', () => {
  it('Logger out tests color', () => {
    env.LOG_OUT_LEVEL = LogType.VERBOSE;
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Color out -------------');
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Color out end -------------');
  });

  it('Logger out tests console', () => {
    env.LOG_OUT_LEVEL = LogType.VERBOSE;
    env.LOG_TARGET = 'console';
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Console out -------------');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Console out');
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Console out end -------------');
    env.LOG_TARGET = 'color';
  });

  it('Logger out tests none', () => {
    env.LOG_OUT_LEVEL = LogType.VERBOSE;
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ None out -------------');
    env.LOG_TARGET = 'none';
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    env.LOG_TARGET = 'color';
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ None out end -------------');
  });

  it('Logger out tests debug level', () => {
    env.LOG_OUT_LEVEL = LogType.DEBUG;
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Debug level out -------------');
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Debug level out end -------------');
  });

  it('Logger out tests info level', () => {
    env.LOG_OUT_LEVEL = LogType.INFO;
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Info level out -------------');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level');
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Info level out end-------------');
  });

  it('Logger out tests warn level', () => {
    env.LOG_OUT_LEVEL = LogType.WARN;
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Warn level out -------------');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level');
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ Warn level out end-------------');
  });

  it('Logger out tests db only', () => {
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ DB level out -------------');
    env.LOG_OUT_LEVEL = LogType.DB;
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level');
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    env.LOG_OUT_LEVEL = LogType.WARN;
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ DB level out end-------------');
  });

  it('Logger out tests db only', () => {
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ TEST level out -------------');
    env.LOG_OUT_LEVEL = LogType.TEST;
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level');
    AppLogger.error('TestMethod', 'Logger.test.ts', 'Error level log');
    AppLogger.warn('TestMethod', 'Logger.test.ts', 'Warn level log');
    AppLogger.info('TestMethod', 'Logger.test.ts', 'Info level log');
    AppLogger.debug('TestMethod', 'Logger.test.ts', 'Debug level log');
    AppLogger.trace('TestMethod', 'Logger.test.ts', 'Trace level log');
    AppLogger.test('TestMethod', 'Logger.test.ts', 'Test level log');
    AppLogger.db('TestMethod', 'Logger.test.ts', 'Db level log');
    env.LOG_OUT_LEVEL = LogType.WARN;
    AppLogger.info('TestMethod', 'Logger.test.ts', '------------ TEST level out end-------------');
  });
});
