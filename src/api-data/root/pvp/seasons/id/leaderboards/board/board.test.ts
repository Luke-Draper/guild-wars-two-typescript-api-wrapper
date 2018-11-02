import Board from './board'
/**
 * Board test
 */
describe('Board test', () => {
	test('Board is instantiable', () => {
		expect(new Board()).toBeInstanceOf(Board)
	})
})
