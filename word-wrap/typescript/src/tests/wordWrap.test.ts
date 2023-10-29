import { wordWrap } from '../core/wordWrap';

describe('The Word Wrapper', () => {
	it('do not add a line break if text is shorter than column width', () => {
		expect(wordWrap('', 5)).toBe('');
	});
	it('do not add a line break if text is as long as the column width', () => {
		expect(wordWrap('hello', 5)).toBe('hello');
	});
});
