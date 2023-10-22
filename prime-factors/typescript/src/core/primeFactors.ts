export function getPrimeFactorsFor(number: number): number[] {
	let factor = 2;
	while (number % factor != 0) ++factor;
	const factors = [factor];
	const remainder = number / factor;
	if (remainder > 1) {
		return factors.concat(getPrimeFactorsFor(remainder));
	}
	return factors;
}
