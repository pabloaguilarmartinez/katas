import { TransactionRepository } from './TransactionRepository';

export class Account {
	constructor(private readonly repository: TransactionRepository) {}

	deposit(amount: number): void {
		this.repository.addDeposit(amount);
	}

	withdraw(number: number): void {}

	printStatement(): void {}
}
