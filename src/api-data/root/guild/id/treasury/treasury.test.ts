import Treasury from './treasury'
/**
 * Treasury test
 */
describe('Treasury test', () => {
	test('Treasury is instantiable', () => {
		expect(new Treasury()).toBeInstanceOf(Treasury)
	})
})
