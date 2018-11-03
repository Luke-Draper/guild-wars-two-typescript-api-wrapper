import MockAPIElementData from "./api-element-data";
import APIElementEndpoint from "../api-element-endpoint";

export default class MockAPIElementEndpoint extends APIElementEndpoint<
	MockAPIElementData
> {
	parseEndpointData(data: object): MockAPIElementData {
		let apiData: MockAPIElementData = new MockAPIElementData(data);
		if (apiData.id !== this.id) {
			throw new Error(
				"Invalid Data input to APIElementEndpoint parseEndpointData"
			);
		}
		return apiData;
	}
	constructor(
		pathFromRoot: string,
		id: number,
		isAuthenticated: boolean,
		params: object = {},
		data: object = {}
	) {
		super(pathFromRoot, id, isAuthenticated, params, data);
	}
}
