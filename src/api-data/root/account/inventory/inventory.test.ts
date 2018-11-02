import Inventory from './inventory'
/**
 * Inventory test
 */
describe('Inventory test', () => {
	test('Inventory is instantiable', () => {
		expect(new Inventory()).toBeInstanceOf(Inventory)
	})
})
