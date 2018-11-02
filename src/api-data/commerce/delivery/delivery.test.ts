import Delivery from './delivery'
/**
 * Delivery test
 */
describe('Delivery test', () => {
	test('Delivery is instantiable', () => {
		expect(new Delivery()).toBeInstanceOf(Delivery)
	})
})
