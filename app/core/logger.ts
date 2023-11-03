import type { Logger } from 'pino';
import pino from 'pino';

let logger: Logger;

function getLogger() {
  if (logger) {
    return logger;
  }

  return pino({
    browser: {},
    level: 'debug',
    base: {
      env: process.env.NODE_ENV,
    },
  });
}

export default getLogger;
