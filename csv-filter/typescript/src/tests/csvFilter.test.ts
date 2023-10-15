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
		const invoiceLine = fileWithOneInvoiceLineHaving({});
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	it('excludes lines with both tax fields populated as they are exclusive', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ igicTax: '7' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});
	('');
	it('excludes lines without tax fields populated as one is required', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ vatTax: '' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines with non decimal tax fields', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ vatTax: 'XYZ' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines with both tax fields populated even if non decimal', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ vatTax: 'XYZ', igicTax: '7' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines with net amount calculated incorrectly with vat tax', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ netAmount: '900' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('allows only the correct lines when the igic tax is applied', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ vatTax: '', igicTax: '7', netAmount: '930' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	it('excludes lines with miscalculated net amount for igic tax', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ vatTax: '', igicTax: '7', netAmount: '900' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines with both identification numbers fields populated as they are exclusive', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ nif: '12345678A' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines without identification numbers fields populated as one is required', () => {
		const invoiceLine = fileWithOneInvoiceLineHaving({ cif: '' });
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('allows only multiple correct lines', () => {
		const invoiceLine1 = fileWithOneInvoiceLineHaving({});
		const invoiceLine2 = fileWithOneInvoiceLineHaving({});
		const csvFilter = CsvFilter.create([header, invoiceLine1, invoiceLine2]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine1, invoiceLine2]);
	});

	it('excludes lines with repeated invoice id', () => {
		const invoiceLine1 = fileWithOneInvoiceLineHaving({ invoiceId: '1' });
		const invoiceLine2 = fileWithOneInvoiceLineHaving({ invoiceId: '1' });
		const invoiceLine3 = fileWithOneInvoiceLineHaving({ invoiceId: '3' });
		const invoiceLine4 = fileWithOneInvoiceLineHaving({ invoiceId: '4' });
		const invoiceLine5 = fileWithOneInvoiceLineHaving({ invoiceId: '3' });
		const csvFilter = CsvFilter.create([header, invoiceLine1, invoiceLine2, invoiceLine3, invoiceLine4, invoiceLine5]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine4]);
	});

	interface FileWithOneInvoiceLineHavingParams {
		invoiceId?: string;
		vatTax?: string;
		igicTax?: string;
		netAmount?: string;
		cif?: string;
		nif?: string;
	}

	function fileWithOneInvoiceLineHaving({
		invoiceId = '1',
		vatTax = '21',
		igicTax = emptyField,
		netAmount = '790',
		cif = 'B76430134',
		nif = emptyField,
	}: FileWithOneInvoiceLineHavingParams): string {
		const invoiceDate = '02/05/2019';
		const grossAmount = '1000';
		const concept = 'ACER Laptop';
		return [invoiceId, invoiceDate, grossAmount, netAmount, vatTax, igicTax, concept, cif, nif].join(',');
	}
});
