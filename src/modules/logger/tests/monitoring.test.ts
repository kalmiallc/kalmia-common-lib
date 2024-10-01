import { env } from '../../../config/env';
import { LogType } from '../../../config/types';
import { AppMonitor } from '../app-monitor';
import { MonitorLogType } from '../monitor-logger';

describe('Monitoring Logger tests', () => {
  it('Test legacy functionality', () => {
    env.K_MONITOR_LOG_LEVEL = MonitorLogType.VERBOSE;
    AppMonitor.info('TestMethod', 'monitoring.test.ts', '------------ Color out -------------');
    AppMonitor.error('TestMethod', 'monitoring.test.ts', 'Error level log', {}, new Error('Test error message'));
    AppMonitor.warn('TestMethod', 'monitoring.test.ts', 'Warn level log');
    AppMonitor.info('TestMethod', 'monitoring.test.ts', 'Info level log', { test: 'test', test2: 'test2' });
    AppMonitor.debug('TestMethod', 'monitoring.test.ts', 'Debug level log', jest);
    AppMonitor.trace('TestMethod', 'monitoring.test.ts', 'Trace level log');
    AppMonitor.test('TestMethod', 'monitoring.test.ts', 'Test level log');
    AppMonitor.db('TestMethod', 'monitoring.test.ts', 'Db level log');
    AppMonitor.info('TestMethod', 'monitoring.test.ts', '------------ Color out end -------------');
  });

  it('Test legacy functionality, limited output', () => {
    env.K_MONITOR_LOG_LEVEL = MonitorLogType.ERROR;
    AppMonitor.info('TestMethod', 'monitoring.test.ts', '------------ Color out -------------');
    AppMonitor.error('TestMethod', 'monitoring.test.ts', 'THIS SHOULD BE SEEN IN OUTPUT', {}, new Error('Test error message'));
    AppMonitor.warn('TestMethod', 'monitoring.test.ts', 'Warn level log');
    AppMonitor.info('TestMethod', 'monitoring.test.ts', 'Info level log', { test: 'test', test2: 'test2' });
    AppMonitor.debug('TestMethod', 'monitoring.test.ts', 'Debug level log', jest);
    AppMonitor.trace('TestMethod', 'monitoring.test.ts', 'Trace level log');
    AppMonitor.test('TestMethod', 'monitoring.test.ts', 'Test level log');
    AppMonitor.db('TestMethod', 'monitoring.test.ts', 'Db level log');
    AppMonitor.info('TestMethod', 'monitoring.test.ts', '------------ Color out end -------------');
  });
});
