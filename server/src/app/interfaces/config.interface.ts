import { strictNodeEnvValueValidator } from '~helpers/validation/validators';

export const NODE_ENV_STRICT_VALUES = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

export const STRICT_ENVS = {
  API_URI: { key: 'API_URI' },
  NODE_ENV: {
    key: 'NODE_ENV',
    validator: () =>
      strictNodeEnvValueValidator(Object.values(NODE_ENV_STRICT_VALUES)),
  },
  NODE_LOG_LEVEL: { key: 'NODE_LOG_LEVEL' },
  NODE_LOG_FILE: { key: 'NODE_LOG_FILE' },
  NODE_LOG_DIR: { key: 'NODE_LOG_DIR' },
  NODE_MORGAN_LOG: { key: 'NODE_MORGAN_LOG' },
  NODE_MORGAN_LOG_FMT: { key: 'NODE_MORGAN_LOG_FMT' },
  NODE_MORGAN_LOG_ROLLING_INTERVAL: { key: 'NODE_MORGAN_LOG_ROLLING_INTERVAL' },
  NODE_DEBUG: { key: 'NODE_DEBUG' },
  MYSQL_HOSTNAME: { key: 'MYSQL_HOSTNAME' },
  MYSQL_USER: { key: 'MYSQL_USER' },
  MYSQL_PASSWORD: { key: 'MYSQL_PASSWORD' },
  MYSQL_PORT: { key: 'MYSQL_PORT' },
  MYSQL_DATABASE: { key: 'MYSQL_DATABASE' },
  SERVER_INTERNAL_PORT: { key: 'SERVER_INTERNAL_PORT' },
};

interface IProcessEnv {
  API_URI: string;
  NODE_ENV: string;
  NODE_LOG_LEVEL: string;
  NODE_LOG_FILE: string;
  NODE_LOG_DIR: string;
  NODE_MORGAN_LOG: string;
  NODE_MORGAN_LOG_FMT: string;
  NODE_MORGAN_LOG_ROLLING_INTERVAL: string;
  NODE_DEBUG: string;
  MYSQL_HOSTNAME: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_PORT: string;
  MYSQL_DATABASE: string;
  SERVER_INTERNAL_PORT: string;
  NODE_DOCKER: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProcessEnv extends IProcessEnv {}
