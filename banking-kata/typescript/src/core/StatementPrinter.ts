import { Transaction } from './Transaction';
import { Console } from './Console';

export class StatementPrinter {
	constructor(private readonly console: Console) {}

	private readonly header = 'Date | Amount | Balance';

	print(transactions: Transaction[]): void {
		this.console.log(this.header);
		this.printStatements(transactions);
	}

	private printStatements(transactions: Transaction[]) {
		this.generateStatementLine(transactions)
			.reverse()
			.forEach((line) => this.console.log(line));
	}

	private generateStatementLine(transactions: Transaction[]): string[] {
		let runningBalance = 0;
		return transactions.map((transaction) => {
			runningBalance += transaction.amount;
			return this.formatStatementLine(transaction, runningBalance);
		});
	}

	private formatStatementLine(transaction: Transaction, runningBalance: number): string {
		const formattedAmount = transaction.amount.toFixed(2);
		const formattedBalance = runningBalance.toFixed(2);
		return `${transaction.date} | ${formattedAmount} | ${formattedBalance}`;
	}
}
