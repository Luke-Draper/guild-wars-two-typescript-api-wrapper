import Commerce from './commerce'
/**
 * Commerce test
 */
describe('Commerce test', () => {
	test('Commerce is instantiable', () => {
		expect(new Commerce()).toBeInstanceOf(Commerce)
	})
})
