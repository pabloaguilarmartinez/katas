export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		return new CsvFilter(lines);
	}

	get filteredLines() {
		const result = [];
		result.push(this.lines[0]);
		const fields = this.lines[1].split(',');
		const vatField = fields[4];
		const igicField = fields[5];
		if ((!vatField || !igicField) && !(!vatField && !igicField)) {
			result.push(this.lines[1]);
		}
		return result;
	}
}
