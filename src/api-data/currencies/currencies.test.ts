import Currencies from './currencies'
/**
 * Currencies test
 */
describe('Currencies test', () => {
	test('Currencies is instantiable', () => {
		expect(new Currencies()).toBeInstanceOf(Currencies)
	})
})
