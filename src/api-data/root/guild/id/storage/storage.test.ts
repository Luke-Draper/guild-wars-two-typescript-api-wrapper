import Storage from './storage'
/**
 * Storage test
 */
describe('Storage test', () => {
	test('Storage is instantiable', () => {
		expect(new Storage()).toBeInstanceOf(Storage)
	})
})
