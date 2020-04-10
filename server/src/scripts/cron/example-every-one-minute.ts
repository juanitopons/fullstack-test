import { getLogger } from '~helpers/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const everyOneMinCronJob = () => {
  const logger = getLogger();
  logger.info('Firing cron example script every 1 minute');
};
