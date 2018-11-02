import Equipment from './equipment'
/**
 * Equipment test
 */
describe('Equipment test', () => {
	test('Equipment is instantiable', () => {
		expect(new Equipment()).toBeInstanceOf(Equipment)
	})
})
