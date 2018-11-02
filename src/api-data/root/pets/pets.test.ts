import Pets from './pets'
/**
 * Pets test
 */
describe('Pets test', () => {
	test('Pets is instantiable', () => {
		expect(new Pets()).toBeInstanceOf(Pets)
	})
})
