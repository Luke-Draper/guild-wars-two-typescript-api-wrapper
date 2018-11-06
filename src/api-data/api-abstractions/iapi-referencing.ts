import IAPINode, { isAPINode } from "./iapi-node";
import IAPIReferenced from "./iapi-referenced";

/**
 * The interface modeling the data from every endpoint of the API that contains ids referencing
 * other data points of the API
 */
export default interface IAPIReferencing extends IAPINode {
	referencedNodes: Array<IAPIReferenced>;
	addReferenceTo(referencedNode: IAPIReferenced): IAPIReferencing;
	setupData(useRawData: boolean): Promise<IAPIReferencing>;
}

/**
 * Type guard for the IAPIReferencing interface
 * @param object The object to test
 */
export function isAPIReferencing(object: object): object is IAPIReferencing {
	return (
		isAPINode(object) &&
		(object as any).referencedNodes !== undefined &&
		(object as any).addReferenceTo !== undefined &&
		(object as any).getReferencedNodeByPath !== undefined &&
		(object as any).setupData !== undefined
	);
}
