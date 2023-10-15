import { fizzbuzz } from '../core/fizzbuzz';

test('given number 1 should return 1 as a string', () => {
	expect(fizzbuzz(1)).toBe('1');
});

test('given number 2 should return 2 as a string', () => {
	expect(fizzbuzz(2)).toBe('2');
});

test('given number 3 should return fizz', () => {
	expect(fizzbuzz(3)).toBe('fizz');
});

test('given number 5 should return buzz', () => {
	expect(fizzbuzz(5)).toBe('buzz');
});

test('given number 15 should return fizzbuzz', () => {
	expect(fizzbuzz(15)).toBe('fizzbuzz');
});

test('given any number divisible by 3 should return fizz', () => {
	expect(fizzbuzz(6)).toBe('fizz');
});

test('given any number divisible by 5 should return buzz', () => {
	expect(fizzbuzz(10)).toBe('buzz');
});

test('given any number divisible by 15 should return fizzbuzz', () => {
	expect(fizzbuzz(30)).toBe('fizzbuzz');
});

test('given any number not divisible by 3, 5 or 15 should return the received number itself', () => {
	let number: number;
	do {
		number = Math.floor(Math.random() * 100) + 1;
	} while (number % 3 === 0 || number % 5 === 0 || number % 15 === 0);
	const result: string = fizzbuzz(number);
	const expected: string = number.toString();
	expect(result).toBe(expected);
});
