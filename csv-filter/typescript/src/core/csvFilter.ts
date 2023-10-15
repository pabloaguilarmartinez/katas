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
		const netAmountField = fields[3];
		const grossAmountField = fields[2];
		if (
			taxFieldsAreMutuallyExclusive &&
			(this.checkIfNetAmountIsCorrect(netAmountField, grossAmountField, vatField) ||
				this.checkIfNetAmountIsCorrect(netAmountField, grossAmountField, igicField))
		) {
			result.push(this.lines[1]);
		}
		return result;
	}

	private checkIfNetAmountIsCorrect(netAmountField: string, grossAmountField: string, taxField: string): boolean {
		return parseFloat(netAmountField) === (1 - parseFloat(taxField) / 100) * parseFloat(grossAmountField);
	}
}
