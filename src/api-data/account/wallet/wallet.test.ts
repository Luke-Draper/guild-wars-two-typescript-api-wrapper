import Wallet from './wallet'
/**
 * Wallet test
 */
describe('Wallet test', () => {
	test('Wallet is instantiable', () => {
		expect(new Wallet()).toBeInstanceOf(Wallet)
	})
})
