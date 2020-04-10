const path = require('path');
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    // 'plugin:jsdoc/recommended'
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
    es2017: true,
    node: true,
    mocha: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier', 'import'],
  rules: {
    // Specific ESLint rules. Overwrite rules specified from the extended configs
    'prettier/prettier': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
    'prettier/prettier': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
  settings: {
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        map: [
          ['~controllers', './src/app/controllers'],
          ['~interfaces', './src/app/interfaces'],
          ['~middlewares', './src/app/middlewares'],
          ['~schemas', './src/app/schemas'],
          ['~services', './src/app/services'],
          ['~entities', './src/database/entities'],
          ['~migratons', './src/database/migrations'],
          ['~repository', './src/database/repository'],
          ['~helpers', './src/helpers'],
          ['~scripts', './src/scripts'],
          ['~database', './src/database'],
          ['~config', './config'],
          ['~"', './src'],
        ],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
