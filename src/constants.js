const countries = require('i18n-iso-countries')
countries.registerLocale(require("i18n-iso-countries/langs/en.json"))
const { PredefinedTags } = require('./tags')
const { GoogleVisionCategories } = require('./googleVisionCategories')

const SignatureModes = {
	NO_SIG: 0,
	EIP712: 1,
	GETH: 2,
	TREZOR: 3,
	ADEX: 4
}

const SignaturePrefixes = {
	NO_SIG: '',
	EIP712: '',
	GETH: '\x19Ethereum Signed Message:\n32',
	TREZOR: '\x19Ethereum Signed Message:\n\x20',
	ADEX: '\x19Ethereum Signed Message:\n108By signing this message, you acknowledge signing an AdEx bid with the hash:\n'
}

const AdUnitsTypes = [
	// Legacy
	'legacy_300x250', 'legacy_250x250', 'legacy_240x400', 'legacy_336x280', 'legacy_180x150',
	'legacy_300x100', 'legacy_720x300', 'legacy_468x60', 'legacy_234x60', 'legacy_88x31',
	'legacy_120x90', 'legacy_120x60', 'legacy_120x240', 'legacy_125x125', 'legacy_728x90',
	'legacy_160x600', 'legacy_120x600', 'legacy_300x600', 'legacy_320x50',
	// IAB FLEX - TODO
]

const numericToAlpha2 = countries.numericToAlpha2

const CountryNames = countries.getNames('en')
const AllCountries = Object.keys(CountryNames)
	.map(key => {
		return {
			code: key,
			name: Array.isArray(CountryNames[key]) ? CountryNames[key][0] : CountryNames[key],
			value: `location_${key}`,
			ruleValue: key,
		}
	})

const CountryTiers = {
	TIER_1: {
		ruleValue: 'TIER_1',
		name: 'Tier 1',
		countries: ['AU', 'CA', 'CH', 'DE', 'GB', 'IE', 'IS', 'LU', 'NL', 'NO', 'SE', 'SG', 'US']
	},
	TIER_2: {
		ruleValue: 'TIER_2',
		name: 'Tier 2',
		countries: ['AD', 'AE', 'AG', 'AR', 'AT', 'AW', 'BB', 'BE', 'BH', 'BM', 'BN', 'BS', 'CK', 'CL', 'CW', 'CY', 'CZ', 'DK', 'EE', 'ES', 'FI', 'FK', 'FO', 'FR', 'GD', 'GF', 'GI', 'GL', 'GP', 'GQ', 'GR', 'HK', 'HR', 'HU', 'IC', 'IL', 'IT', 'JP', 'KR', 'KW', 'KY', 'LI', 'LT', 'LV', 'MC', 'MO', 'MQ', 'MT', 'NZ', 'OM', 'PF', 'PL', 'PT', 'QA', 'RU', 'SA', 'SC', 'SI', 'SM', 'SK', 'TT', 'TW', 'UY', 'VA', 'VE', 'VG', 'VI']
	},
	TIER_3: {
		ruleValue: 'TIER_3',
		name: 'Tier 3',
		countries: ['AL', 'AO', 'AZ', 'BA', 'BG', 'BR', 'BW', 'BY', 'BZ', 'CN', 'CO', 'CR', 'CU', 'DO', 'DZ', 'EC', 'FJ', 'GA', 'IQ', 'IR', 'JM', 'JO', 'KZ', 'LB', 'LC', 'LY', 'ME', 'MK', 'MN', 'MU', 'MX', 'MY', 'NA', 'PA', 'PE', 'PY', 'RO', 'RS', 'SR', 'TH', 'TN', 'TR', 'TV', 'VC', 'ZA']
	},
	TIER_4: {
		ruleValue: 'TIER_4',
		name: 'Tier 4',
		countries: ['AF', 'AM', 'BD', 'BF', 'BI', 'BJ', 'BO', 'BT', 'CD', 'CF', 'CI', 'CM', 'EG', 'ER', 'ET', 'GE', 'GH', 'GM', 'GN', 'GT', 'GU', 'GY', 'HN', 'HT', 'ID', 'IN', 'KE', 'KG', 'KH', 'KP', 'LA', 'LK', 'LR', 'LS', 'MA', 'MD', 'MG', 'ML', 'MM', 'MR', 'MV', 'MW', 'MZ', 'NC', 'NE', 'NG', 'NI', 'NP', 'PG', 'PH', 'PK', 'PR', 'PS', 'RW', 'SB', 'SD', 'SL', 'SN', 'SO', 'SV', 'SY', 'SZ', 'TD', 'TG', 'TJ', 'TM', 'TO', 'TZ', 'UA', 'UG', 'UZ', 'VN', 'VU', 'WS', 'WS', 'XK', 'YE', 'ZM', 'ZR', 'ZW']
	}
}


const Genders = ['gender_male', 'gender_female', 'gender_other']

const Ages = {
	min: 0,
	max: 100
}

const TargetScores = {
	min: 0,
	max: 100
}

const MimeTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'video/mp4'
]

const IdentityPrivilegeLevel = {
	None: 0,
	Routines: 1,
	Transactions: 2,
}

