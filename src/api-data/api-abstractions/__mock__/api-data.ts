import APIData from "../api-data";

export default class MockAPIData extends APIData {
	parseData(rawData: object): MockAPIData {
		this.rawData = rawData;
		return this;
	}
	constructor(rawData: object) {
		super(rawData);
	}
}
