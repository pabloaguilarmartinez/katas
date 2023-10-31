export function wordWrap(text: string, columnWidth: number): string {
	if (columnWidth < 1) throw new Error('Only positive column width values are allowed');
	if (text === null) return '';
	if (text.length <= columnWidth) {
		return text;
	}
	let wrappedText: string;
	let unwrappedText: string;
	if (text.indexOf(' ') > -1 && text.indexOf(' ') < columnWidth) {
		wrappedText = text.substring(0, text.indexOf(' ')).concat('\n');
		unwrappedText = text.substring(text.indexOf(' ') + 1);
	} else {
		wrappedText = text.substring(0, columnWidth).concat('\n');
		unwrappedText = text.substring(columnWidth);
	}
	return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
