import Account from './account'
/**
 * Account test
 */
describe('Account test', () => {
	test('Account is instantiable', () => {
		expect(new Account()).toBeInstanceOf(Account)
	})
})
