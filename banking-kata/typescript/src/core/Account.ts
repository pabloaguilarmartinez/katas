import { TransactionRepository } from './TransactionRepository';
import { StatementPrinter } from '../tests/unit/Account.test';

export class Account {
	constructor(
		private readonly repository: TransactionRepository,
		private readonly statementPrinter: StatementPrinter
	) {}

	deposit(amount: number): void {
		this.repository.addDeposit(amount);
	}

	withdraw(number: number): void {
		this.repository.addWithdrawal(number);
	}

	printStatement(): void {
		this.statementPrinter.print(this.repository.allTransactions());
	}
}
