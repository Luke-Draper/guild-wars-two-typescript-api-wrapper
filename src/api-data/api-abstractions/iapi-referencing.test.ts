import IAPINode from "./iapi-node";
import { isAPIReferencing } from "./iapi-referencing";
import getDefaultIAPIReferencing, {
	getMockIAPIReferencing
} from "./__mock__/iapi-referencing-testing";
import getDefaultIAPIReferenced from "./__mock__/iapi-referenced-testing";
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

describe("IAPIReferencing default functionality test", () => {
	it("getDefaultIAPIReferencing() initializes correctly", () => {
		expect(isAPIReferencing(getDefaultIAPIReferencing())).toBe(true);
	});
	it("getMockIAPIReferencing() initializes correctly", () => {
		expect.assertions(2);
		let testMock = getMockIAPIReferencing({ pathBaseName: "test_name" });
		expect(isAPIReferencing(testMock)).toBe(true);
		expect(testMock.pathBaseName).toEqual("test_name");
	});
	it("getDefaultIAPIReferencing().getFullPath() returns correctly", () => {
		expect(getDefaultIAPIReferencing().getFullPath()).toEqual(
			"mockPathBaseName"
		);
	});
	it("getDefaultIAPIReferencing().addReferenceTo() returns correctly", () => {
		expect(
			isAPIReferencing(
				getDefaultIAPIReferencing().addReferenceTo(getDefaultIAPIReferenced())
			)
		).toBe(true);
	});
	it("getDefaultIAPIReferencing().addReferenceFrom() returns correctly with extra", () => {
		let mock = getDefaultIAPIReferencing();
		let mockTo = getDefaultIAPIReferenced();
		mock.addReferenceTo(mockTo);
		expect(isAPIReferencing(mock.addReferenceTo(mockTo))).toBe(true);
	});
	it("getDefaultIAPIReferencing().setupData(false,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferencing();
		return setupDataTest.setupData(false, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIReferencing().setupData(true,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferencing();
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIReferencing().setupData(true,false) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferencing();
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
	it("getDefaultIAPIReferencing().setupData(false,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferencing();
		return setupDataTest.setupData(false, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIReferencing().setupData(true,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferencing();
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIReferencing().setupData(true,true) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIReferencing();
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
