import { isAPIElement } from "./iapi-element";
import IAPINode from "./iapi-node";
import getDefaultIAPIElement, {
	getMockIAPIElement
} from "./__mock__/iapi-element-testing";
import getDefaultIAPIChild from "./__mock__/iapi-child-testing";
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

describe("IAPIElement default functionality test", () => {
	it("getDefaultIAPIElement() initializes correctly", () => {
		expect(isAPIElement(getDefaultIAPIElement())).toBe(true);
	});
	it("getMockIAPINode() initializes correctly", () => {
		expect.assertions(2);
		let testMock = getMockIAPIElement({ pathBaseName: "test_name" });
		expect(isAPIElement(testMock)).toBe(true);
		expect(testMock.pathBaseName).toEqual("test_name");
	});
	it("getDefaultIAPIElement().getFullPath() returns correctly", () => {
		expect(getDefaultIAPIElement().getFullPath()).toEqual(
			"mockPathBaseName/mockPathBaseName"
		);
	});
	it("getDefaultIAPIElement().setupData(false,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIElement();
		return setupDataTest.setupData(false, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIElement().setupData(true,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIElement();
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIElement().setupData(true,false) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIElement();
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
	it("getDefaultIAPIElement().setupData(false,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIElement();
		return setupDataTest.setupData(false, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIElement().setupData(true,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIElement();
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIElement().setupData(true,true) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIElement();
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
