import { isAPIChild } from "./iapi-child";
import IAPINode from "./iapi-node";
import getDefaultIAPIChild, {
	getMockIAPIChild
} from "./__mock__/iapi-child-testing";
import KeyValueInterface from "./key-value-interface";
import APIGetter from "./api-getter";
jest.mock("./api-getter");

APIGetter.getFromNode = jest.fn().mockImplementation(
	(
		node: IAPINode,
		inputParameters: KeyValueInterface = {}
	): Promise<object> => {
		return Promise.resolve({ test_request: "test_request" });
	}
);

describe("IAPIChild default functionality test", () => {
	it("getDefaultIAPIChild() initializes correctly", () => {
		expect(isAPIChild(getDefaultIAPIChild())).toBe(true);
	});
	it("getMockIAPINode() initializes correctly", () => {
		expect.assertions(2);
		let testMock = getMockIAPIChild({ pathBaseName: "test_name" });
		expect(isAPIChild(testMock)).toBe(true);
		expect(testMock.pathBaseName).toEqual("test_name");
	});
	it("getDefaultIAPIChild().getFullPath() returns correctly", () => {
		expect(getDefaultIAPIChild().getFullPath()).toEqual(
			"mockPathBaseName/mockPathBaseName"
		);
	});
	it("getDefaultIAPIChild().setupData(false,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIChild();
		return setupDataTest.setupData(false, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIChild().setupData(true,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIChild();
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIChild().setupData(true,false) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIChild();
		if (setupDataTest.children !== undefined) {
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
		}
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIChild().setupData(false,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIChild();
		return setupDataTest.setupData(false, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIChild().setupData(true,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIChild();
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIChild().setupData(true,true) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIChild();
		if (setupDataTest.children !== undefined) {
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
		}
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
});
