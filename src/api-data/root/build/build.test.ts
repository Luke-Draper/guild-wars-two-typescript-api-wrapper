import Build from './build'
/**
 * Build test
 */
describe('Build test', () => {
	test('Build is instantiable', () => {
		expect(new Build()).toBeInstanceOf(Build)
	})
})
