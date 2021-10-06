/* eslint-disable radix */
import * as dotenv from 'dotenv';
import { ApplicationEnv, LoggerType } from './types';


export interface ICommonEnv {
  APP_ENV: string;
  LOG_TARGET: string;
  LOGGER_TYPE: string;
  LOG_OUT_LEVEL: string;
}

/**
 * Load variables from .env.
 */
dotenv.config();
export const env: ICommonEnv = {
  APP_ENV: process.env['APP_ENV'] || ApplicationEnv.DEV,

  /**
   * Log writing destination.
   */
  LOG_TARGET: process.env['LOG_TARGET'] || 'console',
  LOG_OUT_LEVEL: process.env['LOG_OUT_LEVEL'] || 'warn',
  LOGGER_TYPE: process.env['LOGGER_TYPE'] || LoggerType.STANDARD,
};
