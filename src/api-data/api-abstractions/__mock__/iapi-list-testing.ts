import IAPIList, { defaultListSetupData } from "../iapi-list";
import { defaultNodeGetFullPath } from "../iapi-node";
import IAPIChild from "../iapi-child";
import IAPIElement from "../iapi-element";
import getDefaultIAPIElement, {
	getMockIAPIElement
} from "./iapi-element-testing";

export default function getDefaultIAPIList(): IAPIList {
	return {
		pathBaseName: "mockPathBaseName",
		isAuthenticated: false,
		isLocalized: false,
		isDisabled: false,
		data: { default_data: "default_data" },
		children: new Array<IAPIChild>(),
		ids: new Array<number>(),
		idsGetWithAllAvailable: false,
		elements: new Array<IAPIElement>(),
		getElementById: function(id: number): IAPIElement {
			return getMockIAPIElement();
		},
		getElementByName: function(name: string): IAPIElement {
			return getMockIAPIElement();
		},
		getFullPath: function(): string {
			return defaultNodeGetFullPath(this);
		},
		setupData: function(
			recursive: boolean,
			useCurrentData: boolean
		): Promise<IAPIList> {
			return defaultListSetupData(
				this,
				recursive,
				useCurrentData,
				(parentNode: IAPIList, rawData: object): Promise<IAPIElement> => {
					return Promise.resolve(
						getDefaultIAPIElement().setupData(false, true)
					);
				}
			);
		}
	};
}

export function getMockIAPIList(p?: Partial<IAPIList>): IAPIList {
	return {
		...getDefaultIAPIList(),
		...p
	};
}
