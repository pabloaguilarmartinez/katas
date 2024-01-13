import { StatementPrinter } from '../../core/StatementPrinter';
import { Console } from '../../core/Console';
import { Transaction } from '../../core/Transaction';

describe('The Statement Printer', () => {
	const console = new Console();
	const consoleSpy = jest.spyOn(console, 'log');
	const statementPrinter = new StatementPrinter(console);

	it('always print the header throughout the console', () => {
		statementPrinter.print([]);

		expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
	});

	it('prints a statement of account including a given transaction', () => {
		statementPrinter.print([new Transaction('13/01/2024', 500)]);

		expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
		expect(consoleSpy).toHaveBeenCalledWith('13/01/2024 | 500.00 | 500.00');
	});
});
