/**
 * APIEndpoint Abstract Superclass
 * @fileOverview<br><br>
 * This Abstract Superclass describes all endpoints of the Guild Wars 2 API and provides default functionality for them
 *
 * @author Luke Draper
 *
 * @requires ../../async/api-getter
 * @requires ./api-data
 */
import APIGetter from "../../async/api-getter";
import APIData from "./api-data";

export default abstract class APIEndpoint<T extends APIData> {
	/**
	 * The path to this endpoint from root (<a>https://api.guildwars2.com/v2</a>)<br>
	 * @example <br><br>
	 * "<a>https://api.guildwars2.com/v2/items/257</a>" is accessed with<br>
	 * <em>pathFromRoot</em> = "/items/257"<br>
	 * Leading '/' is required
	 */
	pathFromRoot: string;
	/**
	 * Whether this endpoint requires authentication
	 */
	isAuthenticated: boolean;
	/**
	 * The paramaters to access this endpoint from pathFromRoot<br>
	 * @example <br><br>
	 * "<a>https://api.guildwars2.com/v2/items?ids=1,2,3</a>" is accessed with<br>
	 * <em>pathFromRoot</em> = "/items"<br>
	 * <em>params</em> = { ids: [1, 2, 3] }<br>
	 */
	params: object;
	/**
	 * The raw JSON data accessed at this endpoint from pathFromRoot<br>
	 */
	rawData: object;
	/**
	 * parsedDataComplete is false until parsedData has completed parsing<br>
	 * If false then parsedData is undefined
	 */
	parsedDataComplete: boolean;
	/**
	 * The parsed JSON data accessed at this endpoint from pathFromRoot<br>
	 */
	parsedData: T | undefined;
	/**
	 * Construct an API Endpoint
	 * @param pathFromRoot
	 * assigned to this.pathFromRoot
	 * @param params
	 * assigned to this.pathFromRoot
	 * @param rawData
	 * assigned to this.data<br>
	 * overwritten by this.requestEndpoint() and this.setupEndpoint(true)
	 * @throws Error("Unable to access authenticated endpoint without an access token")<br>
	 * If attempting to access an authenticated endpoint without authentication
	 */
	constructor(
		pathFromRoot: string,
		isAuthenticated: boolean,
		params: object = {},
		rawData: object = {}
	) {
		this.pathFromRoot = pathFromRoot;
		this.isAuthenticated = isAuthenticated;
		this.params = params;
		if (this.isAuthenticated && !("access_token" in this.params)) {
			throw new Error(
				"Unable to access authenticated endpoint without an access token"
			);
		}
		this.rawData = rawData;
		this.parsedData = undefined;
		this.parsedDataComplete = false;
	}
	/**
	 * This function is called in setupEndpoint and takes raw json from this.data<br>
	 * creates an object that implements APIData which parses the data
	 * @param data
	 * Raw JSON. setupEndpoint uses this.data
	 */
	abstract parseEndpointData(data: object): T;
	/**
	 * Request the data from pathFromRoot using params and set its response equal to data<br>
	 * If an error occurs then the promise is returned without altering the data
	 * @return
	 * The Promise of the request which makes requestEndpoint().then(()=>{}) syntax possible
	 */
	requestEndpoint(): Promise<object> {
		return APIGetter.getRequestPathFromRoot(this.pathFromRoot, this.params)
			.then(response => {
				this.rawData = response.data;
				return response.data;
			})
			.catch(error => {
				console.error(error);
				return {};
			});
	}
	/**
	 * Parse the data object and run any setup code required
	 * @param request
	 * if true then run this.requestEndpoint()
	 * @return
	 * The Promise of the request which makes setupEndpoint().then(()=>{}) syntax possible. Used in constructor
	 */
	setupEndpoint(request: boolean): Promise<T> {
		if (request) {
			return this.requestEndpoint().then(data => {
				this.parsedDataComplete = true;
				this.parsedData = this.parseEndpointData(this.rawData);
				return this.parsedData;
			});
		} else {
			this.parsedDataComplete = true;
			this.parsedData = this.parseEndpointData(this.rawData);
			return new Promise((resolve, reject) => {
				resolve(this.parsedData);
			});
		}
	}
}
