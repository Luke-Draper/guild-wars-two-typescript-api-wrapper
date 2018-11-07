import IAPINode, { isAPINode } from "./iapi-node";
import IAPIReferenced from "./iapi-referenced";

/**
 * The interface modeling the data from every endpoint of the API that contains ids referencing
 * other data points of the API
 */
export default interface IAPIReferencing extends IAPINode {
	/**
	 * The nodes that this node is referenced by
	 */
	referencedNodes: Array<IAPIReferenced>;
	/**
	 * function called to add a referencing node to this. Calls addReferenceTo if needed on the referencing node. returns this
	 * @param referencedNode the node referencing this
	 */
	addReferenceTo(referencedNode: IAPIReferenced): IAPIReferencing;
	/**
	 * Sets up the data from this endpoint. This should be handled on a case by case basis as adding references is data structure specific.
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @return A promise holding this after completing data parsing
	 */
	setupData(
		recursive: boolean,
		useCurrentData: boolean
	): Promise<IAPIReferencing>;
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
		(object as any).setupData !== undefined
	);
}

/**
 * A default implementation of IAPIReferenced.addReferenceFrom
 */
export function defaultAddReferenceTo(
	inputThis: IAPIReferencing,
	referencedNode: IAPIReferenced
): IAPIReferencing {
	if (!inputThis.referencedNodes.includes(referencedNode)) {
		inputThis.referencedNodes.push(referencedNode);
	}
	if (!referencedNode.referencingNodes.includes(inputThis)) {
		referencedNode.addReferenceFrom(inputThis);
	}
	return inputThis;
}
