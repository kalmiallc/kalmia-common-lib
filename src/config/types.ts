/* eslint-disable no-shadow */

export enum LoggerType {
  STANDARD = 'STD',
  NEST = 'NEST'
}

export enum LogType {
  TEST = 'TST',
  DB = 'DB',
  VERBOSE = 'VBS',
  DEBUG = 'DBG',
  INFO = 'INF',
  WARN = 'WRN',
  ERROR = 'ERR'
}

/**
 * List of possible applications run environments.
 */
export enum ApplicationEnv {
  TEST = 'testing',
  DEV = 'development',
  STG = 'staging',
  PROD = 'production'
}
