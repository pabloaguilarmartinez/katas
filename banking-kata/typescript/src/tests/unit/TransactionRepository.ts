import { TransactionRepository } from '../../core/TransactionRepository';
import { Transaction } from '../../core/Transaction';
import { Clock } from '../../core/Clock';

describe('The Transaction Repository', () => {
	it('stores a deposit transaction for a given amount', () => {
		const today = '25/03/2022';
		const clock = new Clock();
		clock.todayAsString = () => today;
		const amount = 100;
		const repository = new TransactionRepository(clock);

		repository.addDeposit(amount);

		const transactions = repository.allTransactions();
		expect(transactions[0]).toBe(new Transaction(today, amount));
	});
});
