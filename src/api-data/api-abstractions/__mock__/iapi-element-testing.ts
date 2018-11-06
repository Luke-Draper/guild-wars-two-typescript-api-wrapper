import getDefaultIAPIList from "./iapi-list-testing";
import IAPIChild, { defaultChildGetFullPath } from "../iapi-child";
import IAPIElement, { defaultElementSetupData } from "../iapi-element";

export default function getDefaultIAPIElement(): IAPIElement {
	return {
		parent: getDefaultIAPIList(),
		id: -1,
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
		): Promise<IAPIElement> {
			return defaultElementSetupData(this, recursive, useCurrentData);
		}
	};
}

export function getMockIAPIElement(p?: Partial<IAPIElement>): IAPIElement {
	return {
		...getDefaultIAPIElement(),
		...p
	};
}
