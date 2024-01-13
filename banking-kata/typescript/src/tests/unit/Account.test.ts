import { Account } from '../../core/Account';
import { TransactionRepository } from '../../core/TransactionRepository';

export class Transaction {}

export class StatementPrinter {
	print(transactions: Transaction[]): void {}
}

describe('The account', () => {
	const repository = new TransactionRepository();
	const statementPrinter = new StatementPrinter();
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
		const transactions = [new Transaction(), new Transaction()];
		repository.allTransactions = () => transactions;

		account.printStatement();

		expect(printerSpy).toHaveBeenCalledWith(transactions);
	});
});
