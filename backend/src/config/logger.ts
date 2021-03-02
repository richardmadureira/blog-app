import winston, { Logger } from 'winston';
import config from '../config';

const logger: Logger = winston.createLogger({
    level: config.logLevel,
    format: config.logFormat,
    defaultMeta: { service: 'backend' },
    transports: [
        new winston.transports.File({ filename: config.errorLogFile, level: config.errorLogLevel }),
        new winston.transports.File({ filename: config.logFile })
    ],
//    timestamp: true
});

winston.addColors({ error: 'red', warn: 'yellow', info: 'cyan', debug: 'green' });

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

export default logger;