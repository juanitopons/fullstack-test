module.exports = {
  root: true,
  ignorePatterns: ['node_modules/**/*.*'],
  extends: [''], // base eslint extends
  plugins: [], // base plugins
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      extends: ['.eslintrc.typescript'],
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      extends: ['.eslintrc.javascript'],
    },
  ],
};
