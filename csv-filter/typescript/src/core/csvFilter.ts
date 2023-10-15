export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		return new CsvFilter(lines);
	}

	get filteredLines(): string[] {
		const result = [];
		result.push(this.lines[0]);
		const fields = this.lines[1].split(',');
		const vatField = fields[4];
		const igicField = fields[5];
		const decimalRegex = '\\d+(\\.\\d+)?';
		const taxFieldsAreMutuallyExclusive =
			(vatField.match(decimalRegex) || igicField.match(decimalRegex)) && (!vatField || !igicField);
		if (taxFieldsAreMutuallyExclusive) {
			result.push(this.lines[1]);
		}
		return result;
	}
}
