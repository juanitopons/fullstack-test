const path = require('path');

const webpack = require('webpack');

const prodWebpackConfig = {
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [],
  },
  devtool: 'hidden-source-map',
  stats: 'errors-only',
  mode: 'production',
  optimization: {
    minimize: false,
    nodeEnv: 'production',
    occurrenceOrder: true,
    noEmitOnErrors: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 4,
    }),
  ],
};

module.exports = prodWebpackConfig;
