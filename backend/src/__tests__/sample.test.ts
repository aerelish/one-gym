import { describe, it, expect } from '@jest/globals';
import { add } from '#utils/sample.js';

describe('add function', () => {
	it('should add two numbers correctly', () => {
		expect(add(2, 3)).toBe(5);
	});
});
