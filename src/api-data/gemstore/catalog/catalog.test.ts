import Catalog from './catalog'
/**
 * Catalog test
 */
describe('Catalog test', () => {
	test('Catalog is instantiable', () => {
		expect(new Catalog()).toBeInstanceOf(Catalog)
	})
})
