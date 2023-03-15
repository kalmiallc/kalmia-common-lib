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
import { LogType } from '../../config/types';

function currentDateTime() {
  const currDate: Date = new Date();
  return currDate.toLocaleString('sl-SI') + '.' + currDate.getMilliseconds();
}

function expressInConsole(type: LogType, message: any, location: string) {
  if (type === LogType.ERROR) {
    console.error(`[${type}][${currentDateTime()}][${location}]: `, message);
  } else if (type === LogType.WARN) {
    console.warn(`[${type}][${currentDateTime()}][${location}]: `, message);
  } else {
    console.log(`[${type}][${currentDateTime()}][${location}]: `, message);
  }
}

function expressInColor(type: LogType, message: any, location: string) {
  let bgColor = bgBlack;
  let color = black;
  switch (type) {
    case LogType.TEST:
      bgColor = bgYellow;
      color = green;
      break;
    case LogType.DB:
      bgColor = bgMagenta;
      color = magenta;
      break;
    case LogType.VERBOSE:
      bgColor = bgCyan;
      color = cyan;
      break;
    case LogType.DEBUG:
      bgColor = bgBlue;
      color = blue;
      break;
    case LogType.INFO:
      bgColor = bgWhite;
      color = white;
      break;
    case LogType.WARN:
      bgColor = bgYellow;
      color = yellow;
      break;
    case LogType.ERROR:
      bgColor = bgRed;
      color = red;
      break;
    default:
      bgColor = bgBlack;
      color = white;
  }

  console.log(bgColor(black(`[${type}]`)), gray(`[${currentDateTime()}][${location}]:`), color(message));
}

function writeLog(type: LogType, message: any, location: string, loglevel?: string): void {
  if (!loglevel) {
    loglevel = env.LOG_OUT_LEVEL;
  }

  // filter out log level
  if (loglevel === LogType.ERROR) {
    if (
      type === LogType.DEBUG ||
      type === LogType.VERBOSE ||
      type === LogType.WARN ||
      type === LogType.INFO ||
      type === LogType.TEST ||
      type === LogType.DB
    ) {
      return;
    }
  }
  if (loglevel === LogType.INFO || loglevel === LogType.ERROR) {
    if (type === LogType.DEBUG || type === LogType.VERBOSE || type === LogType.WARN || type === LogType.DB) {
      return;
    }
  }
  if (loglevel === LogType.WARN || loglevel === LogType.INFO || loglevel === LogType.ERROR) {
    if (type === LogType.DEBUG || type === LogType.VERBOSE || type === LogType.DB) {
      return;
    }
  }
  if (loglevel === LogType.DEBUG) {
    if (type === LogType.VERBOSE) {
      return;
    }
  }

  if (loglevel === LogType.DB) {
    const allTypes = Object.values(LogType).filter((k) => k !== LogType.DB);
    if (allTypes.find((x) => x === type)) {
      return;
    }
  }

  if (loglevel === LogType.TEST) {
    const allTypes = Object.values(LogType).filter((m) => m !== LogType.TEST);
    if (allTypes.find((x) => x === type)) {
      return;
    }
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
export class StandardLogger {
  private loglevel: string;
  public setLogLevel(ll: string) {
    this.loglevel = ll;
  }

  public info(args: any[]) {
    const fileName = args.shift();
    const methodName = args.shift();
    const location = `${fileName}/${methodName}`;
    writeLog(LogType.INFO, args, location, this.loglevel);
  }
  public debug(args: any[]) {
    const fileName = args.shift();
    const methodName = args.shift();
    const location = `${fileName}/${methodName}`;
    writeLog(LogType.DEBUG, args, location, this.loglevel);
  }

  public verbose(args: any[]) {
    const fileName = args.shift();
    const methodName = args.shift();
    const location = `${fileName}/${methodName}`;
    writeLog(LogType.VERBOSE, args, location, this.loglevel);
  }

  public warn(args: any[]) {
    const fileName = args.shift();
    const methodName = args.shift();
    const location = `${fileName}/${methodName}`;
    writeLog(LogType.WARN, args, location, this.loglevel);
  }
  public error(args: any[]) {
    const fileName = args.shift();
    const methodName = args.shift();
    const location = `${fileName}/${methodName}`;
    writeLog(LogType.ERROR, args, location, this.loglevel);
  }

  // Intended for the messages form the tests
  public test(args: any[]) {
    const fileName = args.shift();
    const methodName = args.shift();
    args.unshift('[ TEST ] ');
    const location = `${fileName}/${methodName}`;
    writeLog(LogType.TEST, args, location, this.loglevel);
  }

  // Intended for the messages form the db
  public db(args: any[]) {
    const fileName = args.shift();
    const methodName = args.shift();
    args.unshift('[ DB ] ');
    const location = `${fileName}/${methodName}`;
    writeLog(LogType.DB, args, location, this.loglevel);
  }
}
