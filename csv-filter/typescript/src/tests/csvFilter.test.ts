/* Examples to test
 1. A file with a single invoice where everything is correct should output the same line.
 2. A file with a single invoice where VAT and IGIC are filled in, the line should be deleted.
 3. A file with a single invoice where the net is incorrectly calculated, should be deleted.
 4. A file with a single invoice where CIF and NIF are filled in, the line should be deleted.
 5. If the invoice number is repeated in several lines, all of them are deleted (without leaving any line).
 6. An empty list will produce an empty output list.
 7. A single line file is incorrect because it has no header.
* */
import { CsvFilter } from '../core/csvFilter';

describe('CSV Filter', () => {
	const header = 'Num_invoice, Date, Gross, Net, VAT, IGIC, Concept, CIF_customer, NIF_customer';
	const emptyField = '';

	it('allows for correct lines only', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving();
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	it('excludes lines with both tax fields populated as they are exclusive', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving('21', '7');
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines without tax fields populated as one is required', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving('', '');
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines with non decimal tax fields', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving('XYZ', '');
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines with both tax fields populated even if non decimal', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving('XYZ', '7');
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines with net amount calculated incorrectly with vat tax', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving('21', '', '900');
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('allows only the correct lines when the igic tax is applied', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving('', '7', '930');
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	it('excludes lines with miscalculated net amount for igic tax', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving('', '7', '900');
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	function fileWithOneInvoiceLineHaving(
		vatTax: string = '21',
		igicTax: string = emptyField,
		netAmount: string = '790'
	): string {
		const invoiceId = '1';
		const invoiceDate = '02/05/2019';
		const grossAmount = '1000';
		const concept = 'ACER Laptop';
		const cif = 'B76430134';
		const nif = emptyField;
		return [invoiceId, invoiceDate, grossAmount, netAmount, vatTax, igicTax, concept, cif, nif].join(',');
	}
});
