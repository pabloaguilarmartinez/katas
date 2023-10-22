export function getPrimeFactorsFor(number: number): number[] {
	let factor = 2;
	while (number % factor != 0) ++factor;
	const remainder = number / factor;
	return remainder <= 1 ? [factor] : [factor].concat(getPrimeFactorsFor(remainder));
}
