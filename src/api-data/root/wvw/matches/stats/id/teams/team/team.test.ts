import Team from './team'
/**
 * Team test
 */
describe('Team test', () => {
	test('Team is instantiable', () => {
		expect(new Team()).toBeInstanceOf(Team)
	})
})
