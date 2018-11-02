import APIGetter from './api-getter'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

/**
 * APIGetter test
 */
describe('APIGetter test', () => {
	test('APIGetter getRequest', () => {
		// Setup
		const mock = new MockAdapter(axios)
		mock
			.onGet('https://api.guildwars2.com/v2/')
			.reply(200, { location: 'api_root_endpoint' })
		// Tests
		expect.assertions(2)
		return APIGetter.getRequest().then(response => {
			expect(response).not.toEqual(undefined)
			expect(response.data).toEqual({ location: 'api_root_endpoint' })
		})
	})
})
