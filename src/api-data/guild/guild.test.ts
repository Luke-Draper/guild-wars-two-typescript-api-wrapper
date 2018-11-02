import Guild from './guild'
/**
 * Guild test
 */
describe('Guild test', () => {
	test('Guild is instantiable', () => {
		expect(new Guild()).toBeInstanceOf(Guild)
	})
})
