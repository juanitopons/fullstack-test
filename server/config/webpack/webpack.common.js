const path = require('path');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { magenta, green, white, bgCyan } = require('chalk');
const { info } = require('log-symbols');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

function getProgressBarEnvFormat(env) {
  const barLeft = magenta.dim.bold('[');
  const barRight = magenta.dim.bold(']');
  const envChalk = magenta.dim(env);
  const preamble = `${green(
    '  building test server',
  )} ${barLeft}${envChalk}${barRight} ${info}`;
  return preamble + ' :bar' + white.bold(' :percent') + '\n';
}

function getCleanEnvOptions(env) {
  const cleanOptions = {
    root: path.resolve('dist'),
    verbose: env === 'development',
    dry: false,
  };

  return cleanOptions;
}

module.exports = (env) => {
  const cleanOptions = getCleanEnvOptions(env);
  const barFormat = getProgressBarEnvFormat(env);
  const nodemodulesPath = path.resolve('node_modules');

  return {
    context: process.cwd(),
    entry: path.resolve('src') + '/server.ts',
    output: {
      path: path.resolve('dist'),
      filename: 'server.js',
      publicPath: path.resolve('public'),
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: nodemodulesPath,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // disable type checker as we will use fork plugin
                transpileOnly: true,
                configFile: 'tsconfig.json',
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                eslintPath: require.resolve('eslint'),
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          exclude: nodemodulesPath,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: nodemodulesPath,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                cacheDirectory: env !== 'production',
                compact: false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
      new CleanWebpackPlugin(cleanOptions),
      new ForkTsCheckerWebpackPlugin({ eslint: true }),
      new FriendlyErrorsWebpackPlugin(),
      new ProgressBarPlugin({
        format: barFormat,
        complete: bgCyan(' '),
        imcomplete: ' ',
      }),
      new HardSourceWebpackPlugin(),
      new FilterWarningsPlugin({
        exclude: [
          /mongodb/,
          /mssql/,
          /mysql2/,
          /oracledb/,
          /pg/,
          /pg-native/,
          /pg-query-stream/,
          /react-native-sqlite-storage/,
          /redis/,
          /sqlite3/,
          /sql.js/,
          /typeorm-aurora-data-api-driver/,
        ],
      }),
      // new CircularDependencyPlugin({
      //   // exclude detection of files based on a RegExp
      //   exclude: /a\.js|node_modules/,
      //   // include specific files based on a RegExp
      //   // add errors to webpack instead of warnings
      //   failOnError: true,
      //   // allow import cycles that include an asyncronous import,
      //   // e.g. via import(/* webpackMode: "weak" */ './file.js')
      //   allowAsyncCycles: false,
      //   // set the current working directory for displaying module paths
      //   cwd: process.cwd(),
      // }),
    ],
  };
};
