import APIEndpoint from "./api-endpoint";

export default interface APIChildEndpoint extends APIEndpoint {
	id: number;
	getPathFromRoot(): string;
}
