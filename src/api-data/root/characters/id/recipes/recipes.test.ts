import Recipes from './recipes'
/**
 * Recipes test
 */
describe('Recipes test', () => {
	test('Recipes is instantiable', () => {
		expect(new Recipes()).toBeInstanceOf(Recipes)
	})
})
