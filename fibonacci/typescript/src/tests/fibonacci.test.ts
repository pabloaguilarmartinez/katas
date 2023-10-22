// 0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597
import { fibonacci } from '../core/fibonacci';

describe('The fibonacci sequence', () => {
	it('yields value zero to number zero', () => {
		expect(fibonacci(0)).toBe(0);
	});
});
