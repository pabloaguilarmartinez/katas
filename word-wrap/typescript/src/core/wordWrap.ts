export function wordWrap(text: string, columnWidth: number): string {
	if (columnWidth < 1) throw new Error('Only positive column width values are allowed');
	if (text === null) return '';
	if (text.length <= columnWidth) {
		return text;
	}
	let wrappedText: string;
	let unwrappedText: string;
	const indexOfSpace = text.indexOf(' ');
	const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
	if (shallWrapBySpace) {
		wrappedText = text.substring(0, indexOfSpace).concat('\n');
		unwrappedText = text.substring(indexOfSpace + 1);
	} else {
		wrappedText = text.substring(0, columnWidth).concat('\n');
		unwrappedText = text.substring(columnWidth);
	}
	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
