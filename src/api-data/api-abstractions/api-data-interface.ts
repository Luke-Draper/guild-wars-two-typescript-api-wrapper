import KeyValueInterface from "./key-val-interface";

/**
 * An interface representing all nodes (incuding root) obtained from the API
 */
export abstract class APINodeInterface {
	/**
	 * The path extension from root (<a>https://api.guildwars2.com/v2</a>)to access this data<br>
	 * @example <br><br>
	 * The path extension at "<a>https://api.guildwars2.com/v2/items/357</a>" is "/items/357"
	 */
	pathExtension: string;
	/**
	 * The data accessed by getting this API endpoint<br>
	 * @example <br><br>
	 * The data returned from "<a>https://api.guildwars2.com/v2/items/357</a>" is
	 * <br>{
	 * <br>&nbsp; "name": "Mighty Magician Coat of Vampirism",
	 * <br>&nbsp; "description": "",
	 * <br>&nbsp; "type": "Armor",
	 * <br>&nbsp; "level": 20,
	 * <br>&nbsp; "rarity": "Masterwork",
	 * <br>&nbsp; "vendor_value": 72,
	 * <br>&nbsp; "default_skin": 37,
	 * <br>&nbsp; "game_types": [
	 * <br>&nbsp; &nbsp; "Activity",
	 * <br>&nbsp; &nbsp; "Wvw",
	 * <br>&nbsp; &nbsp; "Dungeon",
	 * <br>&nbsp; &nbsp; "Pve"
	 * <br>&nbsp; ],
	 * <br>&nbsp; "flags": [
	 * <br>&nbsp; &nbsp; "SoulBindOnUse"
	 * <br>&nbsp; ],
	 * <br>&nbsp; "restrictions": [],
	 * <br>&nbsp; "id": 357,
	 * <br>&nbsp; "chat_link": "[&AgFlAQAA]",
	 * <br>&nbsp; "icon": "https://render.guildwars2.com/file/D1BBAB94232E2AD1F1253D573D45C4DCECDF0E02/61018.png",
	 * <br>&nbsp; "details": {
	 * <br>&nbsp; &nbsp; "type": "Coat",
	 * <br>&nbsp; &nbsp; "weight_class": "Light",
	 * <br>&nbsp; &nbsp; "defense": 59,
	 * <br>&nbsp; &nbsp; "infusion_slots": [],
	 * <br>&nbsp; &nbsp; "infix_upgrade": {
	 * <br>&nbsp; &nbsp; &nbsp; "id": 137,
	 * <br>&nbsp; &nbsp; &nbsp; "attributes": [
	 * <br>&nbsp; &nbsp; &nbsp; &nbsp; {
	 * <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "attribute": "Power",
	 * <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "modifier": 19
	 * <br>&nbsp; &nbsp; &nbsp; &nbsp; }
	 * <br>&nbsp; &nbsp; &nbsp; ]
	 * <br>&nbsp; &nbsp; },
	 * <br>&nbsp; &nbsp; "suffix_item_id": 24709,
	 * <br>&nbsp; &nbsp; "secondary_suffix_item_id": ""
	 * <br>&nbsp; }
	 * <br>}
	 */
	rawData: object;
	/**
	 * This should be false until this.setupDataStructure() is complete
	 */
	setupComplete: boolean;
	/**
	 * This function takes the raw data from the endpoint and parses it into a usable data structure
	 * @param pathExtension
	 * The path extension of this endpoint
	 * @param rawData
	 * The raw data obtained from this endpoint
	 * @returns
	 * Should return this
	 */
	constructor(pathExtension: string, rawData: object) {
		this.pathExtension = pathExtension;
		this.rawData = rawData;
		this.setupComplete = false;
	}
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APINodeInterface;
}

/**
 * An interface representing all data obtained from the API
 */
export abstract class APIDataInterface extends APINodeInterface {
	/**
	 * The parent api data endpoint
	 */
	parent: APINodeInterface;
	/**
	 * This function takes the raw data from the endpoint and parses it into a usable data structure
	 * @param pathExtension
	 * The path extension of this endpoint
	 * @param rawData
	 * The raw data obtained from this endpoint
	 * @returns
	 * Should return this
	 */
	constructor(
		parent: APINodeInterface,
		pathExtension: string,
		rawData: object
	) {
		super(pathExtension, rawData);
		this.parent = parent;
	}
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APIDataInterface;
}

/**
 * An interface representing all data obtained from an element endpoint of the API<br>
 * @example <br><br>
 * "<a>https://api.guildwars2.com/v2/items/357</a>" is an element because it has an id identifying it in the endpoint "/items" list
 */
export abstract class APIElementDataInterface extends APIDataInterface {
	/**
	 * The id of this data element
	 */
	abstract id: number;
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APIElementDataInterface;
}

/**
 * An interface representing all endpoints containing a list of ids pointing to element endpoints of the API<br>
 * @example <br><br>
 * "<a>https://api.guildwars2.com/v2/items</a>" is a list because it has an list of ids identifying sub endpoints "/items/<id>"
 */
export abstract class APIListDataInterface<
	Element extends APIElementDataInterface
> extends APIDataInterface {
	/**
	 * The list of ids referencing element endpoints
	 */
	abstract ids: number[];
	abstract idsAllAvailable: boolean;
	abstract elements: Element[];
	abstract setupElements(elements: Element[]): void;
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APIListDataInterface<Element>;
}

export abstract class APISortedListDataInterface<
	Element extends APIElementDataInterface
> extends APIListDataInterface<Element> {
	abstract elementIdToIndexDict: KeyValueInterface;
	abstract elementNameToIndexDict: KeyValueInterface;
	abstract setupSortedElements(elements: Element[]): void;
	abstract getElementById(id: number | string): void;
	abstract getElementByName(name: string): void;
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APISortedListDataInterface<Element>;
}

export abstract class APIDataParentInterface<
	Child extends APIDataInterface
> extends APIDataInterface {
	abstract children: Child[];
	abstract setupChildren(children?: Child[]): void;
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APIDataParentInterface<Child>;
}

export abstract class APIDataPointFromInterface extends APIDataInterface {
	abstract pointedTo: APIDataPointedToInterface[];
	abstract addPointTo(pointTo: APIDataPointedToInterface): void;
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APIDataPointFromInterface;
}

export abstract class APIDataPointedToInterface extends APIDataInterface {
	abstract pointedFrom: APIDataPointFromInterface[];
	abstract addPointFrom(pointFrom: APIDataPointFromInterface): void;
	/**
	 * This function should be called once all of the data from the API has been stored.<br>
	 * It should link this data structure with the rest of the data structures
	 * @returns
	 * Should return this
	 */
	abstract setupDataStructure(): APIDataPointedToInterface;
}
