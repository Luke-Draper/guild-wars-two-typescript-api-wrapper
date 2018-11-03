/**
 * APIElementEndpoint Abstract Superclass
 * @fileOverview<br><br>
 * This Abstract Superclass describes all endpoints of the Guild Wars 2 API that contain an id from a list in the parent endpoint and provides default functionality for them
 *
 * @author Luke Draper
 *
 * @requires ./api-endpoint
 * @requires ./api-element-data
 * @requires ./param-interface
 */
import APIEndpoint from "./api-endpoint";
import APIElementData from "./api-element-data";
import ParamInterface from "./param-interface";

export default abstract class APIElementEndpoint<
	T extends APIElementData
> extends APIEndpoint<T> {
	id: number;
	/**
	 * Construct an APIElementEndpoint
	 * @param pathFromRoot
	 * assigned to this.pathFromRoot<br>
	 * Does not include the trailing id number<br>
	 * @example <br><br>
	 * pathFromRoot = /test<br>
	 * id = 2<br>
	 * The actual extension becomes /test/2
	 * @param id
	 * assigned to this.id
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
		id: number,
		isAuthenticated: boolean,
		params: ParamInterface = {},
		rawData: object = {}
	) {
		super(pathFromRoot + "/" + id.toString(), isAuthenticated, params, rawData);
		this.id = id;
	}
	/**
	 * This function is called in setupEndpoint and takes raw json from this.rawData<br>
	 * creates an object that implements APIElementData which parses the data
	 * @param data
	 * Raw JSON. setupEndpoint uses this.data
	 */
	abstract parseEndpointData(data: object): T;
}
