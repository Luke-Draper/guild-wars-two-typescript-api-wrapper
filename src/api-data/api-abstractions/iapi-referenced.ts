import IAPINode, { isAPINode } from "./iapi-node";
import IAPIReferencing from "./iapi-referencing";

/**
 * The interface modeling the data from every endpoint of the API that contains an id referenced by
 * other data points of the API
 */
export default interface IAPIReferenced extends IAPINode {
	referencingNodes: Array<IAPIReferencing>;
	addReferenceFrom(referencingNode: IAPIReferencing): IAPIReferenced;
	setupData(useRawData: boolean): Promise<IAPIReferenced>;
}

/**
 * Type guard for the IAPIReferenced interface
 * @param object The object to test
 */
export function isAPIReferenced(object: object): object is IAPIReferenced {
	return (
		isAPINode(object) &&
		(object as any).referencingNodes !== undefined &&
		(object as any).addReferenceFrom !== undefined &&
		(object as any).getReferencingNodeByPath !== undefined &&
		(object as any).setupData !== undefined
	);
}
