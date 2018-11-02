import Bank from './bank'
/**
 * Bank test
 */
describe('Bank test', () => {
	test('Bank is instantiable', () => {
		expect(new Bank()).toBeInstanceOf(Bank)
	})
})
