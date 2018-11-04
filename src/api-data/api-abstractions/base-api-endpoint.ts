/**
 * BaseAPIEndpoint Abstract Superclass
 * @fileOverview<br><br>
 * This (functionally) Abstract Superclass describes all endpoints of the Guild Wars 2 API and provides default functionality for them
 *
 * @author Luke Draper
 *
 * @requires ../../async/api-getter
 * @requires ./key-val-interface
 * @requires ./api-data-interface
 */
import APIGetter from "../../async/api-getter";
import KeyValueInterface from "./key-val-interface";
import { APIDataInterface, APINodeInterface } from "./api-data-interface";

export default class BaseAPIEndpoint<Data extends APIDataInterface> {
	/**
	 * The path to this endpoint from root (<a>https://api.guildwars2.com/v2</a>)<br>
	 * @example <br><br>
	 * "<a>https://api.guildwars2.com/v2/items/257</a>" is accessed with<br>
	 * <em>pathExtension</em> = "/items/257"<br>
	 * Leading '/' is required
	 */
	pathExtension: string;
	/**
	 * Whether this endpoint sends a get request to the API or uses the input raw data
	 */
	sendRequest: boolean;
	/**
	 * Whether this endpoint requires authentication
	 */
	isAuthenticated: boolean;

	dataConstructor: (
		pathExtension: string,
		rawData: object,
		parent?: APINodeInterface
	) => Data;
	parent?: APINodeInterface;
	/**
	 * The paramaters to access this endpoint from pathExtension<br>
	 * @example <br><br>
	 * "<a>https://api.guildwars2.com/v2/items?ids=1,2,3</a>" is accessed with<br>
	 * <em>pathExtension</em> = "/items"<br>
	 * <em>params</em> = { ids: [1, 2, 3] }<br>
	 */
	params: KeyValueInterface;
	/**
	 * The raw JSON data accessed at this endpoint from pathExtension<br>
	 */
	rawData: object;
	/**
	 * The parsed JSON data accessed at this endpoint from pathExtension<br>
	 */
	dataPromise: Promise<Data>;
	/**
	 * Construct an API Endpoint
	 * @param pathExtension
	 * assigned to this.pathExtension
	 *
	 * @param params
	 * assigned to this.pathExtension
	 * @param rawData
	 * assigned to this.rawData<br>
	 * overwritten by this.requestEndpoint() and this.setupEndpoint(true)
	 * @throws Error("Unable to access authenticated endpoint without an access token")<br>
	 * If attempting to access an authenticated endpoint without authentication
	 */
	constructor(
		pathExtension: string,
		sendRequest: boolean,
		isAuthenticated: boolean,
		dataConstructor: (
			pathExtension: string,
			rawData: object,
			parent?: APINodeInterface
		) => Data,
		params: KeyValueInterface = {},
		rawData: object = {},
		parent?: APINodeInterface
	) {
		this.sendRequest = sendRequest;
		this.pathExtension = pathExtension;
		this.isAuthenticated = isAuthenticated;
		this.dataConstructor = dataConstructor;
		this.parent = parent;
		this.params = params;
		if (this.isAuthenticated && !("access_token" in this.params)) {
			throw new Error(
				"Unable to access authenticated endpoint without an access token"
			);
		}
		this.rawData = rawData;
		this.dataPromise = this.setupData(this.sendRequest);
	}
	/**
	 * @return this.dataPromise
	 */
	getDataPromise(): Promise<Data> {
		return this.dataPromise;
	}
	/**
	 * Parse the rawData object and run any setup code required.<br>
	 * This function uses the this.dataConstructor callback to format the data
	 * @param request
	 * if true then run this.requestEndpoint()
	 * @return
	 * The Promise of the request which makes setupEndpoint().then(()=>{}) syntax possible. Used in constructor
	 */
	setupData(request: boolean): Promise<Data> {
		return (request
			? this.requestEndpoint()
			: new Promise((resolve, reject) => {
					resolve(this.rawData);
			  })
		).then(data => {
			return this.dataConstructor(this.pathExtension, data);
		});
	}
	/**
	 * Request the raw data from pathExtension using params and set its response equal to this.rawData<br>
	 * If an error occurs then the promise is returned without altering this.rawData
	 * @return
	 * The Promise of the request which makes requestEndpoint().then(()=>{}) syntax possible
	 */
	requestEndpoint(): Promise<object> {
		return APIGetter.getRequestPathFromRoot(
			this.pathExtension,
			this.params
		).then(response => {
			return response.data;
		});
	}
}
