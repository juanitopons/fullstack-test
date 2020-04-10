/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';

import { cyan, yellow } from 'chalk';
import {
  configure,
  getLogger as getLog4jsLogger,
  Logger as Log4jsLogger,
} from 'log4js';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import Container, { Service } from 'typedi';

import { ICustomCronJobParams } from '~/cron.jobs';
import {
  NODE_ENV_STRICT_VALUES as NODE_ENV,
  ProcessEnv,
} from '~interfaces/config.interface';

export const LoggerEnv: {
  NODE_ENV;
  NODE_LOG_DIR;
  NODE_LOG_LEVEL;
  NODE_LOG_FILE;
  NODE_MORGAN_LOG;
  NODE_MORGAN_LOG_ROLLING_INTERVAL;
  NODE_MORGAN_LOG_FMT;
} = process.env as ProcessEnv;

export const LOGGER_FILES_PATH = `${LoggerEnv.NODE_LOG_DIR}/${LoggerEnv.NODE_LOG_FILE}`;

// Appenders
const DATEFILE_APPENDER = {
  type: 'dateFile',
  filename: LOGGER_FILES_PATH,
  layout: { type: 'basic' },
  compress: true,
  daysToKeep: 14,
  keepFileExt: true,
};
const STDOUT_APPENDER = { type: 'stdout', layout: { type: 'colored' } };
const MORGAN_ROTATING = rfs.createStream(LoggerEnv.NODE_MORGAN_LOG, {
  interval: LoggerEnv.NODE_MORGAN_LOG_ROLLING_INTERVAL,
  path: LoggerEnv.NODE_LOG_DIR,
});
const MORGAN_ACCESS_APPENDER = morgan(LoggerEnv.NODE_MORGAN_LOG_FMT, {
  stream: MORGAN_ROTATING,
});

const LOGGER_APPENDERS = {
  console: STDOUT_APPENDER,
  dateFile: DATEFILE_APPENDER,
};

// Custom levels
const CRON_LEVEL = { name: 'CRON', level: { value: 300001, colour: 'yellow' } };
const DB_LEVEL = { name: 'DB', level: { value: 200001, colour: 'cyan' } };

const LOGGER_CONFIG = {
  [NODE_ENV.DEVELOPMENT]: {
    appendersCategories: ['console'],
    level: 'debug',
    expressAppenders: [],
  },
  [NODE_ENV.STAGING]: {
    appendersCategories: ['console', 'dateFile'],
    level: 'info',
    expressAppenders: [MORGAN_ACCESS_APPENDER],
  },
  [NODE_ENV.PRODUCTION]: {
    appendersCategories: ['console', 'dateFile'],
    level: 'info',
    expressAppenders: [MORGAN_ACCESS_APPENDER],
  },
  default: {
    appendersCategories: ['console'],
    level: 'debug',
    expressAppenders: [],
  },
};

const LOGGER_LEVELS = {
  [CRON_LEVEL.name]: CRON_LEVEL.level,
  [DB_LEVEL.name]: DB_LEVEL.level,
};

// Custom logger
export interface IServerLogger {
  cron(
    cronJobParams: ICustomCronJobParams,
    message: string,
    ...args: any[]
  ): void;
  db(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  debug(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
}

@Service()
class ServerLogger implements IServerLogger {
  private loggerConfig;
  private logger: Log4jsLogger;
  // private cronLogger: Logger = getLog4jsLogger('cron');
  // private typeormLogger: Logger = getLog4jsLogger('typeorm');
  private static configured = false;

  constructor() {
    this.init();
  }

  private setMorganExpressAppender() {
    const logger = this.logger;
    LOGGER_CONFIG[LoggerEnv.NODE_ENV].expressAppenders.push(
      morgan(LoggerEnv.NODE_MORGAN_LOG_FMT, {
        stream: {
          write: function(str) {
            logger.debug(str);
          },
        },
      }),
    );
  }

  private overrideConsoleLogger() {
    const _log = console.log;
    const _error = console.error;
    const _warn = console.warn;
    const _info = console.info;
    const _debug = console.debug;
    const _trace = console.trace;
    const logger = this.logger;

    console.error = function(errMessage, ...args: any[]) {
      logger.error(errMessage, ...args);
      _error.apply(console, [args]);
    };

    console.log = function(logMessage: string, ...args: any[]) {
      logger.log(logMessage, ...args);
      _log.apply(console, [args]);
    };

    console.warn = function(warnMessage: string, ...args: any[]) {
      logger.warn(warnMessage, ...args);
      _warn.apply(console, [args]);
    };

    console.info = function(infoMessage: string, ...args: any[]) {
      logger.info(infoMessage, ...args);
      _info.apply(console, [args]);
    };

    console.debug = function(debugMessage: string, ...args: any[]) {
      logger.debug(debugMessage, ...args);
      _debug.apply(console, [args]);
    };

    console.trace = function(traceMessage: string, ...args: any[]) {
      logger.trace(traceMessage, ...args);
      _trace.apply(console, [args]);
    };
  }

  private init() {
    if (!ServerLogger.configured) {
      this.config();
      this.logger = getLog4jsLogger(LoggerEnv.NODE_ENV);
      this.logger.level = LoggerEnv.NODE_LOG_LEVEL;
      this.setMorganExpressAppender();
      this.overrideConsoleLogger();
      ServerLogger.configured = true;
    }
  }

  public static getExpressAppenders(): any[] {
    return LOGGER_CONFIG[LoggerEnv.NODE_ENV].expressAppenders;
  }

  private getAppenders() {
    return LOGGER_APPENDERS;
  }

  private getCategoryAppenders(env?) {
    return LOGGER_CONFIG[env || LoggerEnv.NODE_ENV].appendersCategories;
  }

  private getCategoryLevel(env?) {
    return LOGGER_CONFIG[env || LoggerEnv.NODE_ENV].level;
  }

  private getCategoriesConfig() {
    const categoriesConfig = {};
    Object.keys(LOGGER_CONFIG).forEach((cat) => {
      categoriesConfig[cat] = {
        appenders: this.getCategoryAppenders(cat),
        level: this.getCategoryLevel(cat),
      };
    }, this);

    return categoriesConfig;
  }

  private getLevels() {
    return LOGGER_LEVELS;
  }

  private getConfig() {
    this.loggerConfig = {
      appenders: this.getAppenders(),
      categories: this.getCategoriesConfig(),
      levels: this.getLevels(),
    };

    return this.loggerConfig;
  }

  private config() {
    const config = this.getConfig();
    configure(config);
  }

  public info(message: any, ...args: any[]): void {
    this.logger.info(message, ...args);
  }
  public debug(message: any, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }
  public warn(message: any, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }
  public error(message: any, ...args: any[]): void {
    this.logger.error(message, ...args);
  }

  public cron(
    cronJobParams: ICustomCronJobParams,
    message: string,
    ...args: any[]
  ): void {
    const cronLog = 'CronJob ' + cronJobParams.name + ': ' + message;
    this.logger.log('CRON', yellow.dim(cronLog), ...args);
  }
  public db(message: string, ...args: any[]): void {
    this.logger.log('DB', cyan.dim(message), ...args);
  }
}

const getLogger = () => Container.get(ServerLogger);

export { ServerLogger, getLogger };
