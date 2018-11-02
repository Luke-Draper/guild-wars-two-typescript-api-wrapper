import Transactions from './transactions'
/**
 * Transactions test
 */
describe('Transactions test', () => {
	test('Transactions is instantiable', () => {
		expect(new Transactions()).toBeInstanceOf(Transactions)
	})
})
