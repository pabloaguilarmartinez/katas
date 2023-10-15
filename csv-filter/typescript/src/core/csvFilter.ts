export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		return new CsvFilter(lines);
	}

	get filteredLines() {
		const result = [];
		result.push(this.lines[0]);
		const fields = this.lines[1].split(',');
		if ((!fields[4] || !fields[5]) && !(!fields[4] && !fields[5])) {
			result.push(this.lines[1]);
		}
		return result;
	}
}
