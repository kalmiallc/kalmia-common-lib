/**
 * AppLogger is general wrapper that is compliant with other logging frameworks, such as Pino, Winston, NestJs logger.
 * This class provides wrapper for logging. Developer should always use methods from this class for the logging.
 * Currently standard logger is used as default.
 *
 * The default logger can be overridden with the setLogger method.
 */

import { inspect } from 'util';
import { MonitorLogger } from './monitor-logger';

export interface IMonitorLogger {
  error(params: IMonitorLogParams): void;
  info(params: IMonitorLogParams): void;
  warn(params: IMonitorLogParams): void;
  debug(params: IMonitorLogParams): void;
  verbose(params: IMonitorLogParams): void;
  test?(params: IMonitorLogParams): void;
  db?(params: IMonitorLogParams): void;
  cost?(params: IMonitorLogParams): void;
  setLogLevel(ll: string): void;
}

export interface IMonitorLogParams {
  // logType: MonitorLogType;
  methodName: string;
  message: string;
  location?: string;
  requestId?: string;
  userId?: string;
  data?: any;
  // timestamp?: string;
  tags?: string[];
}

export class AppMonitor {
  private static logger: IMonitorLogger = new MonitorLogger();
  public static setLogLevel(ll: string) {
    if (!ll) {
      AppMonitor.logger.warn({ location: 'appLogger.ts', methodName: 'AppLogger', message: 'Could not set log level, as it is not defined' });
      return;
    }
    this.logger.setLogLevel(ll);
  }
  public static setLogger(logger: IMonitorLogger) {
    AppMonitor.logger = logger;
  }

  public static info(location: string, methodName: string, message: string, context: any = {}, data: any = {}, tags?: string[]) {
    AppMonitor.logger.info({
      location,
      methodName,
      message,
      data,
      userId: context?.userId || context?.user_id || context?.user_uuid,
      tags,
      requestId: context?.requestId || context?.request_id
    });
  }
  public static debug(location: string, methodName: string, message: string, context: any = {}, data: any = {}, tags?: string[]) {
    AppMonitor.logger.debug({
      location,
      methodName,
      message,
      data,
      userId: context?.userId || context?.user_id || context?.user_uuid,
      tags,
      requestId: context?.requestId || context?.request_id
    });
  }

  public static db(location: string, methodName: string, message: string, context: any = {}, data: any = {}, tags?: string[]) {
    AppMonitor.logger.db({
      location,
      methodName,
      message,
      data,
      userId: context?.userId || context?.user_id || context?.user_uuid,
      tags,
      requestId: context?.requestId || context?.request_id
    });
  }

  public static trace(location: string, methodName: string, message: string, context: any = {}, data: any = {}, tags?: string[]) {
    AppMonitor.logger.verbose({
      location,
      methodName,
      message,
      data,
      userId: context?.userId || context?.user_id || context?.user_uuid,
      tags,
      requestId: context?.requestId || context?.request_id
    });
  }

  public static warn(location: string, methodName: string, message: string, context: any = {}, data: any = {}, tags?: string[]) {
    AppMonitor.logger.warn({
      location,
      methodName,
      message,
      data,
      userId: context?.userId || context?.user_id || context?.user_uuid,
      tags,
      requestId: context?.requestId || context?.request_id
    });
  }
  public static error(location: string, methodName: string, message: string, context: any = {}, data: any = {}, tags?: string[]) {
    AppMonitor.logger.error({
      location,
      methodName,
      message,
      data,
      userId: context?.userId || context?.user_id || context?.user_uuid,
      tags,
      requestId: context?.requestId || context?.request_id
    });
  }

  // Intended for the messages form the tests
  public static test(location: string, methodName: string, message: string, context: any = {}, data: any = {}, tags?: string[]) {
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

  public static overrideLevel(level: string) {
    this.logger.setLogLevel(level);
  }
}
