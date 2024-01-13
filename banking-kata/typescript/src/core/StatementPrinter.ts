import { Transaction } from './Transaction';
import { Console } from './Console';

export class StatementPrinter {
	constructor(private readonly console: Console) {}

	private readonly header = 'Date | Amount | Balance';

	print(transactions: Transaction[]): void {
		this.console.log(this.header);
		let runningBalance = 0;
		transactions
			.map((transaction) => {
				runningBalance += transaction.amount;
				return this.formatStatementLine(transaction, runningBalance);
			})
			.reverse()
			.forEach((line) => this.console.log(line));
	}

	private formatStatementLine(transaction: Transaction, runningBalance: number): string {
		const formattedAmount = transaction.amount.toFixed(2);
		const formattedBalance = runningBalance.toFixed(2);
		return `${transaction.date} | ${formattedAmount} | ${formattedBalance}`;
	}
}
