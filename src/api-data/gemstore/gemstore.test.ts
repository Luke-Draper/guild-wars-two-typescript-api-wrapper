import Gemstore from './gemstore'
/**
 * Gemstore test
 */
describe('Gemstore test', () => {
	test('Gemstore is instantiable', () => {
		expect(new Gemstore()).toBeInstanceOf(Gemstore)
	})
})
