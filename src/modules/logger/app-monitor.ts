import { inspect } from 'util';
import { MonitorLogType, MonitorLogger } from './monitor-logger';

export interface IMonitorLogger {
  error(params: IMonitorLogParams): void;
  info(params: IMonitorLogParams): void;
  warn(params: IMonitorLogParams): void;
  debug(params: IMonitorLogParams): void;
  verbose(params: IMonitorLogParams): void;
  test?(params: IMonitorLogParams): void;
  db?(params: IMonitorLogParams): void;
  cost?(params: IMonitorLogParams): void;
  setLogLevel(ll: MonitorLogType): void;
}

export interface IMonitorLogParams {
  methodName: string;
  message: string;
  location?: string;
  requestId?: string;
  userId?: string;
  data?: any;
  tags?: string[];
}

/**
 * AppMonitor is a logging wrapper that uses MonitorLogger to send logs to Kalmia Monitor server via API.
 *
 * It requires K_MONITOR_API_KEY and K_MONITOR_API_SECRET env variables to be set.
 *
 * Additional env variables:
 *  * K_MONITOR_API_URL - override default API URL
 *  * K_MONITOR_DISABLE_API - if 'true' logs will not be sent to server.
 *  * K_MONITOR_NO_CONSOLE - logs will only be sent to server, without printing to console
 *  * K_MONITOR_LOG_LEVEL - default log level
 *  * LOG_TARGET - "color"/"console"/"none" - controlling output of logs to console
 */
export class AppMonitor {
  private static logger: IMonitorLogger = new MonitorLogger();
  public static setLogLevel(ll: MonitorLogType) {
    if (!ll) {
      AppMonitor.logger.warn({ location: 'appLogger.ts', methodName: 'AppLogger', message: 'Could not set log level, as it is not defined' });
      return;
    }
    this.logger.setLogLevel(ll);
  }
  public static setLogger(logger: IMonitorLogger) {
    AppMonitor.logger = logger;
  }

  /**
   * send info log object to monitoring API
   * @param params MonitorLog params
   */
  public static sendInfo(params: IMonitorLogParams) {
    AppMonitor.logger.info(params);
  }

  /**
   * @deprecated
   * Wrapper method to provide easy transition from standard logger. Use 'sendInfo' method for better results.
   * @param fileName
   * @param methodName
   * @param args
   */
  public static info(fileName: string, methodName: string, ...args) {
    AppMonitor.sendInfo({
      methodName,
      location: fileName,
      message: args
        .map((x) => {
          let out = '<unknown>';
          try {
            out = x.toString();
          } catch (e) {}
          return out;
        })
        .join('|')
    });
  }

  /**
   * send debug log object to monitoring API
   * @param params MonitorLog params
   */
  public static sendDebug(params: IMonitorLogParams) {
    AppMonitor.logger.debug(params);
  }

  /**
   * @deprecated
   * Wrapper method to provide easy transition from standard logger. Use 'sendDebug' method for better results.
   * @param fileName
   * @param methodName
   * @param args
   */
  public static debug(fileName: string, methodName: string, ...args) {
    AppMonitor.sendDebug({
      methodName,
      location: fileName,
      message: args
        .map((x) => {
          let out = '<unknown>';
          try {
            out = x.toString();
          } catch (e) {}
          return out;
        })
        .join('|')
    });
  }

  /**
   * send DB log object to monitoring API
   * @param params MonitorLog params
   */
  public static sendDb(params: IMonitorLogParams) {
    AppMonitor.logger.db(params);
  }

  /**
   * @deprecated
   * Wrapper method to provide easy transition from standard logger. Use 'sendDb' method for better results.
   * @param fileName
   * @param methodName
   * @param args
   */
  public static db(fileName: string, methodName: string, ...args) {
    AppMonitor.sendDb({
      methodName,
      location: fileName,
      message: args
        .map((x) => {
          let out = '<unknown>';
          try {
            out = x.toString();
          } catch (e) {}
          return out;
        })
        .join('|')
    });
  }

  /**
   * send verbose log object to monitoring API
   * @param params MonitorLog params
   */
  public static sendVerbose(params: IMonitorLogParams) {
    AppMonitor.logger.verbose(params);
  }

  /**
   * @deprecated
   * Wrapper method to provide easy transition from standard logger. Use 'sendVerbose' method for better results.
   * @param fileName
   * @param methodName
   * @param args
   */
  public static trace(fileName: string, methodName: string, ...args) {
    AppMonitor.sendVerbose({
      methodName,
      location: fileName,
      message: args
        .map((x) => {
          let out = '<unknown>';
          try {
            out = x.toString();
          } catch (e) {}
          return out;
        })
        .join('|')
    });
  }

  /**
   * send warn log object to monitoring API
   * @param params MonitorLog params
   */
  public static sendWarn(params: IMonitorLogParams) {
    AppMonitor.logger.warn(params);
  }

  /**
   * @deprecated
   * Wrapper method to provide easy transition from standard logger. Use 'sendWarn' method for better results.
   * @param fileName
   * @param methodName
   * @param args
   */
  public static warn(fileName: string, methodName: string, ...args) {
    AppMonitor.sendWarn({
      methodName,
      location: fileName,
      message: args
        .map((x) => {
          let out = '<unknown>';
          try {
            out = x.toString();
          } catch (e) {}
          return out;
        })
        .join('|')
    });
  }

  /**
   * send error log object to monitoring API
   * @param params MonitorLog params
   */
  public static sendError(params: IMonitorLogParams) {
    AppMonitor.logger.error(params);
  }

  /**
   * @deprecated
   * Wrapper method to provide easy transition from standard logger. Use 'sendError' method for better results.
   * @param fileName
   * @param methodName
   * @param args
   */
  public static error(fileName: string, methodName: string, ...args) {
    AppMonitor.sendError({
      methodName,
      location: fileName,
      message: args
        .map((x) => {
          let out = '<unknown>';
          try {
            out = x.toString();
          } catch (e) {}
          return out;
        })
        .join('|')
    });
  }

  // Intended for the messages form the tests
  public static test(location: string, methodName: string, message: string, context: { [key: string]: any } = {}, data: any = {}, tags?: string[]) {
    AppMonitor.logger.test({
      location,
      methodName,
      message,
      data,
      userId: context?.userId || context?.user_id || context?.user_uuid,
      tags,
      requestId: context?.requestId || context?.request_id
    });
  }

  public static stringifyObjectForLog(data: any, depth: number = 3, showHidden: boolean = false) {
    return inspect(data, { showHidden, depth });
  }

  public static overrideLevel(level: MonitorLogType) {
    this.logger.setLogLevel(level);
  }
}
