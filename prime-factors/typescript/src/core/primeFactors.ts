function findSmallestPrime(number: number) {
	if (number === 1) return 1;
	let factor = 2;
	while (number % factor != 0) ++factor;
	return factor;
}

export function getPrimeFactorsFor(number: number): number[] {
	const prime = findSmallestPrime(number);
	const remainder = number / prime;
	return remainder <= 1 ? [prime] : [prime].concat(getPrimeFactorsFor(remainder));
}
