import axios from "axios";
import KeyValueInterface from "./key-value-interface";
import IAPINode from "./iapi-node";
import IAPIList from "./iapi-list";
import IAPIElement from "./iapi-element";

export default class APIGetter {
	/**
	 * The max page size for paginated list endpoints. Defined API wide.
	 */
	static readonly MAX_PAGE_SIZE = 200;
	/**
	 * The parameters used to access multiple endpoints. access_token and lang are currently the only two in use
	 */
	static defaultParameters: KeyValueInterface = {};
	static accessTokenSet: boolean = false;
	static langSet: boolean = false;
	/**
	 * set the access token used to access authenticated endpoints
	 * @param APIKey the value to set as access_token
	 */
	static setAccessTokenParam(APIKey: string): string {
		APIGetter.defaultParameters.access_token = APIKey;
		APIGetter.accessTokenSet = true;
		return APIGetter.defaultParameters.access_token;
	}
	/**
	 * set the language code used to access localized endpoints in a different language
	 * @param langID the value to set as lang
	 */
	static setLangParam(langID: string): string {
		APIGetter.defaultParameters.lang = langID;
		APIGetter.langSet = true;
		return APIGetter.defaultParameters.lang;
	}
	/**
	 * Send a get request for resources from a url
	 * @param url The url to request
	 * @param parameters The parameters to request with
	 */
	static getRequest(
		url: string,
		parameters: KeyValueInterface = {}
	): Promise<object> {
		return axios.get(url, { params: parameters }).then(response => {
			return response;
		});
	}
	/**
	 * Helper function that adds parameters to a set of base parameters based on the endpoint flags
	 * @param node The node to set up parameters for
	 * @param inputParameters The base parameter object to add to
	 */
	static setupParameters(
		node: IAPINode,
		inputParameters: KeyValueInterface = {}
	): KeyValueInterface {
		let params = inputParameters;
		if (node.isDisabled) {
			throw new Error(
				`Attempting to access a disabled endpoint "${node}" without authentication in APIGetter.setupParameters`
			);
		}
		if (node.isAuthenticated) {
			if (APIGetter.accessTokenSet) {
				params.access_token = APIGetter.defaultParameters.access_token;
			} else {
				throw new Error(
					`Attempting to access an authenticated endpoint "${node}" without authentication in APIGetter.setupParameters`
				);
			}
		}
		if (node.isLocalized && APIGetter.langSet) {
			params.lang = APIGetter.defaultParameters.lang;
		}
		return params;
	}
	/**
	 * Send a get request for the data of an endpoint
	 * @param node The node to get data for
	 * @param inputParameters The base parameters to access the node with
	 */
	static getFromNode(
		node: IAPINode,
		inputParameters: KeyValueInterface = {}
	): Promise<object> {
		let fullPath = node.getFullPath();
		let params = APIGetter.setupParameters(node, inputParameters);
		return APIGetter.getRequest(fullPath, params).then(response => {
			let output = response;
			if (typeof (response as any).data === "object") {
				output = (response as any).data;
			}
			return output;
		});
	}
	/**
	 * Gets and sets up all element nodes of a list node that has been setup
	 * @param list The list node to get all elements of
	 * @param elementSetup A constructor and setup function
	 * @param inputParameters The base parameters to access the element nodes with
	 */
	static getAllFromList(
		list: IAPIList,
		elementSetup: (
			parentNode: IAPIList,
			rawData: object
		) => Promise<IAPIElement>,
		inputParameters: KeyValueInterface = {}
	): Promise<Array<IAPIElement>> {
		let outPromise = undefined;
		if (list.idsGetWithAllAvailable) {
			inputParameters.ids = "all";
			outPromise = APIGetter.getAllFromListWithPagination(
				list,
				inputParameters
			);
		} else {
			inputParameters.page_size = APIGetter.MAX_PAGE_SIZE;
			inputParameters.page = 0;
			outPromise = APIGetter.getAllFromListWithPagination(
				list,
				inputParameters
			);
		}
		return outPromise.then(array => {
			let output = new Array<Promise<IAPIElement>>();
			array.forEach(elementData => {
				output.push(elementSetup(list, elementData));
			});
			return Promise.all(output);
		});
	}
	/**
	 * Gets all data for element nodes of a list node using ids=all
	 * @param list The list node to get all elements of
	 * @param inputParameters The base parameters to access the element nodes with
	 */
	static getAllFromListWithAll(
		list: IAPIList,
		inputParameters: KeyValueInterface = {}
	): Promise<Array<object>> {
		return new Promise(() => {
			return APIGetter.getFromNode(list, inputParameters);
		});
	}
	/**
	 * Gets all data for element nodes of a list node using page=n and page_size=APIGetter.MAX_PAGE_SIZE
	 * @param list The list node to get all elements of
	 * @param inputParameters The base parameters to access the element nodes with
	 */
	static getAllFromListWithPagination(
		list: IAPIList,
		inputParameters: KeyValueInterface = {}
	): Promise<Array<object>> {
		let promises = new Array<Promise<Array<object>>>();
		for (
			let i = 0;
			i < Math.ceil(list.ids.length / APIGetter.MAX_PAGE_SIZE);
			i++
		) {
			inputParameters.page = i;
			promises.push(APIGetter.getFromNode(list, inputParameters) as Promise<
				Array<object>
			>);
		}
		return Promise.all(promises).then(arrays => {
			let output = new Array<object>();
			for (let j = 0; j < arrays.length; j++) {
				output.concat(arrays[j]);
			}
			return output;
		});
	}
}
