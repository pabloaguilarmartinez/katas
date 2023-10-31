export function wordWrap(text: string, columnWidth: number): string {
	checkForPositiveColumnWidth(columnWidth);
	if (text == null) return '';
	if (text.length <= columnWidth) {
		return text;
	}
	const wrapIndex = getWrapIndex(text, columnWidth);
	const unwrapIndex = getUnwrapIndex(text, columnWidth);
	const wrappedText = text.substring(0, wrapIndex).concat('\n');
	const unwrappedText = text.substring(unwrapIndex);
	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}

function checkForPositiveColumnWidth(columnWidth: number) {
	if (columnWidth < 1) throw new Error('Only positive column width values are allowed');
}

function getWrapIndex(text: string, columnWidth: number) {
	const indexOfSpace = text.indexOf(' ');
	const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
	return shallWrapBySpace ? indexOfSpace : columnWidth;
}

function getUnwrapIndex(text: string, columnWidth: number) {
	const indexOfSpace = text.indexOf(' ');
	const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
	return shallWrapBySpace ? indexOfSpace + 1 : columnWidth;
}
