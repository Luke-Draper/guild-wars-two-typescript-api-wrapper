import Mail from './mail'
/**
 * Mail test
 */
describe('Mail test', () => {
	test('Mail is instantiable', () => {
		expect(new Mail()).toBeInstanceOf(Mail)
	})
})
