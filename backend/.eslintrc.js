module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
    'jest/globals': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 13
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2]
  },
  'plugins': ['jest']
};
