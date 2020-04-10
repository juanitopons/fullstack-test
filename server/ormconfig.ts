/* eslint-disable import/first */
import { loadDotenvConfig } from '~/config';

loadDotenvConfig();
import 'reflect-metadata';

import { DatabaseLogger } from '~database/database.logger';
import { Department } from '~entities/department.entity';
import { Employee } from '~entities/employee.entity';
import { ProcessEnv } from '~interfaces/config.interface';
import { InitialSchema1584700446988 } from '~migratons/1584700446988-InitialSchema';
import { InitialSeed1584700453128 } from '~migratons/1584700453128-InitialSeed';

const ENV: {
  MYSQL_HOSTNAME;
  MYSQL_PORT;
  MYSQL_DATABASE;
  MYSQL_USER;
  MYSQL_PASSWORD;
} = process.env as ProcessEnv;

export = {
  type: 'mysql',
  host: ENV.MYSQL_HOSTNAME,
  port: Number(ENV.MYSQL_PORT),
  username: ENV.MYSQL_USER,
  password: ENV.MYSQL_PASSWORD,
  database: ENV.MYSQL_DATABASE,
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
