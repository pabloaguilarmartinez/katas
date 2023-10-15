export class CsvFilter {
	private constructor(private readonly lines: string[]) {}

	static create(lines: string[]) {
		if (lines.length === 1) {
			throw new Error('Single line is not allowed');
		}
		return new CsvFilter(lines);
	}

	get filteredLines(): string[] {
		const header = this.lines[0];
		const invoices = this.lines.slice(1);
		const validatedInvoices = invoices.filter(this.validateInvoice);
		const duplicateIds = this.takeRepeatedInvoiceIds(validatedInvoices);
		const nonRepeatedInvoices = validatedInvoices.filter((invoice) => !duplicateIds.includes(invoice.split(',')[0]));
		return [header].concat(nonRepeatedInvoices);
	}

	private validateInvoice = (invoice: string) => {
		const fields = invoice.split(',');
		const vatField = fields[4];
		const igicField = fields[5];
		const decimalRegex = '\\d+(\\.\\d+)?';
		const areTaxFieldsMutuallyExclusive =
			(vatField.match(decimalRegex) || igicField.match(decimalRegex)) && (!vatField || !igicField);
		const netAmountField = fields[3];
		const grossAmountField = fields[2];
		const isNetAmountCorrect =
			this.hasCorrectAmount(netAmountField, grossAmountField, vatField) ||
			this.hasCorrectAmount(netAmountField, grossAmountField, igicField);
		const cifField = fields[7];
		const nifField = fields[8];
		const areIdentifierFieldsFieldsMutuallyExclusive = (!cifField || !nifField) && !(!cifField && !nifField);
		return areTaxFieldsMutuallyExclusive && isNetAmountCorrect && areIdentifierFieldsFieldsMutuallyExclusive;
	};

	private hasCorrectAmount(netAmountField: string, grossAmountField: string, taxField: string): boolean {
		const parsedNetAmount = parseFloat(netAmountField);
		const parsedGrossAmount = parseFloat(grossAmountField);
		const parsedTax = parseFloat(taxField);
		return parsedNetAmount === parsedGrossAmount - (parsedTax / 100) * parsedGrossAmount;
	}

	private takeRepeatedInvoiceIds(invoices: string[]) {
		const invoiceIds = invoices.map((invoice) => invoice.split(',')[0]);
		return invoiceIds.filter((id, index) => invoiceIds.indexOf(id) !== index);
	}
}
