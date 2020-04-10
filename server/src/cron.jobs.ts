import { CronJob, CronJobParameters, CronTime } from 'cron';

import { getLogger, IServerLogger } from '~helpers/logger';
import { everyOneMinCronJob } from '~scripts/cron/example-every-one-minute';

// Cron Jobs
export const cronJobs = [
  {
    name: 'cron-example',
    cronTime: '0 */1 * * * *',
    onTick: everyOneMinCronJob,
  },
] as ICustomCronJobParams[];

export interface ICustomCronJobParams extends CronJobParameters {
  name: string;
}

export class CustomCronJob extends CronJob {
  private logger: IServerLogger = getLogger();
  public started = false;
  public options: ICustomCronJobParams;
  public cronTime: CronTime;

  constructor(options: ICustomCronJobParams) {
    super(options);
    this.options = options;
    this.cronTime = new CronTime(
      this.options.cronTime,
      this.options.timeZone,
      this.options.utcOffset,
    );
  }

  private log(message) {
    this.logger.cron(this.options, message);
  }

  private logOnTick(onTick: Function): Function {
    if (this.started) {
      this.log(`Running cron Job at ${this.cronTime.sendAt()}...`);
    }

    return onTick;
  }

  private logOnCreate(): void {
    this.log('Created cron Job.');
    this.log(`Next execution: ${this.cronTime.sendAt()}`);
  }

  private logOnDestroy(): void {
    this.log('Removed cron Job.');
  }

  public fireOnTick = this.logOnTick(super.fireOnTick);

  public start(): void {
    this.started = true;
    this.logOnCreate();
    super.start();
  }

  public stop(): void {
    this.started = false;
    this.logOnDestroy();
    super.stop();
  }
}
