import APIGetter from "./api-getter";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

/**
 * APIGetter test
 */
describe("APIGetter test", () => {
	let mockAdapter: MockAdapter;
	beforeEach(() => {
		mockAdapter = new MockAdapter(axios);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2", {
				params: {}
			})
			.reply(200, { location: "api_root_endpoint" });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2", {
				params: { paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "api_root_endpoint_with_params" });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/list", {
				params: {}
			})
			.reply(200, { location: "api_list_endpoint" });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/list", {
				params: { paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "api_list_endpoint_with_params" });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/list/1", {
				params: {}
			})
			.reply(200, { location: "api_id_endpoint" });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/list/1", {
				params: { paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "api_id_endpoint_with_params" });
	});
	test("APIGetter getRequest", () => {
		expect.assertions(2);
		return APIGetter.getRequest().then(response => {
			expect(response).not.toEqual(undefined);
			expect(response.data).toEqual({
				location: "api_root_endpoint"
			});
		});
	});
	test("APIGetter getRequest with parameters", () => {
		expect.assertions(2);
		return APIGetter.getRequest(APIGetter.defaultRoot, {
			paramaters: [1, 2, 3]
		}).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response.data).toEqual({
				location: "api_root_endpoint_with_params"
			});
		});
	});
	test("APIGetter getRequestPathFromRoot /list", () => {
		expect.assertions(2);
		return APIGetter.getRequestPathFromRoot("/list").then(response => {
			expect(response).not.toEqual(undefined);
			expect(response.data).toEqual({
				location: "api_list_endpoint"
			});
		});
	});
	test("APIGetter getRequestPathFromRoot /list with parameters", () => {
		expect.assertions(2);
		return APIGetter.getRequestPathFromRoot("/list", {
			paramaters: [1, 2, 3]
		}).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response.data).toEqual({
				location: "api_list_endpoint_with_params"
			});
		});
	});
	test("APIGetter getRequestPathFromRoot /list/id", () => {
		expect.assertions(2);
		return APIGetter.getRequestPathFromRoot("/list/1").then(response => {
			expect(response).not.toEqual(undefined);
			expect(response.data).toEqual({
				location: "api_id_endpoint"
			});
		});
	});
	test("APIGetter getRequestPathFromRoot /list/id with parameters", () => {
		expect.assertions(2);
		return APIGetter.getRequestPathFromRoot("/list/1", {
			paramaters: [1, 2, 3]
		}).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response.data).toEqual({
				location: "api_id_endpoint_with_params"
			});
		});
	});
});
