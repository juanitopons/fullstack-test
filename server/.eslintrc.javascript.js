module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'no-duplicate-imports': 'error',
    'import/no-duplicates': 'error',
  },
  settings: {
    'import/parsers': {
      'babel-eslint/parser': ['.js', '.jsx'],
    },
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.json'],
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
          ['~"', './src']
        ],
      },
    },
  },
};
