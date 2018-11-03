import MockAPIData from "./__mock__/api-data";

describe("APIData", () => {
	it("instantiates", () => {
		expect(new MockAPIData({})).toBeInstanceOf(MockAPIData);
	});
});
