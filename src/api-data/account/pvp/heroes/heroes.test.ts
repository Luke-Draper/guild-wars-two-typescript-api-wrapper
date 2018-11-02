import Heroes from './heroes'
/**
 * Heroes test
 */
describe('Heroes test', () => {
	test('Heroes is instantiable', () => {
		expect(new Heroes()).toBeInstanceOf(Heroes)
	})
})
