import js from '@eslint/js';
import ts from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'dist/**',
			'coverage/**',
		],
	},

	js.configs.recommended,
	...ts.configs.recommended,

	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooks,
			'jsx-a11y': a11y,
			prettier: prettierPlugin,
		},
		languageOptions: {
			parser: ts.parser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: { ecmaFeatures: { jsx: true } },
			globals: { ...globals.browser, ...globals.node },
		},
		settings: { react: { version: 'detect' } },
		rules: {
			// React / Hooks
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/jsx-uses-vars': 'warn',
			'react/prop-types': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// A11y (pick a few sensible defaults)
			'jsx-a11y/alt-text': 'warn',
			'jsx-a11y/anchor-is-valid': 'warn',

			// Prettier (matches your .prettierrc)
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					useTabs: true,
					semi: true,
					trailingComma: 'es5',
					printWidth: 80,
					tabWidth: 4,
					bracketSpacing: true,
					arrowParens: 'always',
					endOfLine: 'lf',
				},
			],
		},
	},

	// Disable stylistic conflicts
	prettier,
];
