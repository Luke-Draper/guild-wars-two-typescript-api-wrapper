import IAPINode, { isAPINode } from "./iapi-node";
import getDefaultIAPINode, {
	getMockIAPINode
} from "./__mock__/iapi-node-testing";
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

describe("IAPINode default functionality test", () => {
	it("getDefaultIAPINode() initializes correctly", () => {
		expect(isAPINode(getDefaultIAPINode())).toBe(true);
	});
	it("getMockIAPINode() initializes correctly", () => {
		expect.assertions(2);
		let testMock = getMockIAPINode({ pathBaseName: "test_name" });
		expect(isAPINode(testMock)).toBe(true);
		expect(testMock.pathBaseName).toEqual("test_name");
	});
	it("getDefaultIAPINode().getFullPath() returns correctly", () => {
		expect(getDefaultIAPINode().getFullPath()).toEqual("mockPathBaseName");
	});
	it("getDefaultIAPINode().setupData(false,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPINode();
		return setupDataTest.setupData(false, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPINode().setupData(true,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPINode();
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPINode().setupData(true,false) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPINode();
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
	it("getDefaultIAPINode().setupData(false,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPINode();
		return setupDataTest.setupData(false, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPINode().setupData(true,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPINode();
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPINode().setupData(true,true) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPINode();
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
