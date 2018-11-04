import BaseAPIEndpoint from "./base-api-endpoint";
import { APIDataInterface, APINodeInterface } from "./api-data-interface";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("APIEndpoint", () => {
	let mockAdapter: MockAdapter;
	class MockAPIData extends APIDataInterface {
		setupDataStructure(): APIDataInterface {
			return this;
		}
	}
	class MockAPINode extends APINodeInterface {
		setupDataStructure(): APINodeInterface {
			return this;
		}
	}
	const mockRoot = new MockAPINode("https://api.guildwars2.com/v2", {});

	beforeEach(() => {
		mockAdapter = new MockAdapter(axios);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: {}
			})
			.reply(200, { location: "test_endpoint" });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: { paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "test_endpoint_with_params" });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: { access_token: "test_token", paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "test_endpoint_with_authorization" });
	});

	it("instantiates", () => {
		expect(
			new BaseAPIEndpoint<MockAPIData>(
				"/test",
				false,
				false,
				(parent: MockAPINode, pathExtension: string, rawData: object) => {
					return new MockAPIData(parent, pathExtension, rawData);
				},
				mockRoot
			)
		).toBeInstanceOf(BaseAPIEndpoint);
	});
	it("instantiates with authentication", () => {
		expect(
			new BaseAPIEndpoint<MockAPIData>(
				"/test",
				false,
				true,
				(parent: MockAPINode, pathExtension: string, rawData: object) => {
					return new MockAPIData(parent, pathExtension, rawData);
				},
				mockRoot,
				{ access_token: "test_token" }
			)
		).toBeInstanceOf(BaseAPIEndpoint);
	});
	it("doesn't instantiate authenticated endpoint without authentication", () => {
		expect(() => {
			let test = new BaseAPIEndpoint<MockAPIData>(
				"/test",
				false,
				true,
				(parent: MockAPINode, pathExtension: string, rawData: object) => {
					return new MockAPIData(parent, pathExtension, rawData);
				},
				mockRoot,
				{ not_access_token: "test_token" }
			);
		}).toThrowErrorMatchingSnapshot();
	});

	it("allows data promise to be gotten", () => {
		expect.assertions(1);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			true,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot
		);
		return mock.getDataPromise().then(data => {
			expect(data).toBeInstanceOf(MockAPIData);
		});
	});

	it("sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			false,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot
		);
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint"
			});
		});
	});
	it("sends a request to the proper endpoint with paramaters", () => {
		expect.assertions(2);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			false,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot,
			{ paramaters: [1, 2, 3] }
		);
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint_with_params"
			});
		});
	});
	it("sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			false,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot,
			{
				access_token: "test_token",
				paramaters: [1, 2, 3]
			}
		);
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint_with_authorization"
			});
		});
	});

	it("sets up without sending a request", () => {
		expect.assertions(2);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			false,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot
		);
		return mock.setupData(false).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.rawData).toEqual({});
		});
	});

	it("sets up and sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			false,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot
		);
		return mock.setupData(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.rawData).toEqual({
				location: "test_endpoint"
			});
		});
	});
	it("sets up and sends a request to the proper endpoint with paramaters", () => {
		expect.assertions(2);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			false,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot,
			{ paramaters: [1, 2, 3] }
		);
		return mock.setupData(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.rawData).toEqual({
				location: "test_endpoint_with_params"
			});
		});
	});
	it("sets up and sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new BaseAPIEndpoint<MockAPIData>(
			"/test",
			false,
			false,
			(parent: MockAPINode, pathExtension: string, rawData: object) => {
				return new MockAPIData(parent, pathExtension, rawData);
			},
			mockRoot,
			{
				access_token: "test_token",
				paramaters: [1, 2, 3]
			}
		);
		return mock.setupData(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.rawData).toEqual({
				location: "test_endpoint_with_authorization"
			});
		});
	});
});
