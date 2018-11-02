import Cats from './cats'
/**
 * Cats test
 */
describe('Cats test', () => {
	test('Cats is instantiable', () => {
		expect(new Cats()).toBeInstanceOf(Cats)
	})
})
