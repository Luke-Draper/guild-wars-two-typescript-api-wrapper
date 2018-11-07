import IAPINode, { isAPINode } from "./iapi-node";
import IAPIElement from "./iapi-element";
import getDefaultIAPIElement from "./__mock__/iapi-element-testing";
import IAPIChild from "./iapi-child";
import APIGetter from "./api-getter";

/**
 * The interface modeling the data from every endpoint of the API that is a list of identifying numbers used to access child endpoints
 */
export default interface IAPIList extends IAPINode {
	/**
	 * The ids returned from this endpoint. Should equal data
	 */
	ids: Array<number>;
	/**
	 * Whether or not the parameter ids=all is available or if pagination is required
	 */
	idsGetWithAllAvailable: boolean;
	/**
	 * The element nodes that use this node as a parent
	 */
	elements: Array<IAPIElement>;
	/**
	 * Find an element using its id number
	 * @param id The id of the element to find
	 */
	getElementById(id: number): IAPIElement;
	/**
	 * Find an element using its name
	 * @param id The name of the element to find
	 */
	getElementByName(name: string): IAPIElement;
	/**
	 * Sets up the data from this endpoint
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @return A promise holding this after completing data parsing
	 */
	setupData(recursive: boolean, useCurrentData: boolean): Promise<IAPIList>;
}

/**
 * Type guard for the IAPIList interface
 * @param object The object to test
 */
export function isAPIList(object: object): object is IAPIList {
	return (
		isAPINode(object) &&
		(object as any).ids !== undefined &&
		(object as any).idsGetWithAllAvailable !== undefined &&
		(object as any).elements !== undefined &&
		(object as any).getElementById !== undefined &&
		(object as any).getElementByName !== undefined &&
		(object as any).setupData !== undefined
	);
}

/**
 * A default implementation of IAPIList.setupData
 */
export function defaultListSetupData(
	inputThis: IAPIList,
	recursive: boolean,
	useCurrentData: boolean,
	elementSetup: (parentNode: IAPIList, rawData: object) => Promise<IAPIElement>
): Promise<IAPIList> {
	return (useCurrentData
		? new Promise(resolve => {
				resolve(inputThis.data);
		  })
		: APIGetter.getFromNode(inputThis, {})
	).then(returnedData => {
		inputThis.data = returnedData;
		let childSetup = new Array<Promise<IAPIChild>>();
		let elementSet: Promise<Array<IAPIElement>> | undefined = undefined;
		if (recursive) {
			elementSet = APIGetter.getAllFromList(inputThis, elementSetup, {});
			if (inputThis.children !== undefined && inputThis.children.length > 0) {
				inputThis.children.forEach((child: IAPIChild) => {
					childSetup.push(child.setupData(recursive, useCurrentData));
				});
			}
		}
		return (recursive && elementSet !== undefined
			? elementSet.then(elements => {
					inputThis.elements = elements;
					return Promise.all(childSetup);
			  })
			: Promise.all(childSetup)
		).then(() => {
			return inputThis;
		});
	});
}
