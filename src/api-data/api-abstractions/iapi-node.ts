import IAPIChild from "./iapi-child";
import APIGetter from "./api-getter";

/**
 * The interface modeling the data from every endpoint of the API
 */
export default interface IAPINode {
	/**
	 * The base path name of this endpoint<br>
	 * @example <br><br>
	 * the pathBaseName of "<a>https://api.guildwars2.com/v2/items/357</a>" is "357"
	 */
	pathBaseName: string;
	/**
	 * Whether or not this endpoint requires a valid access_token parameter
	 */
	isAuthenticated: boolean;
	/**
	 * Whether or not this endpoint allows the lang parameter to obtain a translated version of the text
	 */
	isLocalized: boolean;
	/**
	 * Whether or not this endpoint is currently disabled
	 */
	isDisabled: boolean;
	/**
	 * The set up data obtained from this endpoint
	 */
	data: object;
	/**
	 * The child nodes of this node
	 */
	children?: Array<IAPIChild>;
	/**
	 * The full path to this endpoint<br>
	 * @return The full path to this endpoint
	 */
	getFullPath(): string;
	/**
	 * Sets up the data from this endpoint
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @param recursive Whether to run the get request to obtain this data or use the current data object
	 * @return A promise holding this after completing data parsing
	 */
	setupData(recursive: boolean, useCurrentData: boolean): Promise<IAPINode>;
}

/**
 * Type guard for the IAPINode interface
 * @param object The object to test
 */
export function isAPINode(object: object): object is IAPINode {
	return (
		(object as any).pathBaseName !== undefined &&
		(object as any).isAuthenticated !== undefined &&
		(object as any).isLocalized !== undefined &&
		(object as any).isDisabled !== undefined &&
		(object as any).data !== undefined &&
		(object as any).getFullPath !== undefined &&
		(object as any).setupData !== undefined
	);
}

/**
 * A default implementation of IAPINode.getFullPath
 */
export function defaultNodeGetFullPath(inputThis: IAPINode): string {
	return inputThis.pathBaseName;
}

/**
 * A default implementation of IAPINode.setupData
 */
export function defaultNodeSetupData(
	inputThis: IAPINode,
	recursive: boolean,
	useCurrentData: boolean
): Promise<IAPINode> {
	return (useCurrentData
		? new Promise(resolve => {
				resolve(inputThis.data);
		  })
		: APIGetter.getFromNode(inputThis, {})
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
