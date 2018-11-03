/**
 * APIElementData Abstract Superclass
 * @fileOverview<br><br>
 * This Abstract Superclass describes all data from endpoints of the Guild Wars 2 API that contain an id from a list in the parent endpoint
 *
 * @author Luke Draper
 *
 * @requires ./api-data
 */
import APIData from "./api-data";

/**
 * Used to ensure that the input RawData has the required data values
 */
function HasAPIElementData(input: any): boolean {
	let output = true;
	if (!("id" in input)) {
		output = false;
	} else {
		if (typeof input.id !== "number") {
			output = false;
		}
	}
	return output;
}

export default abstract class APIElementData extends APIData {
	/**
	 * The ID number of this API endpoint's data
	 */
	id: number;
	/**
	 * Constructor for APIElementData
	 * @param rawData The raw data from the API endpoint.<br>
	 * Assigned to this.rawData.<br>
	 * requires rawData.id of type number to exist or else throws an error.
	 */
	constructor(rawData: object) {
		super(rawData);
		if (!HasAPIElementData(this.rawData)) {
			throw new Error("Invalid Data input to APIElementData constructor");
		}
		this.id = (this.rawData as any).id;
	}
}
