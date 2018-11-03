import axios from "axios";

// ?access_token=<API key>

export default class APIGetter {
	static defaultRoot: string = "https://api.guildwars2.com/v2";
	static getRequest(url: string = APIGetter.defaultRoot, params: object = {}) {
		// console.log(`Sending GET Request to :${url} with Parameters:${JSON.stringify(params)}`)
		return axios
			.get(url, { params })
			.then(response => {
				return response;
			})
			.catch(error => {
				// return Promise.reject(error) // Use this to ignore the error
				throw error;
			});
	}
	static getRequestPathFromRoot(pathFromRoot: string, params: object = {}) {
		return APIGetter.getRequest(
			APIGetter.defaultRoot.concat(pathFromRoot),
			params
		);
	}
}
