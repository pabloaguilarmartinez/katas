import { Transaction } from './Transaction';
import {Clock} from "./Clock";

export class TransactionRepository {
	private transactions: Transaction[] = [];
	constructor(private readonly clock: Clock) {
	}
	addDeposit(amount: number): void {
		this.transactions.push(new Transaction(this.clock.todayAsString(), amount));
	}
	addWithdrawal(amount: number): void {}
	allTransactions(): Transaction[] {
		return [];
	}
}
