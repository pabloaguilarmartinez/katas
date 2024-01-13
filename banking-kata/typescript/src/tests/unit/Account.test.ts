import { Account } from '../../core/Account';
import { TransactionRepository } from '../../core/TransactionRepository';

describe('The account', () => {
	const repository = new TransactionRepository();
	const account = new Account(repository);
	const addDepositSpy = jest.spyOn(repository, 'addDeposit');
	it('stores a deposit transaction throughout the repository', () => {
		account.deposit(100);

		expect(addDepositSpy).toHaveBeenCalledWith(100);
	});
});
