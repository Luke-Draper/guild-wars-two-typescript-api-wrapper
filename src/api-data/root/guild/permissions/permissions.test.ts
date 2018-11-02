import Permissions from './permissions'
/**
 * Permissions test
 */
describe('Permissions test', () => {
	test('Permissions is instantiable', () => {
		expect(new Permissions()).toBeInstanceOf(Permissions)
	})
})
