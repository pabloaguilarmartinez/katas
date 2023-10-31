import { ColumnWidth, WrappableText } from '../core/wordWrap';

describe('The Word Wrapper', () => {
	it('does not add a line break if text is shorter than column width', () => {
		expect(WrappableText.create('').wordWrap(ColumnWidth.create(5))).toEqual({ text: '' });
	});
	it('does not add a line break if text is as long as the column width', () => {
		expect(WrappableText.create('hello').wordWrap(ColumnWidth.create(5))).toEqual({ text: 'hello' });
	});
	it('part words that are longer than column width', () => {
		expect(WrappableText.create('longword').wordWrap(ColumnWidth.create(4))).toEqual({ text: 'long\nword' });
		expect(WrappableText.create('reallylongword').wordWrap(ColumnWidth.create(4))).toEqual({
			text: 'real\nlylo\nngwo\nrd',
		});
	});
	it('blank spaces are preferred for wrapping', () => {
		expect(WrappableText.create('abc def').wordWrap(ColumnWidth.create(4))).toEqual({ text: 'abc\ndef' });
		expect(WrappableText.create('abc def ghi').wordWrap(ColumnWidth.create(4))).toEqual({ text: 'abc\ndef\nghi' });
		expect(WrappableText.create(' abcd').wordWrap(ColumnWidth.create(4))).toEqual({ text: '\nabcd' });
	});
	it('allows null text', () => {
		expect(WrappableText.create(null).wordWrap(ColumnWidth.create(5))).toEqual({ text: '' });
		expect(WrappableText.create(undefined).wordWrap(ColumnWidth.create(5))).toEqual({ text: '' });
	});
	it('only accepts positive column width value', () => {
		expect(() => WrappableText.create('hello').wordWrap(ColumnWidth.create(-5))).toThrow();
	});
});
