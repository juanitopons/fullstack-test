import { config as configDotenv } from 'dotenv';
import { resolve } from 'path';
import { useContainer } from 'routing-controllers';
import sourceMapSupport from 'source-map-support';
import { Container } from 'typedi';
import { useContainer as useContainerTypeOrm } from 'typeorm';

import { isDevelopment, throwIfNotKeyinObj } from '~helpers/utils';
import { STRICT_ENVS } from '~interfaces/config.interface';

function strictEnv(): void {
  Object.keys(STRICT_ENVS).forEach((envKey) => {
    throwIfNotKeyinObj(process.env, envKey, STRICT_ENVS[envKey].validator);
  });
}

function addSourceMapSupport(): void {
  if (isDevelopment()) {
    sourceMapSupport.install({
      handleUncaughtExceptions: false,
      environment: 'node',
      hookRequire: true,
    });
  }
}

export function loadDotenvConfig(): void {
  if (!process.env.NODE_DOCKER) {
    configDotenv({
      path: resolve(__dirname, `../.local.env.${process.env.NODE_ENV}`),
    });
  }
}

export function useContainers(): void {
  useContainer(Container);
  useContainerTypeOrm(Container);
  // classValidatorUseContainer(Container);
}

export function initConfig(): void {
  loadDotenvConfig();
  throwIfNotKeyinObj(
    process.env,
    STRICT_ENVS.NODE_ENV.key,
    STRICT_ENVS.NODE_ENV.validator,
  );
  addSourceMapSupport();
  strictEnv();
  useContainers();
}
