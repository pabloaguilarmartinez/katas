export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		return new CsvFilter(lines);
	}

	get filteredLines(): string[] {
		const header = this.lines[0];
		const invoices = this.lines.slice(1);
		return [header].concat(invoices.filter(this.validateInvoice));
	}

	private validateInvoice = (invoice: string) => {
		const fields = invoice.split(',');
		const vatField = fields[4];
		const igicField = fields[5];
		const decimalRegex = '\\d+(\\.\\d+)?';
		const taxFieldsAreMutuallyExclusive =
			(vatField.match(decimalRegex) || igicField.match(decimalRegex)) && (!vatField || !igicField);
		const netAmountField = fields[3];
		const grossAmountField = fields[2];
		const netAmountIsWellCalculated =
			this.checkIfNetAmountIsCorrect(netAmountField, grossAmountField, vatField) ||
			this.checkIfNetAmountIsCorrect(netAmountField, grossAmountField, igicField);
		const cifField = fields[7];
		const nifField = fields[8];
		const identificationNumberFieldsAreMutuallyExclusive = (!cifField || !nifField) && !(!cifField && !nifField);
		return taxFieldsAreMutuallyExclusive && netAmountIsWellCalculated && identificationNumberFieldsAreMutuallyExclusive;
	};

	private checkIfNetAmountIsCorrect(netAmountField: string, grossAmountField: string, taxField: string): boolean {
		const parsedNetAmount = parseFloat(netAmountField);
		const parsedGrossAmount = parseFloat(grossAmountField);
		const parsedTax = parseFloat(taxField);
		return parsedNetAmount === parsedGrossAmount - (parsedTax / 100) * parsedGrossAmount;
	}
}
