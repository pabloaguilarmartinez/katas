import { StatementPrinter } from '../../core/StatementPrinter';
import { Console } from '../../core/Console';

describe('The Statement Printer', () => {
	const console = new Console();
	const consoleSpy = jest.spyOn(console, 'log');
	const statementPrinter = new StatementPrinter(console);

	it('always print the header throughout the console', () => {
		statementPrinter.print([]);

		expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
	});
});
