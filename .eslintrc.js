module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      typescript: {
        config: 'tsconfig.json',
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',

    // https://ja.reactjs.org/docs/hooks-rules.html#eslint-plugin
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useAPI)',
      },
    ],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        printWidth: 100,
        trailingComma: 'all',
        singleQuote: true,
      },
    ],

    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'index', 'sibling']],
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 'warn',
    'import/no-default-export': 'off',
    'import/no-internal-modules': [
      'error',
      {
        forbid: [
          'components/*/*', // `components/<Component>/*`からはindex.tsのみ参照可
          'pages/*/*/*', // `pages/<product>/<Component>/*`からはindex.tsのみ参照可
          'api/*/*',
        ],
      },
    ],
    'no-case-declarations': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './**/*',
            from: 'node_modules/moment',
            message: 'moment利用禁止！date-fns使って！！',
          },
        ],
      },
    ],
  },
  overrides: [
    // pagesのindexファイルだけは、prefer-default-export
    // React.lazyでのimportを楽にしたいため。
    {
      files: ['src/pages/*/*/index.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
  ],
};
