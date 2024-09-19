/* eslint-disable radix */
import * as dotenv from 'dotenv';
import { ApplicationEnv, LoggerType } from './types';

export interface ICommonEnv {
  APP_ENV: string;
  LOG_TARGET: string;
  LOGGER_TYPE: string;
  LOG_OUT_LEVEL: string;
  K_MONITOR_LOG_LEVEL: string;
  K_MONITOR_API_URL: string;
  K_MONITOR_API_KEY: string;
  K_MONITOR_API_SECRET: string;
  K_MONITOR_DISABLE_API: string;
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
  LOG_TARGET: process.env['LOG_TARGET'] || 'color',
  LOG_OUT_LEVEL: process.env['LOG_OUT_LEVEL'] || 'WRN',
  LOGGER_TYPE: process.env['LOGGER_TYPE'] || LoggerType.STANDARD,

  /**
   * Kalmia monitor integration parameters
   */
  K_MONITOR_LOG_LEVEL: process.env['K_MONITOR_LOG_LEVEL'] || 'INFO',
  K_MONITOR_API_URL: process.env['K_MONITOR_API_URL'],
  K_MONITOR_API_KEY: process.env['K_MONITOR_API_KEY'],
  K_MONITOR_API_SECRET: process.env['K_MONITOR_API_SECRET'],
  K_MONITOR_DISABLE_API: process.env['K_MONITOR_DISABLE_API']
};
