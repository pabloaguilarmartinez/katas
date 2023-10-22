/*
2 ⇒ [2]
2 * 2 ⇒ [2,2]
2 * 2 * 2 ⇒ [2,2,2]
3 ⇒ [3]
3 * 3 ⇒ [3,3]
3 * 2 ⇒ [2,3]
5 * 5 ⇒ [5,5]
5 * 7 * 11 * 3 ⇒ [3,5,7,11]
 */
function getPrimeFactorsFor(number: number): number[] {
	const factor = 2;
	const factors = [2];
	let remainder = number / factor;
	while (remainder > 1) {
		factors.push(2);
		remainder = remainder / factor;
	}
	return factors;
}

describe('Prime factors', () => {
	it('finds the prime composition of the given number', () => {
		expect(getPrimeFactorsFor(2)).toEqual([2]);
		expect(getPrimeFactorsFor(2 * 2)).toEqual([2, 2]);
		expect(getPrimeFactorsFor(2 * 2 * 2)).toEqual([2, 2, 2]);
	});
});
