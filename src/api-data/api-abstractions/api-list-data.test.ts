import MockAPIListData from "./__mock__/api-list-data";

describe("APIListData", () => {
	it("instantiates", () => {
		expect(new MockAPIListData([1, 2, 3])).toBeInstanceOf(MockAPIListData);
	});
	it("throws error on incorrect information", () => {
		expect(() => {
			return new MockAPIListData({ id: 1 });
		}).toThrowErrorMatchingSnapshot();
	});
	it("throws error on incorrect information in array", () => {
		expect(() => {
			return new MockAPIListData([1, 2, 3, "fail"]);
		}).toThrowErrorMatchingSnapshot();
	});
	it("throws error on no information", () => {
		expect(() => {
			return new MockAPIListData({});
		}).toThrowErrorMatchingSnapshot();
	});
});
