/**
 * APIElementEndpoint Abstract Superclass
 * @fileOverview<br><br>
 * This Abstract Superclass describes all endpoints of the Guild Wars 2 API that contain an id from a list in the parent endpoint and provides default functionality for them
 *
 * @author Luke Draper
 *
 * @requires ./api-endpoint
 * @requires ./api-element-endpoint
 * @requires ./api-list-data
 * @requires ./api-element-data
 * @requires ../../async/api-getter
 * @requires ./param-interface
 */
import APIEndpoint from "./api-endpoint";
import APIElementEndpoint from "./api-element-endpoint";
import APIListData from "./api-list-data";
import APIElementData from "./api-element-data";
import APIGetter from "../../async/api-getter";
import ParamInterface from "./param-interface";

export default abstract class APIListEndpoint<
	T extends APIListData<V>,
	U extends APIElementEndpoint<V>,
	V extends APIElementData
> extends APIEndpoint<T> {
	/**
	 * Set to true if param ids:all is available at this endpoint.<br>
	 * If not then pagination requests are used
	 */
	allAvailable: boolean;
	/**
	 * The full list of IDs as obtained from this endpoint
	 */
	ids: Array<number>;
	/**
	 * The full list Element Endpoints as defined by the ids Array
	 */
	elementEndpoints: Array<U>;
	/**
	 * Construct an APIListEndpoint
	 * @param allAvailable
	 * assigned to this.allAvailable
	 * @param pathFromRoot
	 * assigned to this.pathFromRoot
	 * @param isAuthenticated
	 * assigned to this.isAuthenticated
	 * @param params
	 * assigned to this.params
	 * @param rawData
	 * assigned to this.data<br>
	 * overwritten by this.requestEndpoint() and this.setupEndpoint(true)
	 * @throws <br><br>
	 * Error("Unable to access authenticated endpoint without an access token")<br>
	 * If attempting to access an authenticated endpoint without authentication
	 */
	constructor(
		allAvailable: boolean,
		pathFromRoot: string,
		isAuthenticated: boolean,
		params: ParamInterface = {},
		rawData: object = {}
	) {
		super(pathFromRoot, isAuthenticated, params, rawData);
		this.allAvailable = allAvailable;
		this.ids = new Array<number>();
		this.elementEndpoints = new Array<U>();
	}
	/**
	 * This function is called in setupEndpoint and takes raw json from this.rawData<br>
	 * creates an object that implements APIListData which parses the data
	 * @param data
	 * Raw JSON. setupEndpoint uses this.data
	 */
	abstract parseEndpointData(data: object): T;
	/**
	 * This function uses the this.ids to setup the full list of element endpoints and data with the minimum number of get requests.<br>
	 * If neither allAvailable or paginationAvailable then it fails.
	 * @param createAPIElementEndpointGeneric
	 * A function that takes an id and raw data object and creates a class that
	 * extends APIElementEndpoint without triggering a callback
	 */
	setupAllElementEndpoints(
		createAPIElementEndpointGeneric: (rawData: object, id: number) => U
	): Promise<Array<U>> {
		return new Promise((resolve, reject) => {
			let data = Array<object>();
			if (this.allAvailable) {
				this.getAllElementDataWithAll()
					.then(result => {
						data = result;
					})
					.then(() => {
						resolve(data);
					});
			} else {
				this.getAllElementDataWithAll()
					.then(result => {
						data = result;
					})
					.then(() => {
						resolve(data);
					});
			}
		}).then(result => {
			let elements = new Array<U>();
			(result as any).forEach((elementData: object) => {
				elements.push(
					createAPIElementEndpointGeneric(elementData, (elementData as any).id)
				);
			});
			return elements;
		});
	}
	/**
	 * This function gets all the elements using ids=all
	 */
	getAllElementDataWithAll(): Promise<Array<object>> {
		let tempParams: ParamInterface = {
			ids: "all"
		};
		if (this.isAuthenticated && typeof this.params.access_token === "string") {
			tempParams.access_token = this.params.access_token;
		}
		return APIGetter.getRequestPathFromRoot(this.pathFromRoot, tempParams)
			.then(response => {
				let result = response.data;
				if (result instanceof Array) {
					let valid = true;
					for (let i = 0; i < result.length; i++) {
						if (typeof result[i] !== "object") {
							valid = false;
							break;
						}
					}
					if (valid) {
						return result;
					} else {
						return new Array<object>();
					}
				} else {
					return new Array<object>();
				}
			})
			.catch(error => {
				console.error(error);
				return new Array<object>();
			});
	}
	/**
	 * This function gets all the elements using page=[0-i]&page_size=200 (max)
	 */
	getAllElementDataWithPagination(): Promise<Array<object>> {
		let promises = new Array<Promise<Array<Array<object>>>>();
		for (let i = 0; i < this.ids.length / 200; i++) {
			let tempParams: ParamInterface = {
				page: i,
				page_size: 200
			};
			if (
				this.isAuthenticated &&
				typeof this.params.access_token === "string"
			) {
				tempParams.access_token = this.params.access_token;
			}
			promises.push(
				APIGetter.getRequestPathFromRoot(this.pathFromRoot, tempParams)
					.then(response => {
						return response.data;
					})
					.catch(error => {
						console.error(error);
						return {};
					})
			);
		}
		return Promise.all(promises).then(result => {
			let valid = true;
			if (result instanceof Array) {
				for (let i = 0; i < result.length; i++) {
					if (result[i] instanceof Array) {
						for (let j = 0; j < result[i].length; j++) {
							if (typeof result[i] !== "object") {
								valid = false;
								break;
							}
						}
					} else {
						valid = false;
					}
				}
			} else {
				valid = false;
			}
			if (valid) {
				let merged = [].concat.apply([], result);
				return merged;
			} else {
				return new Array<object>();
			}
		});
	}
}
