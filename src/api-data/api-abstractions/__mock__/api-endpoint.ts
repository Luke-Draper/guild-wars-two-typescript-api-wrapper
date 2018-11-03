import APIData from "../api-data";
import APIEndpoint from "../api-endpoint";

export default class MockAPIEndpoint extends APIEndpoint {
	parseEndpointData(data: object): APIData {
		let apiData: APIData = {
			data: data,
			parseData: function(data: object): APIData {
				this.data = data;
				return this;
			}
		};
		return apiData;
	}
	constructor(
		pathFromRoot: string,
		isAuthenticated: boolean,
		params: object = {},
		data: object = {}
	) {
		super(pathFromRoot, isAuthenticated, params, data);
	}
}
