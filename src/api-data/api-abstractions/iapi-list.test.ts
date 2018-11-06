import IAPIList, { isAPIList } from "./iapi-list";
import IAPINode from "./iapi-node";
import IAPIElement, { isAPIElement } from "./iapi-element";
import getDefaultIAPIList, {
	getMockIAPIList
} from "./__mock__/iapi-list-testing";
import getDefaultIAPIElement from "./__mock__/iapi-element-testing";
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

APIGetter.getAllFromList = jest.fn().mockImplementation(
	(
		list: IAPIList,
		elementSetup: (
			parentNode: IAPIList,
			rawData: object
		) => Promise<IAPIElement>,
		inputParameters: KeyValueInterface = {}
	): Promise<Array<IAPIElement>> => {
		return Promise.all([
			Promise.resolve(getDefaultIAPIElement()),
			Promise.resolve(getDefaultIAPIElement()),
			Promise.resolve(getDefaultIAPIElement())
		]);
	}
);

describe("IAPIList default functionality test", () => {
	it("getDefaultIAPIList() initializes correctly", () => {
		expect(isAPIList(getDefaultIAPIList())).toBe(true);
	});
	it("getMockIAPIList() initializes correctly", () => {
		expect.assertions(3);
		let testMock = getMockIAPIList({
			pathBaseName: "test_name",
			data: { name: "test_name" }
		});
		expect(isAPIList(testMock)).toBe(true);
		expect(testMock.pathBaseName).toEqual("test_name");
		expect((testMock.data as any).name).toEqual("test_name");
	});
	it("getElementByID() returns correctly", () => {
		let mockTest = getMockIAPIList();
		mockTest.elements = [getDefaultIAPIElement()];
		expect(isAPIElement(mockTest.getElementById(1))).toEqual(true);
	});
	it("getElementByName() returns correctly", () => {
		let mockTest = getMockIAPIList();
		mockTest.elements = [getDefaultIAPIElement()];
		expect(isAPIElement(mockTest.getElementByName("test"))).toEqual(true);
	});
	it("getDefaultIAPIList().getFullPath() returns correctly", () => {
		expect(getDefaultIAPIList().getFullPath()).toEqual("mockPathBaseName");
	});
	it("getDefaultIAPIList().setupData(false,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
		return setupDataTest.setupData(false, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIList().setupData(true,false) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIList().setupData(true,false) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
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
	it("getDefaultIAPIList().setupData(true,false) returns correctly with recursion and elements", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
		if (setupDataTest.children !== undefined) {
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
		}
		setupDataTest.elements = [
			getDefaultIAPIElement(),
			getDefaultIAPIElement(),
			getDefaultIAPIElement()
		];
		setupDataTest.ids.push(1, 2, 3);
		return setupDataTest.setupData(true, false).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ test_request: "test_request" });
		});
	});
	it("getDefaultIAPIList().setupData(false,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
		return setupDataTest.setupData(false, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIList().setupData(true,true) returns correctly", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
	it("getDefaultIAPIList().setupData(true,true) returns correctly with recursion", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
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
	it("getDefaultIAPIList().setupData(true,true) returns correctly with recursion and elements", () => {
		expect.assertions(2);
		let setupDataTest = getDefaultIAPIList();
		if (setupDataTest.children !== undefined) {
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
			setupDataTest.children.push(getDefaultIAPIChild());
		}
		setupDataTest.elements = [
			getDefaultIAPIElement(),
			getDefaultIAPIElement(),
			getDefaultIAPIElement()
		];
		setupDataTest.ids.push(1, 2, 3);
		return setupDataTest.setupData(true, true).then(result => {
			expect(result).toEqual(setupDataTest);
			expect(setupDataTest.data).toEqual({ default_data: "default_data" });
		});
	});
});
