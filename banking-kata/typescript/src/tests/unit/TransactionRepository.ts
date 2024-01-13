import { TransactionRepository } from '../../core/TransactionRepository';
import { Transaction } from '../../core/Transaction';
import { Clock } from '../../core/Clock';

describe('The Transaction Repository', () => {
	const today = '25/03/2022';
	const clock = new Clock();
	clock.todayAsString = () => today;
	const repository = new TransactionRepository(clock);

	it('stores a deposit transaction for a given amount', () => {
		const amount = 100;

		repository.addDeposit(amount);

		const transactions = repository.allTransactions();
		expect(transactions[0]).toBe(new Transaction(today, amount));
	});
});
