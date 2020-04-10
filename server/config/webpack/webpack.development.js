const path = require('path');

const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');

const nodemodulesPath = path.resolve('node_modules');
const debugPort = (process.env.NODE_DOCKER && process.env.NODE_DEBUG) || '9229';
const debugIP = (process.env.NODE_DOCKER && '0.0.0.0') || '127.0.0.1';
const debugFlag = process.env.NODE_DOCKER ? '--inspect' : '--inspect';

const devWebpackConfig = {
  optimization: {
    minimize: false,
    nodeEnv: 'development',
  },
  module: {
    rules: [],
  },
  devtool: 'source-map',
  stats: {
    modules: false,
    assets: false,
    colors: true,
    chunks: false,
    chunkOrigins: false,
    chunkModules: false,
    depth: false,
    entrypoints: false,
    env: true,
    errors: true,
    errorDetails: true,
    performance: false,
    timings: true,
    version: true,
    warnings: true,
  },
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: nodemodulesPath,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new NodemonPlugin({
      watch: path.resolve('./dist'),
      verbose: true,
      exec: 'node',
      script: './dist/server.js',
      nodeArgs: [`${debugFlag}=${debugIP}:${debugPort}`],
      legacyWatch: true,
      ext: 'js,ts',
    }),
  ],
};

module.exports = devWebpackConfig;
