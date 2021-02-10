module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true,
        'cypress/globals': true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['prettier', 'cypress'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 4,
                printWidth: 90,
                trailingComma: 'all',
            },
        ],

        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'none' }],
    },
};
