import Characters from './characters'
/**
 * Characters test
 */
describe('Characters test', () => {
	test('Characters is instantiable', () => {
		expect(new Characters()).toBeInstanceOf(Characters)
	})
})
