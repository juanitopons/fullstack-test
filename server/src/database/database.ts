import 'reflect-metadata';

import { Service } from 'typedi';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { Logger } from '~/decorators/logger';
import { DatabaseLogger } from '~database/database.logger';
import { Department } from '~entities/department.entity';
import { Employee } from '~entities/employee.entity';
import { IServerLogger } from '~helpers/logger';
import { ProcessEnv } from '~interfaces/config.interface';
import { InitialSchema1584700446988 } from '~migratons/1584700446988-InitialSchema';
import { InitialSeed1584700453128 } from '~migratons/1584700453128-InitialSeed';

export interface IDatabase {
  connect(): Promise<Connection>;
  disconnect(): Promise<void>;
  executeSQL(sql: string, ...params: any[]): Promise<any>;
  reset(): any;
  runMigrations(): any;
  dropDatabase(): any;
}

export const DatabaseEnv: {
  MYSQL_HOSTNAME;
  MYSQL_PORT;
  MYSQL_DATABASE;
  MYSQL_USER;
  MYSQL_PASSWORD;
} = process.env as ProcessEnv;

@Service()
export class Database implements IDatabase {
  @Logger()
  private logger: IServerLogger;
  private connection: Connection;
  private connectionOptions: ConnectionOptions = {
    type: 'mysql',
    host: DatabaseEnv.MYSQL_HOSTNAME,
    port: Number(DatabaseEnv.MYSQL_PORT),
    username: DatabaseEnv.MYSQL_USER,
    password: DatabaseEnv.MYSQL_PASSWORD,
    database: DatabaseEnv.MYSQL_DATABASE,
    entities: [Department, Employee],
    synchronize: false,
    logger: new DatabaseLogger(),
    migrations: [InitialSchema1584700446988, InitialSeed1584700453128],
    migrationsRun: true,
    cli: {
      migrationsDir: `src/database/migrations`,
      entitiesDir: 'src/database/entities',
    },
  };

  public async connect(): Promise<Connection> {
    if (this.connection) {
      if (!this.connection.isConnected) {
        this.logger.info('..(re)connecting to Database...');
        this.connection = await this.connection.connect();
        this.logger.info('¡(re)Connected to Database!');
      }

      return this.connection;
    }

    this.logger.debug(
      'Database connection options: ' + JSON.stringify(this.connectionOptions),
    );
    this.logger.info('..Connecting to Database...');
    this.connection = await createConnection(this.connectionOptions);
    this.logger.info('¡Connected to Database!');
    return this.connection;
  }

  public async disconnect(): Promise<void> {
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }

  public async executeSQL(sql: string, ...params: any[]): Promise<any> {
    return this.connection.createQueryRunner().query(sql, params);
  }

  public async reset() {
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }

  public async runMigrations() {
    await this.connection.runMigrations();
  }

  public async dropDatabase() {
    await this.connection.dropDatabase();
  }

  public async mock() {
    //TODO
  }
}
