import KeyValueInterface from "../key-value-interface";
import IAPINode from "../iapi-node";
import IAPIList from "../iapi-list";
import IAPIElement from "../iapi-element";

export class APIGetter {
	static mockRequestData: object = { test_request: "test_request" };

	static readonly MAX_PAGE_SIZE = 5;

	static defaultParameters: KeyValueInterface = {
		access_token: "mock_token",
		lang: "en"
	};

	static setAccessTokenParam(APIKey: string): string {
		return APIGetter.defaultParameters.access_token;
	}

	static setLangParam(langID: string): string {
		return APIGetter.defaultParameters.lang;
	}

	static getRequest(
		url: string,
		parameters: KeyValueInterface = {}
	): Promise<object> {
		console.log("getRequest");
		return Promise.resolve({ data: { test_request: "test_request" } });
	}

	static setupParameters(
		node: IAPINode,
		inputParameters: KeyValueInterface = {}
	): KeyValueInterface {
		return inputParameters;
	}

	static getFromNode(
		node: IAPINode,
		inputParameters: KeyValueInterface = {}
	): Promise<object> {
		console.log("getFromNode");
		return Promise.resolve({ test_request: "test_request" });
	}

	static getAllFromList<
		ElementType extends IAPIElement,
		ListType extends IAPIList
	>(
		list: ListType,
		elementSetup: (
			parentNode: ListType,
			rawData: object
		) => Promise<ElementType>,
		inputParameters: KeyValueInterface = {}
	): Promise<Array<ElementType>> {
		let output = new Array<Promise<ElementType>>();
		for (let i = 0; i < 5; i++) {
			output.push(elementSetup(list, { test_request: "test_request" }));
		}
		return Promise.all(output);
	}

	static getAllFromListWithAll(
		list: IAPIList,
		inputParameters: KeyValueInterface = {}
	): Promise<Array<object>> {
		let output = new Array<Promise<object>>();
		for (let i = 0; i < 5; i++) {
			output.push(Promise.resolve({ test_request: "test_request" }));
		}
		return Promise.all(output);
	}

	static getAllFromListWithPagination(
		list: IAPIList,
		inputParameters: KeyValueInterface = {}
	): Promise<Array<object>> {
		let output = new Array<Promise<object>>();
		for (let i = 0; i < 5; i++) {
			output.push(Promise.resolve({ test_request: "test_request" }));
		}
		return Promise.all(output);
	}
}
