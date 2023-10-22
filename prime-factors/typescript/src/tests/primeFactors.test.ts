import { getPrimeFactorsFor } from '../core/primeFactors';

describe('Prime factors', () => {
	it('knows that the first prime is number one', () => {
		expect(getPrimeFactorsFor(1)).toEqual([1]);
	});
	it('knows what is a prime number', () => {
		expect(getPrimeFactorsFor(2)).toEqual([2]);
		expect(getPrimeFactorsFor(3)).toEqual([3]);
	});
	it('produces the same result to multiply the numbers in the output list', () => {
		expect(getPrimeFactorsFor(2 * 2 * 2)).toEqual([2, 2, 2]);
		expect(getPrimeFactorsFor(3 * 3)).toEqual([3, 3]);
		expect(getPrimeFactorsFor(5 * 5)).toEqual([5, 5]);
	});
	it('orders the prime factors from the smallest to the biggest', () => {
		expect(getPrimeFactorsFor(5 * 7 * 11 * 3)).toEqual([3, 5, 7, 11]);
	});
	it('only accepts positive numbers', () => {
		expect(() => getPrimeFactorsFor(-5)).toThrow();
	});
});
