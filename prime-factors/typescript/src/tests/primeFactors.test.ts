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
function getPrimeFactorsFor(number: number) {
	const factors = [2];
	return factors;
}

describe('Prime factors', () => {
	it('finds the prime composition of the given number', () => {
		expect(getPrimeFactorsFor(2)).toEqual([2]);
        expect(getPrimeFactorsFor(2 * 2)).toEqual([4]);
    });
});
