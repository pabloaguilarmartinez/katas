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

	it('prints a statement of account including a given transaction throughout the console', () => {
		statementPrinter.print([new Transaction('13/01/2024', 500)]);

		expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
		expect(consoleSpy).toHaveBeenCalledWith('13/01/2024 | 500.00 | 500.00');
	});

	it('prints a statement of account including multiple transactions throughout the console', () => {
		const transactions = [
			new Transaction('13/01/2024', 500),
			new Transaction('14/01/2024', 500),
			new Transaction('15/01/2024', -200),
		];

		statementPrinter.print(transactions);

		expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
		expect(consoleSpy).toHaveBeenCalledWith('15/01/2024 | -200.00 | 800.00');
		expect(consoleSpy).toHaveBeenCalledWith('14/01/2024 | 500.00 | 1000.00');
		expect(consoleSpy).toHaveBeenCalledWith('13/01/2024 | 500.00 | 500.00');
	});
});
