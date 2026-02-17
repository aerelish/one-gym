/* eslint-disable perfectionist/sort-objects */

import type { Config } from 'jest';

const config: Config = {
	extensionsToTreatAsEsm: ['.ts'], // tell Jest we're using ESM
	moduleNameMapper: {
		'^#(.*)\\.js$': '<rootDir>/src/$1.ts',
		'^#(.*)$': '<rootDir>/src/$1',
	}, // module alias mapping for package.json "imports"
	preset: 'ts-jest/presets/default-esm',
	roots: ['<rootDir>/src'], // where tests live
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.test.ts'],

	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.json',
				useESM: true,
			},
		],
	}, // Needed so `.js` imports work in TS files

	clearMocks: true,
	restoreMocks: true,
};

export default config;
