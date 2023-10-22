// 0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597
import { fibonacci } from '../core/fibonacci';

describe('The fibonacci sequence', () => {
	it('yields value zero to number zero', () => {
		expect(fibonacci(0)).toBe(0);
	});

	it('yields value one to number one', () => {
		expect(fibonacci(1)).toBe(1);
	});

	it('is a series where the value for a number is the addition of the preceding two values', () => {
		expect(fibonacci(2)).toBe(fibonacci(0) + fibonacci(1));
		expect(fibonacci(3)).toBe(fibonacci(1) + fibonacci(2));
	});
});
