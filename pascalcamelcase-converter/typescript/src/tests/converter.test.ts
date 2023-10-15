import { convertToUpperCamelCase } from '../core/converter';

describe('UpperCamelCase converter', () => {
	it('allows empty text', () => {
		expect(convertToUpperCamelCase('')).toBe('');
	});
	it('returns the same value for a word with the first letter capitalized', () => {
		expect(convertToUpperCamelCase('Foo')).toBe('Foo');
	});
	it('joins the capitalized words that are separated by spaces', () => {
		expect(convertToUpperCamelCase('Foo Bar')).toBe('FooBar');
	});
	it('joins the capitalized words that are separated by hyphens', () => {
		expect(convertToUpperCamelCase('Foo_Bar-Foo')).toBe('FooBarFoo');
	});
	it('converts the first character of one word to uppercase', () => {
		expect(convertToUpperCamelCase('foo')).toBe('Foo');
	});
	it('returns text in a camel case format for a text that contains words in lowercase', () => {
		expect(convertToUpperCamelCase('foo_bar foo-bar')).toBe('FooBarFooBar');
	});
});
