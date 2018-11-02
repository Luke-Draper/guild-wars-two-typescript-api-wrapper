import Games from './games'
/**
 * Games test
 */
describe('Games test', () => {
	test('Games is instantiable', () => {
		expect(new Games()).toBeInstanceOf(Games)
	})
})
