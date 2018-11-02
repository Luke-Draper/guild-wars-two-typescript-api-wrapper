import Materials from './materials'
/**
 * Materials test
 */
describe('Materials test', () => {
	test('Materials is instantiable', () => {
		expect(new Materials()).toBeInstanceOf(Materials)
	})
})
