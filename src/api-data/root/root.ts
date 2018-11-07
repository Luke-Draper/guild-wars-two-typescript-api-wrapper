/*import {
	APIDataInterface,
	APINodeParentInterface
} from "../api-abstractions/api-data-interface";
import KeyValueInterface from "../api-abstractions/key-value-interface";

export default class Root extends APINodeParentInterface<APIDataInterface> {
	setupDataStructure(): Root {
		return this;
	}
	addChild(child: APIDataInterface): Root {
		this.children.push(child);
		return this;
	}
	constructor(
		pathExtension: string = "https://api.guildwars2.com/v2",
		rawData: object = {},
		children: APIDataInterface[] = new Array<APIDataInterface>()
	) {
		super(pathExtension, rawData, children);
	}
}

export function getApiStructure(
	apiEndpoint: string = "** Public API v2 **\r\n" +
		"\r\n" +
		"Usage:\r\n" +
		"\r\n" +
		"The API follows the general pattern of enumerating possible values of the\r\n" +
		"subsequent path segment, with the fully qualified path yielding a json object\r\n" +
		"of the type being enumerated.\r\n" +
		"\r\n" +
		"For example, /v2/colors will yield:\r\n" +
		"  [1, 2, 3, ... ]\r\n" +
		"\r\n" +
		"which can be used to create the fully qualified path of:\r\n" +
		"  /v2/colors/1\r\n" +
		"\r\n" +
		"The following paths are exposed by this API:\r\n" +
		"  /v2/account [a]\r\n" +
		"  /v2/account/achievements [a]\r\n" +
		"  /v2/account/bank [a]\r\n" +
		"  /v2/account/dungeons [a]\r\n" +
		"  /v2/account/dyes [a]\r\n" +
		"  /v2/account/finishers [a]\r\n" +
		"  /v2/account/gliders [a]\r\n" +
		"  /v2/account/home/cats [a]\r\n" +
		"  /v2/account/home/nodes [a]\r\n" +
		"  /v2/account/inventory [a]\r\n" +
		"  /v2/account/mail [d,a]\r\n" +
		"  /v2/account/mailcarriers [a]\r\n" +
		"  /v2/account/masteries [a]\r\n" +
		"  /v2/account/mastery/points [a]\r\n" +
		"  /v2/account/materials [a]\r\n" +
		"  /v2/account/minis [a]\r\n" +
		"  /v2/account/mounts/skins [d,a]\r\n" +
		"  /v2/account/mounts/types [d,a]\r\n" +
		"  /v2/account/outfits [a]\r\n" +
		"  /v2/account/pvp/heroes [a]\r\n" +
		"  /v2/account/raids [a]\r\n" +
		"  /v2/account/recipes [a]\r\n" +
		"  /v2/account/skins [a]\r\n" +
		"  /v2/account/titles [a]\r\n" +
		"  /v2/account/wallet [a]\r\n" +
		"  /v2/achievements [l]\r\n" +
		"  /v2/achievements/categories [l]\r\n" +
		"  /v2/achievements/daily\r\n" +
		"  /v2/achievements/daily/tomorrow\r\n" +
		"  /v2/achievements/groups [l]\r\n" +
		"  /v2/adventures [l,d]\r\n" +
		"  /v2/adventures/:id/leaderboards [d]\r\n" +
		"  /v2/adventures/:id/leaderboards/:board/:region [d]\r\n" +
		"  /v2/backstory/answers [l]\r\n" +
		"  /v2/backstory/questions [l]\r\n" +
		"  /v2/build\r\n" +
		"  /v2/cats\r\n" +
		"  /v2/characters [a]\r\n" +
		"  /v2/characters/:id/backstory [a]\r\n" +
		"  /v2/characters/:id/core [a]\r\n" +
		"  /v2/characters/:id/crafting [a]\r\n" +
		"  /v2/characters/:id/dungeons [d,a]\r\n" +
		"  /v2/characters/:id/equipment [a]\r\n" +
		"  /v2/characters/:id/heropoints [a]\r\n" +
		"  /v2/characters/:id/inventory [a]\r\n" +
		"  /v2/characters/:id/recipes [a]\r\n" +
		"  /v2/characters/:id/sab [a]\r\n" +
		"  /v2/characters/:id/skills [a]\r\n" +
		"  /v2/characters/:id/specializations [a]\r\n" +
		"  /v2/characters/:id/training [a]\r\n" +
		"  /v2/colors [l]\r\n" +
		"  /v2/commerce/delivery [a]\r\n" +
		"  /v2/commerce/exchange\r\n" +
		"  /v2/commerce/listings\r\n" +
		"  /v2/commerce/prices\r\n" +
		"  /v2/commerce/transactions [a]\r\n" +
		"  /v2/continents [l]\r\n" +
		"  /v2/currencies [l]\r\n" +
		"  /v2/dungeons [l]\r\n" +
		"  /v2/emblem\r\n" +
		"  /v2/events [l,d]\r\n" +
		"  /v2/events-state [d]\r\n" +
		"  /v2/files\r\n" +
		"  /v2/finishers [l]\r\n" +
		"  /v2/gemstore/catalog [l,d]\r\n" +
		"  /v2/gliders [l]\r\n" +
		"  /v2/guild/:id [a]\r\n" +
		"  /v2/guild/:id/log [a]\r\n" +
		"  /v2/guild/:id/members [a]\r\n" +
		"  /v2/guild/:id/ranks [a]\r\n" +
		"  /v2/guild/:id/stash [a]\r\n" +
		"  /v2/guild/:id/storage [a]\r\n" +
		"  /v2/guild/:id/teams [a]\r\n" +
		"  /v2/guild/:id/treasury [a]\r\n" +
		"  /v2/guild/:id/upgrades [a]\r\n" +
		"  /v2/guild/permissions [l]\r\n" +
		"  /v2/guild/search\r\n" +
		"  /v2/guild/upgrades [l]\r\n" +
		"  /v2/items [l]\r\n" +
		"  /v2/itemstats [l]\r\n" +
		"  /v2/legends\r\n" +
		"  /v2/mailcarriers [l]\r\n" +
		"  /v2/maps [l]\r\n" +
		"  /v2/masteries [l]\r\n" +
		"  /v2/materials [l]\r\n" +
		"  /v2/minis [l]\r\n" +
		"  /v2/mounts [l]\r\n" +
		"  /v2/mounts/skins [l]\r\n" +
		"  /v2/mounts/types [l]\r\n" +
		"  /v2/nodes\r\n" +
		"  /v2/outfits [l]\r\n" +
		"  /v2/pets [l]\r\n" +
		"  /v2/professions [l]\r\n" +
		"  /v2/pvp\r\n" +
		"  /v2/pvp/amulets [l]\r\n" +
		"  /v2/pvp/games [a]\r\n" +
		"  /v2/pvp/heroes [l]\r\n" +
		"  /v2/pvp/ranks [l]\r\n" +
		"  /v2/pvp/rewardtracks [l,d]\r\n" +
		"  /v2/pvp/runes [l,d]\r\n" +
		"  /v2/pvp/seasons [l]\r\n" +
		"  /v2/pvp/seasons/:id/leaderboards\r\n" +
		"  /v2/pvp/seasons/:id/leaderboards/:board/:region\r\n" +
		"  /v2/pvp/sigils [l,d]\r\n" +
		"  /v2/pvp/standings [a]\r\n" +
		"  /v2/pvp/stats [a]\r\n" +
		"  /v2/quaggans\r\n" +
		"  /v2/races [l]\r\n" +
		"  /v2/raids [l]\r\n" +
		"  /v2/recipes\r\n" +
		"  /v2/recipes/search\r\n" +
		"  /v2/skills [l]\r\n" +
		"  /v2/skins [l]\r\n" +
		"  /v2/specializations [l]\r\n" +
		"  /v2/stories [l]\r\n" +
		"  /v2/stories/seasons [l]\r\n" +
		"  /v2/titles [l]\r\n" +
		"  /v2/tokeninfo [a]\r\n" +
		"  /v2/traits [l]\r\n" +
		"  /v2/vendors [l,d]\r\n" +
		"  /v2/worlds [l]\r\n" +
		"  /v2/wvw/abilities [l]\r\n" +
		"  /v2/wvw/matches\r\n" +
		"  /v2/wvw/matches/overview\r\n" +
		"  /v2/wvw/matches/scores\r\n" +
		"  /v2/wvw/matches/stats\r\n" +
		"  /v2/wvw/matches/stats/:id/guilds/:guild_id\r\n" +
		"  /v2/wvw/matches/stats/:id/teams/:team/top/kdr\r\n" +
		"  /v2/wvw/matches/stats/:id/teams/:team/top/kills\r\n" +
		"  /v2/wvw/objectives [l]\r\n" +
		"  /v2/wvw/ranks [l]\r\n" +
		"  /v2/wvw/rewardtracks [l,d]\r\n" +
		"  /v2/wvw/upgrades [l]\r\n" +
		"\r\n" +
		"Key:\r\n" +
		"  l : locale aware (via ?lang=<langId>)\r\n" +
		"  d : currently disabled\r\n" +
		"  a : requires authentication\r\n" +
		"\r\n" +
		"Locale:\r\n" +
		"\r\n" +
		"APIs which are locale aware accept the ?lang=<langId> option. For example:\r\n" +
		"  /v2/colors/1?lang=fr\r\n" +
		"\r\n" +
		"Possible locale 'langId' values include:\r\n" +
		"  en\r\n" +
		"  es\r\n" +
		"  de\r\n" +
		"  fr\r\n" +
		"  zh\r\n" +
		"\r\n" +
		"Bulk expansion:\r\n" +
		"\r\n" +
		"Many APIs offer bulk expansion. APIs that offer bulk expansion will provide a list of \r\n" +
		"possible IDs when no parameters are provided. As set of ids can be then be resolved into\r\n" +
		"objects via one of four methods. The simplest is by specifying multiple ids via query\r\n" +
		"parameter, as in:\r\n" +
		"\r\n" +
		"  /v2/colors?ids=1,2,3\r\n" +
		"\r\n" +
		"Individual ids may also be requested via\r\n" +
		"\r\n" +
		"  /v2/colors/1\r\n" +
		"  /v2/colors?id=1\r\n" +
		"\r\n" +
		"Some endpoints support returning all resources. To do this, one may also specify 'all'\r\n" +
		"to expand all ids. For example:\r\n" +
		"\r\n" +
		"  /v2/colors?ids=all\r\n" +
		"\r\n" +
		"Not all APIs support the 'all' keyword as it may be too expensive.\r\n" +
		"\r\n" +
		"Another approach to bulk expansion is through pages.  Use the ?page=<page#>\r\n" +
		"parameter to specify the requeste page.  Optionally, you can also provide\r\n" +
		"a &page_size=<page size> value to adjust to your preferred page size.\r\n" +
		"\r\n" +
		"Sample usage is:\r\n" +
		"\r\n" +
		"  /v2/colors?page=0&page_size=10\r\n" +
		"\r\n" +
		"Pay attention to response headers which provide additional metadata about\r\n" +
		"the underlying collection, pagination info, and links.\r\n" +
		"\r\n" +
		"Authentication:\r\n" +
		"\r\n" +
		"APIs which require authentication need to be passed an API key belonging to\r\n" +
		"the account to be accessed. The API key must have the appropriate permissions\r\n" +
		"associated with it (/v2/tokeninfo can be used to inspect key permissions). Keys\r\n" +
		"can be generated on the ArenaNet account site.\r\n" +
		"\r\n" +
		"Keys can be passed either via query parameter or HTTP header. Our servers do\r\n" +
		"not support preflighted CORS requests, so if your application is running\r\n" +
		"in the user's browser you'll need to user the query parameter.\r\n" +
		"\r\n" +
		'To pass via query parameter, include "?access_token=<API key>" in your request.\r\n' +
		"\r\n" +
		'To pass via HTTP header, include "Authorization: Bearer <API key>".'
): Array<KeyValueInterface> {
	let step1: string[] = apiEndpoint.split("\r\n");
	step1.unshift("");
	step1.unshift("");
	step1.push("");
	step1.push("");
	let step2: string[] = new Array<string>();
	for (let i = 2; i < step1.length - 2; i++) {
		if (
			step1[i].startsWith("  /v2/") &&
			((step1[i - 1].startsWith("  /v2/") &&
				step1[i - 2].startsWith("  /v2/")) ||
				(step1[i + 1].startsWith("  /v2/") &&
					step1[i + 2].startsWith("  /v2/")))
		) {
			step2.push(step1[i].substr(6));
		}
	}
	let step3: KeyValueInterface[] = new Array<KeyValueInterface>();
	for (let i = 0; i < step2.length; i++) {
		let auth = false;
		let lang = false;
		let disa = false;
		let outString = step2[i];
		if (step2[i].endsWith("]")) {
			let start = step2[i].indexOf("[");
			let end = step2[i].indexOf("]");
			let flagString = step2[i].substring(start + 1, end);
			let flags: string[] = flagString.split(",");
			flags.forEach((flag: string) => {
				if (flag.includes("a")) {
					auth = true;
				} else if (flag.includes("l")) {
					lang = true;
				} else if (flag.includes("d")) {
					disa = true;
				}
			});
			outString = step2[i].substring(0, start - 1);
		}
		let steps = outString.split("/");
		let baseObject = {
			path: outString,
			pathSteps: steps,
			pathDepth: steps.length,
			name: steps[steps.length - 1],
			requiresAuthentication: auth,
			allowsLocalizedRequest: lang,
			currentlyDisabled: disa
		} as KeyValueInterface;
		step3.push(baseObject);
	}
	return step3;
}
*/
