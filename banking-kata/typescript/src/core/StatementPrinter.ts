import { Transaction } from './Transaction';
import { Console } from './Console';

export class StatementPrinter {
	constructor(private readonly console: Console) {}

	private readonly header = 'Date | Amount | Balance';

	print(transactions: Transaction[]): void {
		this.console.log(this.header);
	}
}
