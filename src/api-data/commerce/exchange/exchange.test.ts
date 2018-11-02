import Exchange from './exchange'
/**
 * Exchange test
 */
describe('Exchange test', () => {
	test('Exchange is instantiable', () => {
		expect(new Exchange()).toBeInstanceOf(Exchange)
	})
})
