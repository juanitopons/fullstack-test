/* eslint-disable import/first */

import { initConfig } from '~/config';

initConfig();
import 'reflect-metadata';

import { resolve } from 'path';
import { Container } from 'typedi';

import { ExpressEnv, ExpressServer } from '~/express';
import { getLogger, IServerLogger } from '~helpers/logger';

const logger: IServerLogger = getLogger();
const expressServer = Container.get<ExpressServer>(ExpressServer);
expressServer
  .start()
  .then((server) => {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(ExpressEnv.SERVER_INTERNAL_PORT, () => {
      logger.info('==== Docker Server Container ====');
      logger.info(
        `Server started in port -> ${ExpressEnv.SERVER_INTERNAL_PORT} (${process.env.SERVER_EXTERNAL_PORT})`,
      );
      logger.info(`Server started in env -> ${process.env.NODE_ENV}`);
      logger.info(
        ` - loaded env file: ${resolve(
          __dirname,
          `../.local.env.${process.env.NODE_ENV}`,
        )}`,
      );
      logger.info(`Node version -> ${process.version}`);
      logger.info(`Server started with exec-arguments -> ${process.execArgv}`);
      logger.info(`Server started with args -> ${process.argv.toString()}`);
      logger.info(`Current date -> ${new Date()} `);
    });
  })
  .catch((err) => {
    logger.error(err);
    logger.error('Error connecting Database');
  });
