import { Console } from '../../core/Console';
import { Account } from '../../core/Account';
import { TransactionRepository } from '../../core/TransactionRepository';
import { StatementPrinter } from '../unit/Account.test';

describe('Print Statement', () => {
	const console = new Console();
	const consoleSpy = jest.spyOn(console, 'log');
	const repository = new TransactionRepository();
	const statementPrinter = new StatementPrinter();
	const account = new Account(repository, statementPrinter);

	it('prints an account statement including the transactions made throughout the console', () => {
		account.deposit(1000);
		account.withdraw(500);
		account.deposit(2000);

		account.printStatement();

		expect(consoleSpy).toHaveBeenCalledWith('Date | Amount | Balance');
		expect(consoleSpy).toHaveBeenCalledWith('14/01/2022 | 2000 | 2500');
		expect(consoleSpy).toHaveBeenCalledWith('13/01/2022 | -500 | 500');
		expect(consoleSpy).toHaveBeenCalledWith('10/01/2022 | 1000 | 1000');
	});
});
