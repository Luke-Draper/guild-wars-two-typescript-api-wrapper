import APIEndpoint from "./api-endpoint";
import APIChildEndpoint from "./api-child-endpoint";

export default interface APIParentEndpoint extends APIEndpoint {
	children: Array<APIChildEndpoint>;
	childrenCachedSortId?: object;
	childrenCachedSortName?: object;
}
