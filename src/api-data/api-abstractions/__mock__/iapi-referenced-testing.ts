import { defaultNodeGetFullPath, defaultNodeSetupData } from "../iapi-node";
import IAPIChild from "../iapi-child";
import IAPIReferencing from "../iapi-referencing";
import IAPIReferenced, { defaultAddReferenceFrom } from "../iapi-referenced";

export default function getDefaultIAPIReferenced(): IAPIReferenced {
	return {
		pathBaseName: "mockPathBaseName",
		isAuthenticated: false,
		isLocalized: false,
		isDisabled: false,
		data: { default_data: "default_data" },
		children: new Array<IAPIChild>(),
		referencingNodes: new Array<IAPIReferencing>(),
		getFullPath: function(): string {
			return defaultNodeGetFullPath(this);
		},
		addReferenceFrom: function(
			referencingNode: IAPIReferencing
		): IAPIReferenced {
			return defaultAddReferenceFrom(this, referencingNode);
		},
		setupData: function(
			recursive: boolean,
			useCurrentData: boolean
		): Promise<IAPIReferenced> {
			return defaultNodeSetupData(this, recursive, useCurrentData) as Promise<
				IAPIReferenced
			>;
		}
	};
}

export function getMockIAPIReferenced(
	p?: Partial<IAPIReferenced>
): IAPIReferenced {
	return {
		...getDefaultIAPIReferenced(),
		...p
	};
}
