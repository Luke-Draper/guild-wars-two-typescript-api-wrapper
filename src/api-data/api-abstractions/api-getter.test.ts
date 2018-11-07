import APIGetter from "./api-getter";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import KeyValueInterface from "./key-value-interface";
import getDefaultIAPINode, {
	getMockIAPINode
} from "./__mock__/iapi-node-testing";
import { getMockIAPIList } from "./__mock__/iapi-list-testing";
import getDefaultIAPIElement from "./__mock__/iapi-element-testing";
import IAPIList from "./iapi-list";
import IAPIElement from "./iapi-element";
import IAPINode from "./iapi-node";

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
				params: { paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "default_endpoint_with_params" });
		mockAdapter
			.onGet("mockPathBaseName", {
				params: { lang: "test" }
			})
			.reply(200, { location: "default_endpoint_with_lang" });
		mockAdapter
			.onGet("mockPathBaseName", {
				params: { ids: "all" }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
		mockAdapter
			.onGet("mockPathBaseName", {
				params: { page_size: 200, page: 0 }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
		mockAdapter
			.onGet("mockPathBaseName", {
				params: { page_size: 200, page: 1 }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
		mockAdapter
			.onGet("mockPathBaseName", {
				params: { page_size: 200, page: 2 }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
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
		return APIGetter.getFromNode(getDefaultIAPINode(), {}).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response).toEqual({
				location: "default_endpoint"
			});
		});
	});
	it("getFromNode disabled", () => {
		expect.assertions(1);
		try {
			return APIGetter.getFromNode(getMockIAPINode({ isDisabled: true }), {});
		} catch (error) {
			expect(error).toMatchSnapshot();
		}
	});
	it("getFromNode authenticated without token", () => {
		expect.assertions(1);
		try {
			return APIGetter.getFromNode(
				getMockIAPINode({ isAuthenticated: true }),
				{}
			);
		} catch (error) {
			expect(error).toMatchSnapshot();
		}
	});
	it("getFromNode authenticated with token", () => {
		expect.assertions(2);
		APIGetter.setAccessTokenParam("test_token");
		return APIGetter.getFromNode(
			getMockIAPINode({ isAuthenticated: true }),
			{}
		).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response).toEqual({
				location: "default_auth_endpoint"
			});
		});
	});
	it("getFromNode localized", () => {
		expect.assertions(2);
		APIGetter.setLangParam("test");
		return APIGetter.getFromNode(
			getMockIAPINode({ isLocalized: true }),
			{}
		).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response).toEqual({
				location: "default_endpoint_with_lang"
			});
		});
	});
	it("getFromNode with params", () => {
		expect.assertions(2);
		APIGetter.setLangParam("test");
		return APIGetter.getFromNode(getMockIAPINode(), {
			paramaters: [1, 2, 3]
		}).then(response => {
			expect(response).not.toEqual(undefined);
			expect(response).toEqual({
				location: "default_endpoint_with_params"
			});
		});
	});

	it("getFromList with all", () => {
		expect.assertions(3);
		let testList = getMockIAPIList({
			idsGetWithAllAvailable: true,
			ids: [1, 2, 3]
		});
		return APIGetter.getAllFromList(
			testList,
			(parentNode: IAPIList, rawData: object): Promise<IAPIElement> => {
				return Promise.resolve(getDefaultIAPIElement());
			},
			{}
		).then(response => {
			console.log(response);
			expect((response[0] as any).data).toEqual({
				default_data: "default_data"
			});
			expect((response[1] as any).data).toEqual({
				default_data: "default_data"
			});
			expect((response[1] as any).data).toEqual({
				default_data: "default_data"
			});
		});
	});
	it("getFromList with pagination", () => {
		expect.assertions(3);
		let testList = getMockIAPIList({
			idsGetWithAllAvailable: false,
			ids: [1, 2, 3]
		});
		return APIGetter.getAllFromList(
			testList,
			(parentNode: IAPIList, rawData: object): Promise<IAPIElement> => {
				return Promise.resolve(getDefaultIAPIElement());
			},
			{}
		).then(response => {
			console.log(response);
			expect((response[0] as any).data).toEqual({
				default_data: "default_data"
			});
			expect((response[1] as any).data).toEqual({
				default_data: "default_data"
			});
			expect((response[2] as any).data).toEqual({
				default_data: "default_data"
			});
		});
	});

	it("getFromList with multipage pagination", () => {
		expect.assertions(3);
		let idsArray = new Array<number>();
		for (let i = 1; i < 500; i++) {
			idsArray.push(i);
		}
		let testList = getMockIAPIList({
			idsGetWithAllAvailable: false,
			ids: idsArray
		});
		return APIGetter.getAllFromList(
			testList,
			(parentNode: IAPIList, rawData: object): Promise<IAPIElement> => {
				return Promise.resolve(getDefaultIAPIElement());
			},
			{}
		).then(response => {
			console.log(response);
			expect((response[0] as any).data).toEqual({
				default_data: "default_data"
			});
			expect((response[5] as any).data).toEqual({
				default_data: "default_data"
			});
			expect((response[8] as any).data).toEqual({
				default_data: "default_data"
			});
		});
	});
});
