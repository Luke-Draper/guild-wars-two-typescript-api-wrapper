import APIListData from "../api-list-data";
import MockAPIElementData from "./api-element-data";

export default class MockAPIListData extends APIListData<MockAPIElementData> {
	constructor(rawData: object) {
		super(rawData);
	}
}
