import { Transaction } from './Transaction';
import { Console } from './Console';

export class StatementPrinter {
	constructor(private readonly console: Console) {
	}
	print(transactions: Transaction[]): void {
		this.console.log('Date | Amount | Balance');
	}
}
