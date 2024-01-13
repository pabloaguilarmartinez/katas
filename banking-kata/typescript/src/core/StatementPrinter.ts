import { Transaction } from './Transaction';
import { Console } from './Console';

export class StatementPrinter {
	constructor(private readonly console: Console) {}

	private readonly header = 'Date | Amount | Balance';

	print(transactions: Transaction[]): void {
		this.console.log(this.header);
		if (transactions.length > 0) {
			const transaction = transactions[0];
			let runningBalance = 0;
			runningBalance += transaction.amount;
			this.console.log(this.formatStatementLine(transaction, runningBalance));
		}
	}

	private formatStatementLine(transaction: Transaction, runningBalance: number): string {
		const formattedAmount = transaction.amount.toFixed(2);
		const formattedBalance = runningBalance.toFixed(2);
		return `${transaction.date} | ${formattedAmount} | ${formattedBalance}`;
	}
}
