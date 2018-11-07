import IAPINode, { isAPINode } from "./iapi-node";
import IAPIReferencing from "./iapi-referencing";

/**
 * The interface modeling the data from every endpoint of the API that contains an id referenced by
 * other data points of the API
 */
export default interface IAPIReferenced extends IAPINode {
	/**
	 * The nodes that this node is referenced by
	 */
	referencingNodes: Array<IAPIReferencing>;
	/**
	 * function called to add a referencing node to this. Calls addReferenceTo if needed on the referencing node. returns this
	 * @param referencingNode the node referencing this
	 */
	addReferenceFrom(referencingNode: IAPIReferencing): IAPIReferenced;
	/**
	 * Sets up the data from this endpoint. This should be handled on a case by case basis as adding references is data structure specific.
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @return A promise holding this after completing data parsing
	 */
	setupData(
		recursive: boolean,
		useCurrentData: boolean
	): Promise<IAPIReferenced>;
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
		(object as any).setupData !== undefined
	);
}

/**
 * A default implementation of IAPIReferenced.addReferenceFrom
 */
export function defaultAddReferenceFrom(
	inputThis: IAPIReferenced,
	referencingNode: IAPIReferencing
): IAPIReferenced {
	if (!inputThis.referencingNodes.includes(referencingNode)) {
		inputThis.referencingNodes.push(referencingNode);
	}
	if (!referencingNode.referencedNodes.includes(inputThis)) {
		referencingNode.addReferenceTo(inputThis);
	}
	return inputThis;
}
