import getDefaultIAPINode from "./iapi-node-testing";
import IAPIChild, {
	defaultChildGetFullPath,
	defaultChildSetupData
} from "../iapi-child";

export default function getDefaultIAPIChild(): IAPIChild {
	return {
		parent: getDefaultIAPINode(),
		pathBaseName: "mockPathBaseName",
		isAuthenticated: false,
		isLocalized: false,
		isDisabled: false,
		data: { default_data: "default_data" },
		children: new Array<IAPIChild>(),
		getFullPath: function(): string {
			return defaultChildGetFullPath(this);
		},
		setupData: function(
			recursive: boolean,
			useCurrentData: boolean
		): Promise<IAPIChild> {
			return defaultChildSetupData(this, recursive, useCurrentData);
		}
	};
}

export function getMockIAPIChild(p?: Partial<IAPIChild>): IAPIChild {
	return {
		...getDefaultIAPIChild(),
		...p
	};
}
