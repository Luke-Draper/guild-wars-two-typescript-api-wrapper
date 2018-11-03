import MockAPIElementData from "./__mock__/api-element-data";

describe("APIElementData", () => {
	it("instantiates", () => {
		expect(new MockAPIElementData({ id: 1 })).toBeInstanceOf(
			MockAPIElementData
		);
	});
	it("throws error on incorrect information", () => {
		expect(() => {
			return new MockAPIElementData({ id: "fail" });
		}).toThrowErrorMatchingSnapshot();
	});
	it("throws error on no information", () => {
		expect(() => {
			return new MockAPIElementData({});
		}).toThrowErrorMatchingSnapshot();
	});
});
