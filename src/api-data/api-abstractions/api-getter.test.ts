import APIGetter from "./api-getter";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import KeyValueInterface from "./key-value-interface";
import getDefaultIAPINode, {
	getMockIAPINode
} from "./__mock__/iapi-node-testing";

/**
 * APIGetter test
 */
describe("APIGetter test", () => {
	let root = "https://api.guildwars2.com/v2";
	let mockAdapter: MockAdapter;
	beforeEach(() => {
		APIGetter.defaultParameters = {};
		APIGetter.accessTokenSet = false;
		APIGetter.langSet = false;
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
			.onGet("mockPathBaseName", {
				params: {}
			})
			.reply(200, { location: "default_endpoint" });
		mockAdapter
			.onGet("mockPathBaseName", {
				params: { access_token: "test_token" }
			})
			.reply(200, { location: "default_auth_endpoint" });
		mockAdapter
			.onGet("mockPathBaseName", {
				params: { lang: "test", paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "default_endpoint_with_params" });
	});
	it("setAccessTokenParam", () => {
		APIGetter.setAccessTokenParam("test_token");
		expect(APIGetter.defaultParameters.access_token).toEqual("test_token");
	});
	it("setLangParam", () => {
		APIGetter.setLangParam("test");
		expect(APIGetter.defaultParameters.lang).toEqual("test");
	});
	it("getRequest", () => {
		expect.assertions(2);
		return APIGetter.getRequest(root).then(response => {
			expect(response).not.toEqual(undefined);
			expect((response as KeyValueInterface).data).toEqual({
				location: "api_root_endpoint"
			});
		});
	});
	it("getRequest with parameters", () => {
		expect.assertions(2);
		return APIGetter.getRequest(root, {
			paramaters: [1, 2, 3]
		}).then(response => {
			expect(response).not.toEqual(undefined);
			expect((response as KeyValueInterface).data).toEqual({
				location: "api_root_endpoint_with_params"
			});
		});
	});
	it("getFromNode", () => {
		expect.assertions(2);
		return APIGetter.getFromNode(getDefaultIAPINode()).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response).toEqual({
				location: "default_endpoint"
			});
		});
	});
	it("getFromNode disabled", () => {
		expect.assertions(1);
		try {
			return APIGetter.getFromNode(getMockIAPINode({ isDisabled: true }));
		} catch (error) {
			expect(error).toMatchSnapshot();
		}
	});
	it("getFromNode authenticated without token", () => {
		expect.assertions(1);
		try {
			return APIGetter.getFromNode(getMockIAPINode({ isAuthenticated: true }));
		} catch (error) {
			expect(error).toMatchSnapshot();
		}
	});
	it("getFromNode authenticated with token", () => {
		expect.assertions(2);
		APIGetter.setAccessTokenParam("test_token");
		return APIGetter.getFromNode(
			getMockIAPINode({ isAuthenticated: true })
		).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response).toEqual({
				location: "default_auth_endpoint"
			});
		});
	});
	it("getFromNode localized with params", () => {
		expect.assertions(2);
		APIGetter.setLangParam("test");
		return APIGetter.getFromNode(getMockIAPINode({ isLocalized: true }), {
			paramaters: [1, 2, 3]
		}).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response).toEqual({
				location: "default_endpoint_with_params"
			});
		});
	});
});
