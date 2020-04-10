const log4js = require('log4js');
const webpackMerge = require('webpack-merge');

const webpackCommonConfig = require('./config/webpack/webpack.common');

const webpackLogger = log4js.getLogger('webpack');
const ENV = 'development';

module.exports = (env) => {
  if (!env) {
    webpackLogger.info(
      `No enviroment defined on webpack call, loading NODE_ENV: ${ENV}`,
    );
  }

  env = env || ENV;
  const envConfig = require(`./config/webpack/webpack.${env}`);
  const commonConfig = webpackCommonConfig(env);
  webpackLogger.info(`Loaded Webpack ${env} enviroment Config`);

  const webpackConfig = webpackMerge(commonConfig, envConfig);
  return webpackConfig;
};
