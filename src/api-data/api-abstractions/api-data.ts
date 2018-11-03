/**
 * APIData Abstract Superclass
 * @fileOverview<br><br>
 * This Abstract Superclass describes all dtaa taken from endpoints of the Guild Wars 2 API
 *
 * @author Luke Draper
 */
export default abstract class APIData {
	/**
	 * The raw data from the API endpoint
	 */
	rawData: object;
	/**
	 * Constructor for APIData
	 * @param rawData The raw data from the API endpoint. Assigned to this.rawData
	 */
	constructor(rawData: object) {
		this.rawData = rawData;
	}
}
