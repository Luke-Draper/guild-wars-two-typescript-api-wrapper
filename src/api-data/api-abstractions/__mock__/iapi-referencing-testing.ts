import { defaultNodeGetFullPath, defaultNodeSetupData } from "../iapi-node";
import IAPIChild from "../iapi-child";
import IAPIReferenced from "../iapi-referenced";
import IAPIReferencing, { defaultAddReferenceTo } from "../iapi-referencing";

export default function getDefaultIAPIReferencing(): IAPIReferencing {
	return {
		pathBaseName: "mockPathBaseName",
		isAuthenticated: false,
		isLocalized: false,
		isDisabled: false,
		data: { default_data: "default_data" },
		children: new Array<IAPIChild>(),
		referencedNodes: new Array<IAPIReferenced>(),
		getFullPath: function(): string {
			return defaultNodeGetFullPath(this);
		},
		addReferenceTo: function(referencedNode: IAPIReferenced): IAPIReferencing {
			return defaultAddReferenceTo(this, referencedNode);
		},
		setupData: function(
			recursive: boolean,
			useCurrentData: boolean
		): Promise<IAPIReferencing> {
			return defaultNodeSetupData(this, recursive, useCurrentData) as Promise<
				IAPIReferencing
			>;
		}
	};
}

export function getMockIAPIReferencing(
	p?: Partial<IAPIReferencing>
): IAPIReferencing {
	return {
		...getDefaultIAPIReferencing(),
		...p
	};
}
