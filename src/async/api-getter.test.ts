import APIGetter from './api-getter'

/**
 * APIGetter test
 */
describe('APIGetter test', () => {
	test('APIGetter getRequest', () => {
		expect.assertions(1)
		return APIGetter.getRequest().then(response =>
			expect(response).not.toBe(undefined)
		)
	})
})
