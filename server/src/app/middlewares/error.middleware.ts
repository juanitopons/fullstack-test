/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers';

import { Logger } from '~/decorators/logger';
import { IServerLogger } from '~helpers/logger';
import { isProduction } from '~helpers/utils';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public isProduction = isProduction();

  constructor(@Logger() private logger: IServerLogger) {}

  private logAllErrors(errors) {
    errors.forEach((err) => this.logger.error(err));
  }

  public error(
    error: HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void {
    res.status(error.httpCode || 500);
    res.json({
      name: error.name,
      message: error.message,
      errors: error[`errors`] || [],
    });

    if (this.isProduction) {
      this.logger.error(error.name, error.message);
    } else {
      this.logger.error(error.name, error.stack);
      if (error[`errors`]) {
        this.logAllErrors(error[`errors`]);
      }
    }
  }
}
