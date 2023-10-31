export function wordWrap(text: string, columnWidth: number): string {
	if (columnWidth < 1) throw new Error('Only positive column width values are allowed');
	if (text === null) return '';
	if (text.length <= columnWidth) {
		return text;
	}
	const wrappedText = text.substring(0, columnWidth).replace(' ', '') + '\n';
	const unwrappedText = text.substring(columnWidth);
	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
