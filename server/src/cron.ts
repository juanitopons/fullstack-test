import { Service } from 'typedi';

import { cronJobs, CustomCronJob, ICustomCronJobParams } from '~/cron.jobs';
import { IServerLogger } from '~helpers/logger';

import { Logger } from './decorators/logger';

@Service()
export class CronScheduler {
  @Logger()
  private readonly logger: IServerLogger;
  private scheduled = false;
  private readonly jobsConfig: ICustomCronJobParams[] = cronJobs;
  private cronJobs: CustomCronJob[] = [];

  public schedule() {
    if (!this.scheduled) {
      this.logger.info('Creating CronScheduler and its jobs...');
      this.createJobs();
      this.start();
      this.scheduled = true;
    }
  }

  public unschedule() {
    this.stop();
    this.cronJobs = [];
    this.scheduled = true;
  }

  private createJobs() {
    for (let i = 0; i < this.jobsConfig.length; i++) {
      this.cronJobs.push(new CustomCronJob(this.jobsConfig[i]));
    }
  }

  private stop() {
    if (this.scheduled) {
      this.logger.info('Stopping CronScheduler jobs..');
      for (let i = 0; i < this.cronJobs.length; i++) {
        this.cronJobs[i].stop();
      }
    }
  }

  private start() {
    this.logger.info('Starting CronScheduler jobs..');
    for (let i = 0; i < this.cronJobs.length; i++) {
      this.cronJobs[i].start();
    }
  }
}
