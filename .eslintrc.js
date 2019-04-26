module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  globals: {
    'document': true,
    'navigator': true,
    'window': true,
    'setTimeout': true,
    'Vue': true,
    'global': true,
  },
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off'
  }
}