const UA_BROWSERS = [
	'2345Explorer',
	'360 Browser',
	'Amaya',
	'Android Browser',
	'Arora',
	'Avant',
	'Avast',
	'AVG',
	'BIDUBrowser',
	'Baidu',
	'Basilisk',
	'Blazer',
	'Bolt',
	'Brave',
	'Bowser',
	'Camino',
	'Chimera',
	'Chrome Headless',
	'Chrome WebView',
	'Chrome',
	'Chromium',
	'Comodo Dragon',
	'Dillo',
	'Dolphin',
	'Doris',
	'Edge',
	'Epiphany',
	'Facebook',
	'Falkon',
	'Fennec',
	'Firebird',
	'Firefox',
	'Flock',
	'GSA',
	'GoBrowser',
	'ICE Browser',
	'IE',
	'IEMobile',
	'IceApe',
	'IceCat',
	'IceDragon',
	'Iceape',
	'Iceweasel',
	'Iridium',
	'Iron',
	'Jasmine',
	'K-Meleon',
	'Kindle',
	'Konqueror',
	'LBBROWSER Line',
	'Links',
	'Lunascape',
	'Lynx',
	'MIUI Browser',
	'Maemo Browser',
	'Maemo',
	'Maxthon',
	'MetaSr Midori',
	'Minimo',
	'Mobile Safari',
	'Mosaic',
	'Mozilla',
	'NetFront',
	'NetSurf',
	'Netfront',
	'Netscape',
	'NokiaBrowser',
	'Oculus Browser',
	'OmniWeb',
	'Opera Coast',
	'Opera Mini',
	'Opera Mobi',
	'Opera Tablet',
	'Opera',
	'PaleMoon',
	'PhantomJS',
	'Phoenix',
	'Polaris',
	'Puffin',
	'QQ',
	'QQBrowser',
	'QQBrowserLite',
	'Quark',
	'QupZilla',
	'RockMelt',
	'Safari',
	'Sailfish Browser',
	'Samsung Browser',
	'SeaMonkey',
	'Silk',
	'Skyfire',
	'Sleipnir',
	'Slim',
	'SlimBrowser',
	'Swiftfox',
	'Tizen Browser',
	'UCBrowser',
	'Vivaldi',
	'Waterfox',
	'WeChat',
	'Yandex',
	'baidu',
	'iCab',
	'w3m',
]

const UA_OS = [
	'Android',
	'iOS',
	'Windows [Phone/Mobile]',
	'Mac OS',
	'Linux',
	'AIX',
	'Amiga OS',
	'Arch',
	'Bada',
	'BeOS',
	'BlackBerry',
	'CentOS',
	'Chromium OS',
	'Contiki',
	'Fedora',
	'Firefox OS',
	'FreeBSD',
	'Debian',
	'DragonFly',
	'Fuchsia',
	'Gentoo',
	'GNU',
	'Haiku',
	'Hurd',	
	'Joli',
	'KaiOS',
	'Linpus',
	'Mageia',
	'Mandriva',
	'MeeGo',
	'Minix',
	'Mint',
	'Morph OS',
	'NetBSD',
	'Nintendo',
	'OpenBSD',
	'OpenVMS',
	'OS/2',
	'Palm',
	'PC-BSD',
	'PCLinuxOS',
	'Plan9',
	'Playstation',
	'QNX',
	'RedHat',
	'RIM Tablet OS',
	'RISC OS',
	'Sailfish',
	'Series40',
	'Slackware',
	'Solaris',
	'SUSE',
	'Symbian',
	'Tizen',
	'Ubuntu',
	'Unix',
	'VectorLinux',
	'WebOS',
	'Zenwalk',
]


// NOTE: currently only this is used
const OsGroups= {
	GROUP_DESKTOP: {
		ruleValue: 'GROUP_DESKTOP',
		name: 'GROUP_DESKTOP',
		browsers: ['Windows [Phone/Mobile]', 'Mac OS', 'Chromium OS' , 'Linux', 'CentOS', 'Fedora', 'FreeBSD', 'Debian', 'RedHat', 'Ubuntu', 'OpenBSD', 'Arch', 'Solaris']
	},
	GROUP_MOBILE: {
		ruleValue: 'GROUP_MOBILE',
		name: 'GROUP_MOBILE',
		browsers: ['Android', 'iOS']
	},
	GROUP_ANDROID: {
		ruleValue: 'GROUP_ANDROID',
		name: 'GROUP_ANDROID',
		browsers: ['Android']
	},
	GROUP_IOS: {
		ruleValue: 'GROUP_IOS',
		name: 'GROUP_IOS',
		browsers: ['iOS']
	}
}

const valueToKey = (obj) => {
	return Object.keys(obj).reduce((newObj, key) => {
		newObj[obj[key]] = key
		return newObj
	}, {})
}

module.exports = {
	SignatureModes,
	SignaturePrefixes,
	AdUnitsTypes,
	numericToAlpha2,
	AllCountries,
	CountryNames,
	CountryTiers,
	Genders,
	Ages,
	TargetScores,
	PredefinedTags,
	GoogleVisionCategories,
	MimeTypes,
	IdentityPrivilegeLevel,
	valueToKey,
	UA_BROWSERS,
	UA_OS,
	OsGroups,
}