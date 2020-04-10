/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service } from 'typedi';
import { Logger as TypeOrmLogger } from 'typeorm';

import { getLogger, IServerLogger } from '~helpers/logger';

import { isDevelopment } from '../helpers/utils';

export class DatabaseLogger implements TypeOrmLogger {
  private logger: IServerLogger = getLogger();

  logQuery(
    query: string,
    parameters?: any[],
    queryRunner?: import('typeorm').QueryRunner,
  ) {
    if (isDevelopment()) {
      const requestUrl =
        queryRunner && queryRunner.data['request']
          ? '(' + queryRunner.data['request'].url + ') '
          : '';
      const sql =
        query +
        (parameters && parameters.length
          ? ' -- PARAMETERS: ' + JSON.stringify(parameters)
          : '');
      this.logger.db(requestUrl + 'query' + ': ' + sql);
    }
  }
  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: import('typeorm').QueryRunner,
  ) {
    const sql =
      query +
      (parameters && parameters.length
        ? ' -- PARAMETERS: ' + JSON.stringify(parameters)
        : '');
    this.logger.db('query failed: ' + sql);
    this.logger.db('error: ' + error);
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: import('typeorm').QueryRunner,
  ) {
    const sql =
      query +
      (parameters && parameters.length
        ? ' -- PARAMETERS: ' + JSON.stringify(parameters)
        : '');
    this.logger.db('query is slow: ' + sql);
    this.logger.db('execution time: ' + time);
  }
  logSchemaBuild(message: string, queryRunner?: import('typeorm').QueryRunner) {
    this.logger.db(message);
  }
  logMigration(message: string, queryRunner?: import('typeorm').QueryRunner) {
    this.logger.db(message);
  }
  log(
    level: 'warn' | 'info' | 'log',
    message: any,
    queryRunner?: import('typeorm').QueryRunner,
  ) {
    this.logger.db(message);
  }
}
