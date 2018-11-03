/**
 * APIListData Abstract Superclass
 * @fileOverview<br><br>
 * This Abstract Superclass describes all data from endpoints of the Guild Wars 2 API that contain an id from a list in the parent endpoint
 *
 * @author Luke Draper
 *
 * @requires ./api-data
 * @requires ./api-element-data
 */
import APIData from "./api-data";
import APIElementData from "./api-element-data";

/**
 * Used to ensure that the input RawData has the required data values
 */
function HasAPIListData(input: any): boolean {
	let output = true;
	if (!(input instanceof Array)) {
		output = false;
	} else {
		input.forEach(item => {
			if (typeof item !== "number") {
				output = false;
			}
		});
	}
	return output;
}

export default abstract class APIListData<
	T extends APIElementData
> extends APIData {
	/**
	 * The ID number of this API endpoint's data
	 */
	ids: Array<number>;
	/**
	 * The data for each element corresponding to an ID in this.ids<br>
	 * Initialized to an empty array
	 */
	elements: Array<T>;
	/**
	 * Constructor for APIListData
	 * @param rawData The raw data from the API endpoint.<br>
	 * Assigned to this.rawData.<br>
	 * requires rawData.ids of type Array of numbers to exist or else throws an error.
	 */
	constructor(rawData: object) {
		super(rawData);
		if (!HasAPIListData(this.rawData)) {
			throw new Error("Invalid Data input to APIListData constructor");
		}
		this.ids = this.rawData as any;
		this.elements = new Array<T>();
	}
}
