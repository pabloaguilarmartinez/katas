import { wordWrap } from '../core/wordWrap';

describe('The Word Wrapper', () => {
	it('does not add a line break if text is shorter than column width', () => {
		expect(wordWrap('', 5)).toBe('');
	});
	it('does not add a line break if text is as long as the column width', () => {
		expect(wordWrap('hello', 5)).toBe('hello');
	});
	it('part words that are longer than column width', () => {
		expect(wordWrap('longword', 4)).toBe('long\nword');
		expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
	});
	it('converts the blank space into a break line', () => {
		expect(wordWrap('abc def', 4)).toBe('abc\ndef');
		expect(wordWrap('abc def ghi', 4)).toBe('abc\ndef\nghi');
		expect(wordWrap(' abcdf', 4)).toBe('\nabcd\nf');
	});
	it('allows null text', () => {
		expect(wordWrap(null, 5)).toBe('');
	});
	it('only accepts positive column width value', () => {
		expect(() => wordWrap('hello', -5)).toThrow();
	});
});
