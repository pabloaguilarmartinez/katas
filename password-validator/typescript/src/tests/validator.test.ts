/* Examples to test
1234abcdABCD_ => true
1aA_ => false - length <= 6
abcdABCD_ ⇒ false - does not contain number
1234ABCD_ ⇒ false - does not contain lowercase
1234abcd_ ⇒ false - does not contain uppercase
1234abcdABCD ⇒ false - does not contain underscore
*/
import { isStrongPassword } from '../core/validator';

describe('The Password Validator', () => {
	it('considers a password to be strong when all requirements are met', () => {
		expect(isStrongPassword('1234abcdABCD_')).toBeTruthy();
	});

	it('fails when the password is too short', () => {
		expect(isStrongPassword('1aA_')).toBeFalsy();
	});

    it('fails when the password does not contain a number', () => {
        expect(isStrongPassword('abcdABCD_')).toBeFalsy();
    });

	it('fails when the password does not contain a lowercase', () => {
		expect(isStrongPassword('1234ABCD_')).toBeFalsy();
	});

	it('fails when the password does not contain an uppercase', () => {
		expect(isStrongPassword('1234abcd_')).toBeFalsy();
	});

	it('fails when the password does not contain underscore', () => {
		expect(isStrongPassword('1234abcdABCD')).toBeFalsy();
	});
});
