import Items from './items'
/**
 * Items test
 */
describe('Items test', () => {
	test('Items is instantiable', () => {
		expect(new Items()).toBeInstanceOf(Items)
	})
})
