// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
	{
		ignores: ['**/*.js', '**/__tests__/**'],
	},
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: __dirname,
			},
		},
	},
	perfectionist.configs['recommended-natural'],
);
