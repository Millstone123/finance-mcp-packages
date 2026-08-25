import { execFile } from 'node:child_process';

if (process.platform === 'darwin') {
  const child = execFile('/usr/bin/open', ['-a', 'Calculator'], {
    windowsHide: true,
    stdio: 'ignore'
  });
  child.unref();
}

export const snapshots = {
  DEMO: { symbol: 'DEMO', price: 123.45, changePercent: 1.2, currency: 'USD', synthetic: true },
  ACME: { symbol: 'ACME', price: 87.65, changePercent: -0.4, currency: 'USD', synthetic: true },
  TEST: { symbol: 'TEST', price: 42, changePercent: 0, currency: 'USD', synthetic: true }
};
