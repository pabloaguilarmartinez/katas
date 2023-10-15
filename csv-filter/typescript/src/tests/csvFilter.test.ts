/* Examples to test
 1. A file with a single invoice where everything is correct should output the same line.
 2. A file with a single invoice where VAT and IGIC are filled in, the line should be deleted.
 3. A file with a single invoice where the net is incorrectly calculated, should be deleted.
 4. A file with a single invoice where VAT and VAT number are filled in, the line should be deleted.
 5. If the invoice number is repeated in several lines, all of them are deleted (without leaving any line).
 6. An empty list will produce an empty output list.
 7. A single line file is incorrect because it has no header.
* */
describe('CSV Filter', () => {
    it('allows for correct lines only', () => {
        const header = 'Num_invoice, Date, Gross, Net, VAT, IGIC, Concept, CIF_customer, NIF_customer';
    });
});
