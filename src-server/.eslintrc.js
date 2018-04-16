// https://eslint.org/docs/user-guide/configuring

module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['airbnb-base'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.server.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'no-unused-vars': ['warn'],
    'no-console': ['off'],
    'no-underscore-dangle': ['off'],
    'no-plusplus': ['off'],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'context', // for azure function
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
