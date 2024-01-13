import {Transaction} from "../tests/unit/Account.test";

export class TransactionRepository {
	addDeposit(amount: number): void {}
	addWithdrawal(amount: number): void {}
	allTransactions(): Transaction[] {
		return [];
	}
}
