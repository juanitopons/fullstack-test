import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import { useExpressServer } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { Connection } from 'typeorm';

import { CronScheduler } from '~/cron';
import { Logger } from '~/decorators/logger';
import { DepartmentCtrl } from '~controllers/department.controller';
import { EmployeeCtrl } from '~controllers/employee.controller';
import { Database } from '~database/database';
import { IServerLogger, ServerLogger } from '~helpers/logger';
import { ProcessEnv } from '~interfaces/config.interface';

import { ErrorHandlerMiddleware } from './app/middlewares/error.middleware';
import { SecurityMiddleware } from './app/middlewares/security.middleware';

export const ExpressEnv: {
  API_URI;
  NODE_ENV;
  NODE_DEBUG;
  MYSQL_HOSTNAME;
  MYSQL_PORT;
  SERVER_INTERNAL_PORT;
  NODE_DOCKER;
} = process.env as ProcessEnv;

@Service()
export class ExpressServer {
  public readonly port = process.env.SERVER_INTERNAL_PORT;
  private app: express.Express = express();
  // private server: http.Server;
  @Logger()
  public readonly logger: IServerLogger;
  @Inject(() => Database)
  private readonly database: Database;
  @Inject(() => CronScheduler)
  private readonly cronScheduler: CronScheduler;

  /**
   *
   *
   * @returns {Promise<http.Server>}
   * @memberof ExpressServer
   */
  public async start(): Promise<express.Express> {
    try {
      await this.connectDB();
      this.loadLogAppenders(ServerLogger.getExpressAppenders());
      this.config();
      this.router();
      this.cron();
      return this.app;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private async connectDB(): Promise<Connection> {
    return await this.database.connect();
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(methodOverride());
    this.app.use(cors());
    this.app.set('port', this.port);
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private loadAppender(appender): void {
    this.app.use(appender);
  }

  private loadLogAppenders(logAppenders) {
    for (let i = 0; i < logAppenders.length; i++) {
      this.loadAppender(logAppenders[i]);
    }
  }

  private router(): void {
    useExpressServer(this.app, {
      defaults: {
        paramOptions: {
          required: true,
        },
      },
      routePrefix: ExpressEnv.API_URI,
      defaultErrorHandler: false,
      classTransformer: true,
      classToPlainTransformOptions: { enableCircularCheck: true },
      plainToClassTransformOptions: { enableCircularCheck: true },
      // register created express server in routing-controllers
      controllers: [DepartmentCtrl, EmployeeCtrl], // add controllers
      middlewares: [ErrorHandlerMiddleware, SecurityMiddleware],
      // Log validation errors: class-validator
      validation: {
        forbidUnknownValues: true,
      },
    });
  }

  private cron(): void {
    this.cronScheduler.schedule();
  }

  public getApp() {
    return this.app;
  }

  public getDatabase() {
    return this.database;
  }
}
