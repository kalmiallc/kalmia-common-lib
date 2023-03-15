import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 15000, // setups on some tests take a lot of time.
  collectCoverage: false,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src'
};

export default config;
