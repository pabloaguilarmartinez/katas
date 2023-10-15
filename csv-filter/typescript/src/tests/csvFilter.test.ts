/* Examples to test
 1. A file with a single invoice where everything is correct should output the same line.
 2. A file with a single invoice where VAT and IGIC are filled in, the line should be deleted.
 3. A file with a single invoice where the net is incorrectly calculated, should be deleted.
 4. A file with a single invoice where VAT and VAT number are filled in, the line should be deleted.
 5. If the invoice number is repeated in several lines, all of them are deleted (without leaving any line).
 6. An empty list will produce an empty output list.
 7. A single line file is incorrect because it has no header.
* */
import { CsvFilter } from '../core/csvFilter';

describe('CSV Filter', () => {
	const header = 'Num_invoice, Date, Gross, Net, VAT, IGIC, Concept, CIF_customer, NIF_customer';

	it('allows for correct lines only', () => {
		const invoiceLine = '1,02/05/2019,1008,810,19,,ACERLaptop,B76430134,';
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header, invoiceLine]);
	});

	it('excludes lines with both tax fields populated as they are exclusive', () => {
		const invoiceLine = '1,02/05/2021,1000,790,21,7,ACER Laptop,B76430134,';
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});

	it('excludes lines without tax fields populated as one is required', () => {
		const invoiceLine = '1,02/05/2021,1000,790,,,ACER Laptop,B76430134,';
		const csvFilter = CsvFilter.create([header, invoiceLine]);

		const result = csvFilter.filteredLines;

		expect(result).toEqual([header]);
	});
});
