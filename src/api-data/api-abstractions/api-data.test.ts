import MockAPIData from "./__mock__/api-data";

describe("APIData", () => {
	it("instantiates", () => {
		expect(new MockAPIData({})).toBeInstanceOf(MockAPIData);
	});
	it("parseData returns correctly", () => {
		let mock = new MockAPIData({});
		expect(mock.parseData({})).toBeInstanceOf(MockAPIData);
	});
});
