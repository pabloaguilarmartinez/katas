import { Account } from '../../core/Account';
import { TransactionRepository } from '../../core/TransactionRepository';
import { StatementPrinter } from '../../core/StatementPrinter';
import { Transaction } from '../../core/Transaction';
import { Clock } from '../../core/Clock';
import { Console } from '../../core/Console';

describe('The account', () => {
	const clock = new Clock();
	const console = new Console();
	const repository = new TransactionRepository(clock);
	const statementPrinter = new StatementPrinter(console);
	const account = new Account(repository, statementPrinter);
	const addDepositSpy = jest.spyOn(repository, 'addDeposit');
	const addWithdrawalSpy = jest.spyOn(repository, 'addWithdrawal');
	const printerSpy = jest.spyOn(statementPrinter, 'print');

	it('stores a deposit transaction throughout the repository', () => {
		account.deposit(100);

		expect(addDepositSpy).toHaveBeenCalledWith(100);
	});

	it('stores a withdrawal transaction throughout the repository', () => {
		account.withdraw(100);

		expect(addWithdrawalSpy).toHaveBeenCalledWith(100);
	});

	it('prints a statement throughout the statement printer', () => {
		const transactions = [new Transaction('13/01/2024', 500), new Transaction('15/01/2024', -200)];
		repository.allTransactions = () => transactions;

		account.printStatement();

		expect(printerSpy).toHaveBeenCalledWith(transactions);
	});
});
