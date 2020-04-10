/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from 'typedi';

import { ServerLogger } from '~helpers/logger';

export function Logger() {
  return (
    object: Record<string, any>,
    propertyName: string,
    index?: number,
  ): any => {
    const logger = Container.get(ServerLogger);
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: (containerInstance) => logger,
    });
  };
}
