export function convertToUpperCamelCase(value: string): string {
	const words: string[] = value.split(/[ _-]/);
	return words.map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join('');
}
