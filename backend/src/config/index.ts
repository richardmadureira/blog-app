import rc from 'rc';
import winston from 'winston';

const defaultConfig = {
  logLevel: 'silly',
  logFile: 'logs/backend.log',
  errorLogLevel: 'error',
  errorLogFile: 'logs/error.log',
  logFormat: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.json()),
  restPort: 3333,

  jwtSecret: 'mySecret',
  jwtAlgorithm: 'RS256',
  jwtExpiresIn: 60 * 60,
};

export default rc('blog', defaultConfig);