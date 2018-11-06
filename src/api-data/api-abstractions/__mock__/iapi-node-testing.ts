import IAPINode, {
	defaultNodeGetFullPath,
	defaultNodeSetupData
} from "../iapi-node";
import IAPIChild from "../iapi-child";

export default function getDefaultIAPINode(): IAPINode {
	return {
		pathBaseName: "mockPathBaseName",
		isAuthenticated: false,
		isLocalized: false,
		isDisabled: false,
		data: { default_data: "default_data" },
		children: new Array<IAPIChild>(),
		getFullPath: function(): string {
			return defaultNodeGetFullPath(this);
		},
		setupData: function(
			recursive: boolean,
			useCurrentData: boolean
		): Promise<IAPINode> {
			return defaultNodeSetupData(this, recursive, useCurrentData);
		}
	};
}

export function getMockIAPINode(p?: Partial<IAPINode>): IAPINode {
	return {
		...getDefaultIAPINode(),
		...p
	};
}
