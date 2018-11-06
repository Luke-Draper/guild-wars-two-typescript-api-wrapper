import IAPIChild, { isAPIChild } from "./iapi-child";
import IAPIList from "./iapi-list";
import APIGetter from "./api-getter";

/**
 * The interface modeling the data from every endpoint of the API that has a parent endpoint which is a list of identifying numbers
 */
export default interface IAPIElement extends IAPIChild {
	/**
	 * The parent node of this node
	 */
	parent: IAPIList;
	/**
	 * The id number of this endpoint. It should match the pathBaseName.
	 */
	id: number;
	/**
	 * Sets up the data from this endpoint
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @return A promise holding this after completing data parsing
	 */
	setupData(recursive: boolean, useCurrentData: boolean): Promise<IAPIElement>;
}

/**
 * Type guard for the IAPIElement interface
 * @param object The object to test
 */
export function isAPIElement(object: object): object is IAPIElement {
	return (
		isAPIChild(object) &&
		(object as any).id !== undefined &&
		(object as any).setupData !== undefined
	);
}

/**
 * A default implementation of IAPIElement.setupData
 */
export function defaultElementSetupData(
	inputThis: IAPIElement,
	recursive: boolean,
	useCurrentData: boolean
): Promise<IAPIElement> {
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
