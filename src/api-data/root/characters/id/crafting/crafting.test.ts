import Crafting from './crafting'
/**
 * Crafting test
 */
describe('Crafting test', () => {
	test('Crafting is instantiable', () => {
		expect(new Crafting()).toBeInstanceOf(Crafting)
	})
})
