import Log from './log'
/**
 * Log test
 */
describe('Log test', () => {
	test('Log is instantiable', () => {
		expect(new Log()).toBeInstanceOf(Log)
	})
})
