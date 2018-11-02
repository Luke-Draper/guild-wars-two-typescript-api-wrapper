import Core from './core'
/**
 * Core test
 */
describe('Core test', () => {
	test('Core is instantiable', () => {
		expect(new Core()).toBeInstanceOf(Core)
	})
})
