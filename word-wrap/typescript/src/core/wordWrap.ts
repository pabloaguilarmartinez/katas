export function wordWrap(text: string, columnWidth: number): string {
	if (columnWidth < 1) throw new Error('Only positive column width values are allowed');
	if (text === null) return '';
	if (text.length <= columnWidth) {
		return text;
	}

	const indexOfSpace = text.indexOf(' ');
	const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
	const wrapIndex = shallWrapBySpace ? indexOfSpace : columnWidth;
	const unwrapIndex = shallWrapBySpace ? indexOfSpace + 1 : columnWidth;
	const wrappedText = text.substring(0, wrapIndex).concat('\n');
	const unwrappedText = text.substring(unwrapIndex);
	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
