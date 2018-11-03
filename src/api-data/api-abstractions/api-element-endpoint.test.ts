import MockAPIElementEndpoint from "./__mock__/api-element-endpoint";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("APIElementEndpoint", () => {
	let mockAdapter: MockAdapter;

	beforeEach(() => {
		mockAdapter = new MockAdapter(axios);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test/1", {
				params: {}
			})
			.reply(200, { location: "valid_id_test_endpoint", id: 1 });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test/0", {
				params: {}
			})
			.reply(200, { location: "valid_id_test_endpoint", id: 1 });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test/1", {
				params: { paramaters: [1, 2, 3] }
			})
			.reply(200, { location: "valid_id_test_endpoint_with_params", id: 1 });
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test/1", {
				params: { access_token: "test_token", paramaters: [1, 2, 3] }
			})
			.reply(200, {
				location: "valid_id_test_endpoint_with_authorization",
				id: 1
			});
	});

	it("instantiates", () => {
		expect(new MockAPIElementEndpoint("/test", 1, false)).toBeInstanceOf(
			MockAPIElementEndpoint
		);
	});
	it("instantiates with authentication", () => {
		expect(
			new MockAPIElementEndpoint("/test", 1, true, {
				access_token: "test_token"
			})
		).toBeInstanceOf(MockAPIElementEndpoint);
	});
	it("doesn't instantiate authenticated endpoint without authentication", () => {
		expect(() => {
			let mock = new MockAPIElementEndpoint("/test", 1, true);
		}).toThrowErrorMatchingSnapshot();
	});

	it("sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new MockAPIElementEndpoint("/test", 1, false);
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect((result as any).location).toEqual("valid_id_test_endpoint");
		});
	});
	it("sends a request to the proper endpoint with paramaters", () => {
		expect.assertions(2);
		let mock = new MockAPIElementEndpoint("/test", 1, false, {
			paramaters: [1, 2, 3]
		});
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect((result as any).location).toEqual(
				"valid_id_test_endpoint_with_params"
			);
		});
	});
	it("sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new MockAPIElementEndpoint("/test", 1, true, {
			access_token: "test_token",
			paramaters: [1, 2, 3]
		});
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect((result as any).location).toEqual(
				"valid_id_test_endpoint_with_authorization"
			);
		});
	});

	it("Error on set up without sending a request or proper rawData", () => {
		expect.assertions(1);
		let mock = new MockAPIElementEndpoint("/test", 1, false);
		expect(() => {
			return mock.setupEndpoint(false);
		}).toThrowErrorMatchingSnapshot();
	});
	it("set up without sending a request and proper rawData", () => {
		expect.assertions(1);
		let mock = new MockAPIElementEndpoint("/test", 1, false, {}, { id: 1 });
		expect(() => {
			return mock.setupEndpoint(false);
		}).not.toThrowError();
	});
	it("Error on set up without recieving proper id from request", () => {
		expect.assertions(1);
		let mock = new MockAPIElementEndpoint("/test", 0, false);
		expect(() => {
			return mock.setupEndpoint(false);
		}).toThrowErrorMatchingSnapshot();
	});

	it("sets up and sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new MockAPIElementEndpoint("/test", 1, false);
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect((result.rawData as any).location).toEqual(
				"valid_id_test_endpoint"
			);
		});
	});
	it("sets up and sends a request to the proper endpoint with paramaters", () => {
		expect.assertions(2);
		let mock = new MockAPIElementEndpoint("/test", 1, false, {
			paramaters: [1, 2, 3]
		});
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect((result.rawData as any).location).toEqual(
				"valid_id_test_endpoint_with_params"
			);
		});
	});
	it("sets up and sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new MockAPIElementEndpoint("/test", 1, true, {
			access_token: "test_token",
			paramaters: [1, 2, 3]
		});
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect((result.rawData as any).location).toEqual(
				"valid_id_test_endpoint_with_authorization"
			);
		});
	});
});
