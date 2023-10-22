export function getPrimeFactorsFor(number: number): number[] {
	checkForPositiveNumber(number);
	return primeFactors(number);
}

function findSmallestPrime(number: number): number {
	if (number === 1) return 1;
	let factor = 2;
	while (number % factor != 0) ++factor;
	return factor;
}

function checkForPositiveNumber(number: number) {
	if (number < 1) throw new Error('Only positive numbers are allowed');
}

function primeFactors(number: number): number[] {
	const prime = findSmallestPrime(number);
	const remainder = number / prime;
	return remainder <= 1 ? [prime] : [prime].concat(getPrimeFactorsFor(remainder));
}
