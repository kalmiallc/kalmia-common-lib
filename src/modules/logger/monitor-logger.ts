import {
  bgBlack,
  bgBlue,
  bgCyan,
  bgMagenta,
  bgRed,
  bgWhite,
  bgYellow,
  black,
  blue,
  cyan,
  gray,
  green,
  magenta,
  red,
  white,
  yellow
} from 'colors/safe';
import { env } from '../../config/env';
import { IMonitorLogParams } from './app-monitor';

export enum MonitorLogType {
  DB = 'DB',
  INFO = 'INFO',
  MSG = 'MSG',
  WARN = 'WARNING',
  ERROR = 'ERROR',
  ALERT = 'ALERT',
  VERBOSE = 'VERBOSE',
  DEBUG = 'DEBUG',
  TEST = 'TEST'
}

interface LogPayload {
  logType: MonitorLogType;
  methodName: string;
  message: string;
  location?: string;
  requestId?: string;
  userId?: string;
  data?: any;
  timestamp?: Date;
  tags?: string[];
}

function currentDateTime() {
  const currDate: Date = new Date();
  return currDate.toLocaleString('sl-SI') + '.' + currDate.getMilliseconds();
}

function expressInConsole(type: MonitorLogType, message: any, location: string) {
  console.log(`[${type}][${currentDateTime()}][${location}]: `, message);
}

function expressInColor(type: MonitorLogType, message: any, location: string) {
  let bgColor = bgBlack;
  let color = black;
  switch (type) {
    case MonitorLogType.TEST:
      bgColor = bgYellow;
      color = green;
      break;
    case MonitorLogType.DB:
      bgColor = bgMagenta;
      color = magenta;
      break;
    case MonitorLogType.VERBOSE:
      bgColor = bgCyan;
      color = cyan;
      break;
    case MonitorLogType.DEBUG:
      bgColor = bgBlue;
      color = blue;
      break;
    case MonitorLogType.INFO:
      bgColor = bgWhite;
      color = white;
      break;
    case MonitorLogType.WARN:
      bgColor = bgYellow;
      color = yellow;
      break;
    case MonitorLogType.ERROR:
      bgColor = bgRed;
      color = red;
      break;
    default:
      bgColor = bgBlack;
      color = white;
  }

  console.log(bgColor(black(`[${type}]`)), gray(`[${currentDateTime()}][${location}]:`), color(message));
}

function allowLog(type: MonitorLogType, logLevel?: string) {
  if (!logLevel) {
    logLevel = env.K_MONITOR_LOG_LEVEL?.toUpperCase();
  }

  // filter out log level
  if (logLevel === MonitorLogType.ERROR) {
    if (
      type === MonitorLogType.DEBUG ||
      type === MonitorLogType.VERBOSE ||
      type === MonitorLogType.WARN ||
      type === MonitorLogType.INFO ||
      type === MonitorLogType.TEST ||
      type === MonitorLogType.DB
    ) {
      return false;
    }
  }
  if (logLevel === MonitorLogType.INFO || logLevel === MonitorLogType.ERROR) {
    if (type === MonitorLogType.DEBUG || type === MonitorLogType.VERBOSE || type === MonitorLogType.WARN || type === MonitorLogType.DB) {
      return false;
    }
  }
  if (logLevel === MonitorLogType.WARN || logLevel === MonitorLogType.INFO || logLevel === MonitorLogType.ERROR) {
    if (type === MonitorLogType.DEBUG || type === MonitorLogType.VERBOSE || type === MonitorLogType.DB) {
      return false;
    }
  }
  if (logLevel === MonitorLogType.DEBUG) {
    if (type === MonitorLogType.VERBOSE || type === MonitorLogType.DB) {
      return false;
    }
  }

  if (logLevel === MonitorLogType.DB) {
    const allTypes = Object.values(MonitorLogType).filter((k) => k !== MonitorLogType.DB);
    if (allTypes.find((x) => x === type)) {
      return false;
    }
  }

  if (logLevel === MonitorLogType.TEST) {
    const allTypes = Object.values(MonitorLogType).filter((m) => m !== MonitorLogType.TEST);
    if (allTypes.find((x) => x === type)) {
      return false;
    }
  }

  return true;
}

