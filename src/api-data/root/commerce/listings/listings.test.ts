import Listings from './listings'
/**
 * Listings test
 */
describe('Listings test', () => {
	test('Listings is instantiable', () => {
		expect(new Listings()).toBeInstanceOf(Listings)
	})
})
