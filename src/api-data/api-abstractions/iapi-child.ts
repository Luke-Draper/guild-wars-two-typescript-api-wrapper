import IAPINode, { isAPINode } from "./iapi-node";
import APIGetter from "./api-getter";

/**
 * The interface modeling the data from every endpoint of the API that has a parent endpoint
 */
export default interface IAPIChild extends IAPINode {
	/**
	 * The parent node of this node
	 */
	parent: IAPINode;
	/**
	 * Sets up the data from this endpoint
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @return A promise holding this after completing data parsing
	 */
	setupData(recursive: boolean, useCurrentData: boolean): Promise<IAPIChild>;
}

/**
 * Type guard for the IAPIChild interface
 * @param object The object to test
 */
export function isAPIChild(object: object): object is IAPIChild {
	return (
		isAPINode(object) &&
		(object as any).parent !== undefined &&
		(object as any).setupData !== undefined
	);
}

/**
 * A default implementation of IAPIChild.getFullPath
 */
export function defaultChildGetFullPath(inputThis: IAPIChild): string {
	return inputThis.parent.getFullPath().concat("/", inputThis.pathBaseName);
}

/**
 * A default implementation of IAPIChild.setupData
 */
export function defaultChildSetupData(
	inputThis: IAPIChild,
	recursive: boolean,
	useCurrentData: boolean
): Promise<IAPIChild> {
	return (useCurrentData
		? new Promise(resolve => {
				resolve(inputThis.data);
		  })
		: APIGetter.getFromNode(inputThis)
	).then(returnedData => {
		inputThis.data = returnedData;
		let childSetup = new Array<Promise<IAPIChild>>();
		if (
			recursive &&
			inputThis.children !== undefined &&
			inputThis.children.length > 0
		) {
			inputThis.children.forEach((child: IAPIChild) => {
				childSetup.push(child.setupData(recursive, useCurrentData));
			});
		}
		return Promise.all(childSetup).then(() => {
			return inputThis;
		});
	});
}
