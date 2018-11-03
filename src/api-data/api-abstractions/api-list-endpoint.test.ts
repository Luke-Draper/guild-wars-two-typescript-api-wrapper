import MockAPIListEndpoint from "./__mock__/api-list-endpoint";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("APIListEndpoint", () => {
	let mockAdapter: MockAdapter;

	beforeEach(() => {
		mockAdapter = new MockAdapter(axios);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: {}
			})
			.reply(200, [1, 2, 3]);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: { access_token: "test_token" }
			})
			.reply(200, [1, 2, 3]);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: { ids: "all", access_token: "test_token" }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: { ids: "all" }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: { page: 0, page_size: 200, access_token: "test_token" }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
		mockAdapter
			.onGet("https://api.guildwars2.com/v2/test", {
				params: { page: 0, page_size: 200 }
			})
			.reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
	});

	it("instantiates", () => {
		expect(new MockAPIListEndpoint(true, "/test", false)).toBeInstanceOf(
			MockAPIListEndpoint
		);
	});
	it("instantiates with authentication", () => {
		expect(
			new MockAPIListEndpoint(true, "/test", true, {
				access_token: "test_token"
			})
		).toBeInstanceOf(MockAPIListEndpoint);
	});
	it("doesn't instantiate authenticated endpoint without authentication", () => {
		expect(() => {
			let mock = new MockAPIListEndpoint(true, "/test", true);
		}).toThrowErrorMatchingSnapshot();
	});

	it("sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new MockAPIListEndpoint(true, "/test", false);
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual([1, 2, 3]);
		});
	});
	it("sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new MockAPIListEndpoint(true, "/test", true, {
			access_token: "test_token"
		});
		return mock.requestEndpoint().then(result => {
			expect(result).not.toEqual(undefined);
			expect(result).toEqual([1, 2, 3]);
		});
	});
	it("Error on set up without sending a request or proper rawData", () => {
		expect.assertions(1);
		let mock = new MockAPIListEndpoint(true, "/test", false);
		expect(() => {
			return mock.setupEndpoint(false);
		}).toThrowErrorMatchingSnapshot();
	});
	it("set up without sending a request and proper rawData", () => {
		expect.assertions(1);
		let mock = new MockAPIListEndpoint(true, "/test", false, {}, [1, 2, 3]);
		expect(() => {
			return mock.setupEndpoint(false);
		}).not.toThrowError();
	});
	it("Error on set up without recieving proper id from request", () => {
		expect.assertions(1);
		let mock = new MockAPIListEndpoint(true, "/test", false);
		expect(() => {
			return mock.setupEndpoint(false);
		}).toThrowErrorMatchingSnapshot();
	});

	it("sets up and sends a request to the proper endpoint", () => {
		expect.assertions(2);
		let mock = new MockAPIListEndpoint(true, "/test", false);
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.rawData as any).toEqual([1, 2, 3]);
		});
	});
	it("sets up and sends a request to the proper endpoint with authorization", () => {
		expect.assertions(2);
		let mock = new MockAPIListEndpoint(true, "/test", true, {
			access_token: "test_token"
		});
		return mock.setupEndpoint(true).then(result => {
			expect(result).not.toEqual(undefined);
			expect(result.rawData as any).toEqual([1, 2, 3]);
		});
	});
});