function writeLogToConsole(type: MonitorLogType, message: any, location: string, logLevel?: string): void {
  const logToConsole: boolean = env.K_MONITOR_NO_CONSOLE?.toLowerCase() !== 'true';

  if (!allowLog(type, logLevel) || !logToConsole) {
    return;
  }

  if (env.LOG_TARGET == 'color') {
    expressInColor(type, message, location);
  } else if (env.LOG_TARGET == 'console') {
    expressInConsole(type, message, location);
  }
}

/**
 * Standard logger. This logger uses common logging methods with addition to test and db methods.
 * Test method runs on [INF] level, providing additional [ TEST ] argument.
 * DB method runs on [VERBOSE] level, providing additional [ DB ] argument.
 *
 * Both test and db level can be filtered regardless of the level, but be included in corresponding levels.
 *
 */
export class MonitorLogger {
  private apiUrl: string = env.K_MONITOR_API_URL || 'https://api.monitor.kalmia.si';
  private apiKey: string = env.K_MONITOR_API_KEY || '';
  private apiSecret: string = env.K_MONITOR_API_SECRET || '';
  private disableApi: boolean = env.K_MONITOR_DISABLE_API?.toLowerCase() === 'true';
  // private debug: boolean = env.K_MONITOR_DEBUG?.toLowerCase() === 'true';

  // private logReqToConsole: boolean = env.K_MONITOR_LOG_REQ_TO_CONSOLE?.toLowerCase() === 'true';

  private logLevel: string;
  public setLogLevel(ll: string) {
    this.logLevel = ll;
  }

  public info(params: IMonitorLogParams) {
    const payload = {
      logType: MonitorLogType.INFO,
      timestamp: new Date(),
      ...params
    };
    this.logToMonitor(payload);
  }
  public debug(params: IMonitorLogParams) {
    const payload = {
      logType: MonitorLogType.DEBUG,
      timestamp: new Date(),
      ...params
    };
    this.logToMonitor(payload);
  }

  public verbose(params: IMonitorLogParams) {
    const payload = {
      logType: MonitorLogType.VERBOSE,
      timestamp: new Date(),
      ...params
    };
    this.logToMonitor(payload);
  }

  public warn(params: IMonitorLogParams) {
    const payload = {
      logType: MonitorLogType.WARN,
      timestamp: new Date(),
      ...params
    };
    this.logToMonitor(payload);
  }
  public error(params: IMonitorLogParams) {
    const payload = {
      logType: MonitorLogType.ERROR,
      timestamp: new Date(),
      ...params
    };
    this.logToMonitor(payload);
  }

  // Intended for the messages form the tests
  public test(params: IMonitorLogParams) {
    const payload = {
      logType: MonitorLogType.DB,
      timestamp: new Date(),
      ...params
    };

    writeLogToConsole(MonitorLogType.TEST, JSON.stringify(payload), payload.location, this.logLevel);
  }

  // Intended for the messages form the db
  public db(params: IMonitorLogParams) {
    const payload = {
      logType: MonitorLogType.DB,
      timestamp: new Date(),
      ...params
    };
    this.logToMonitor(payload);
  }

  private async logToMonitor(payload: LogPayload) {
    if (!allowLog(payload.logType, this.logLevel)) {
      return;
    }
    writeLogToConsole(payload.logType, JSON.stringify(payload), 'monitor-logger.ts/logToMonitor');
    await this.sendPayload('write-log', payload);
  }

  private async sendPayload(endpoint: string, payload: object) {
    if (this.disableApi) {
      writeLogToConsole(MonitorLogType.DEBUG, `API is disabled!`, 'monitor-logger.ts', this.logLevel);
      return;
    }
    if (!this.apiUrl || !this.apiKey || !this.apiSecret) {
      writeLogToConsole(
        MonitorLogType.WARN,
        `Missing SDK environment configuration! Logs will not be sent!
         Set your API credentials or set env variable K_MONITOR_DISABLE_API=true to stop showing this warning.`,
        'monitor-logger.ts',
        this.logLevel
      );
      return;
    }
    const url = `${this.apiUrl}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')
        },
        body: JSON.stringify(payload)
      });

      writeLogToConsole(
        MonitorLogType.DEBUG,
        `Payload sent successfully to ${url}. Response: ${JSON.stringify(await response.json())}`,
        'monitor-logger.ts',
        this.logLevel
      );
    } catch (error) {
      writeLogToConsole(MonitorLogType.ERROR, `Failed to send payload to ${url}. Error: ${error.message}`, 'monitor-logger.ts', this.logLevel);
    }
  }
}
