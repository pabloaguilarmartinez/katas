export function wordWrap(text: string, columnWidth: number): string {
	if (text.length <= columnWidth) {
		return text;
	}
	return text.substring(0, columnWidth) + '\n' + wordWrap(text.substring(columnWidth), columnWidth);
}
