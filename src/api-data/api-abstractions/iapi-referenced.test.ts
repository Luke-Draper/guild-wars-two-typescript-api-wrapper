import IAPINode from "./iapi-node";
import { isAPIReferenced } from "./iapi-referenced";
import getDefaultIAPIReferenced, {
	getMockIAPIReferenced
} from "./__mock__/iapi-referenced-testing";
import getDefaultIAPIReferencing from "./__mock__/iapi-referencing-testing";
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

describe("IAPIReferenced default functionality test", () => {
	it("getDefaultIAPIReferenced() initializes correctly", () => {
		expect(isAPIReferenced(getDefaultIAPIReferenced())).toBe(true);
	});
	it("getMockIAPIReferenced() initializes correctly", () => {
		expect.assertions(2);
		let testMock = getMockIAPIReferenced({ pathBaseName: "test_name" });
		expect(isAPIReferenced(testMock)).toBe(true);
		expect(testMock.pathBaseName).toEqual("test_name");
	});
	it("getDefaultIAPIReferenced().getFullPath() returns correctly", () => {
		expect(getDefaultIAPIReferenced().getFullPath()).toEqual(
			"mockPathBaseName"
		);
	});
	it("getDefaultIAPIReferenced().addReferenceFrom() returns correctly", () => {
		expect(
			isAPIReferenced(
				getDefaultIAPIReferenced().addReferenceFrom(getDefaultIAPIReferencing())
			)
		).toBe(true);
	});
	it("getDefaultIAPIReferenced().addReferenceFrom() returns correctly with extra", () => {
		let mock = getDefaultIAPIReferenced();
		let mockFrom = getDefaultIAPIReferencing();
		mock.addReferenceFrom(mockFrom);
		expect(isAPIReferenced(mock.addReferenceFrom(mockFrom))).toBe(true);
	});
	it("getDefaultIAPIReferenced().setupData(false,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferenced();
		return setupDataTest.setupData(false, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIReferenced().setupData(true,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferenced();
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIReferenced().setupData(true,false) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferenced();
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
	it("getDefaultIAPIReferenced().setupData(false,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferenced();
		return setupDataTest.setupData(false, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIReferenced().setupData(true,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferenced();
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIReferenced().setupData(true,true) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferenced();
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
