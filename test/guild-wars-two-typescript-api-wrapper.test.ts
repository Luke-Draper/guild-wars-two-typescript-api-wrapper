import DummyClass from '../src/guild-wars-two-typescript-api-wrapper'

/**
 * Dummy test
 */
describe('Dummy test', () => {
	it('works if true is truthy', () => {
		expect(true).toBeTruthy()
	})

	it('DummyClass is instantiable', () => {
		expect(new DummyClass()).toBeInstanceOf(DummyClass)
	})
})
