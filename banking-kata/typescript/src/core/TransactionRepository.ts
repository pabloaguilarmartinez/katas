import { Transaction } from './Transaction';

export class TransactionRepository {
	addDeposit(amount: number): void {}
	addWithdrawal(amount: number): void {}
	allTransactions(): Transaction[] {
		return [];
	}
}
