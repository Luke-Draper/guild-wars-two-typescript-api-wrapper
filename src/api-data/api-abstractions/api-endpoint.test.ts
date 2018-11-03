import MockAPIEndpoint from "./__mock__/api-endpoint";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("APIEndpoint", () => {
	let mockAdapter: MockAdapter;

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
		expect(new MockAPIEndpoint("/test", false)).toBeInstanceOf(MockAPIEndpoint);
	});
	it("instantiates with authentication", () => {
		expect(
			new MockAPIEndpoint("/test", true, {
				access_token: "test_token"
			})
		).toBeInstanceOf(MockAPIEndpoint);
	});
	it("doesn't instantiate authenticated endpoint without authentication", () => {
		expect(() => {
			let mock = new MockAPIEndpoint("/test", true);
		}).toThrowErrorMatchingSnapshot();
	});

	it("sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", false);
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint"
			});
		});
	});
	it("sends a request to the proper endpoint with paramaters", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", false, { paramaters: [1, 2, 3] });
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint_with_params"
			});
		});
	});
	it("sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", true, {
			access_token: "test_token",
			paramaters: [1, 2, 3]
		});
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint_with_authorization"
			});
		});
	});

	it("sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", false);
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint"
			});
		});
	});
	it("sends a request to the proper endpoint with paramaters", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", false, { paramaters: [1, 2, 3] });
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint_with_params"
			});
		});
	});
	it("sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", true, {
			access_token: "test_token",
			paramaters: [1, 2, 3]
		});
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual({
				location: "test_endpoint_with_authorization"
			});
		});
	});

	it("sets up without sending a request", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", false);
		return mock.setupEndpoint(false).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.data).toEqual({});
		});
	});

	it("sets up and sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", false);
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.data).toEqual({
				location: "test_endpoint"
			});
		});
	});
	it("sets up and sends a request to the proper endpoint with paramaters", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", false, { paramaters: [1, 2, 3] });
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.data).toEqual({
				location: "test_endpoint_with_params"
			});
		});
	});
	it("sets up and sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new MockAPIEndpoint("/test", true, {
			access_token: "test_token",
			paramaters: [1, 2, 3]
		});
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.data).toEqual({
				location: "test_endpoint_with_authorization"
			});
		});
	});
});
