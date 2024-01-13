import { Transaction } from './Transaction';
import { Clock } from './Clock';

export class TransactionRepository {
	private transactions: Transaction[] = [];
	constructor(private readonly clock: Clock) {}
	addDeposit(amount: number): void {
		const transaction = new Transaction(this.clock.todayAsString(), amount);
		this.transactions.push(transaction);
	}
	addWithdrawal(amount: number): void {
		const transaction = new Transaction(this.clock.todayAsString(), -amount);
		this.transactions.push(transaction);
	}
	allTransactions(): Transaction[] {
		return this.transactions;
	}
}
