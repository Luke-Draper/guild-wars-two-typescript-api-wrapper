import MockAPIListData from "./api-list-data";
import MockAPIElementData from "./api-element-data";
import MockAPIElementEndpoint from "./api-element-endpoint";
import APIListEndpoint from "../api-list-endpoint";

export default class MockAPIListEndpoint extends APIListEndpoint<
	MockAPIListData,
	MockAPIElementEndpoint,
	MockAPIElementData
> {
	parseEndpointData(data: object): MockAPIListData {
		let apiData: MockAPIListData = new MockAPIListData(data);
		this.ids = apiData.ids;
		return apiData;
	}
	constructor(
		allAvailable: boolean,
		pathFromRoot: string,
		isAuthenticated: boolean,
		params: object = {},
		data: object = {}
	) {
		super(allAvailable, pathFromRoot, isAuthenticated, params, data);
	}
}
