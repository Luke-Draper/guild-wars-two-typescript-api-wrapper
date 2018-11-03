import MockAPIData from "./api-data";
import APIEndpoint from "../api-endpoint";

export default class MockAPIEndpoint extends APIEndpoint<MockAPIData> {
	parseEndpointData(data: object): MockAPIData {
		let apiData: MockAPIData = new MockAPIData(data);
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
