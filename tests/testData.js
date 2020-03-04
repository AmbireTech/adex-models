const AdSlot = require('../src/models/AdSlot')
const AdUnit = require('../src/models/AdUnit')
const Account = require('../src/models/Account')

// Length without '0x' or 'ipfs://'
const IPFS_ADDR_LEN = 46
const IPFS_NO_QM_LEN = 44
const IDENTITY_ADDR_LEN = 40
const SIGNATURE_LEN = 130
const HASH_LEN = 64
const SIGNER_ADDR_LEN = 40



function generateAddress(prefix, length) {
	if (prefix == 'ipfs://') {
		return prefix + 'Qm' + '0'.repeat(length - 2)
	}
	return prefix + '0'.repeat(length)
}

function generateString(length) {
	return '0'.repeat(length)
}

const workingSlot = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	website: 'https://www.example.com',
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithOwner = new AdSlot({
	...workingSlot,
	owner: '0x0', // shouldnt be here
})

const slotWithIpfs = new AdSlot({
	...workingSlot,
	ipfs : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t', // shouldnt be here
})

const slotWithInvalidType = new AdSlot({
	...workingSlot,
	type : 'legacy_250x251', // shouldnt match
})

const slotWithMatchType = new AdSlot({
	...workingSlot,
	type : 'iab_flex_1x1', // should match regex
})

const slotWithBrokenTags = new AdSlot({
	...workingSlot,
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60, oopsie: 'woopsie' } ], // oopsie key shouldnt be there
})

const slotWithBrokenCreated = new AdSlot({
	...workingSlot,
	created : '15632048768261231312312',
})

const slotWithBrokenFallbackUnit = new AdSlot({
	...workingSlot,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2',
})

const slotWithBrokenTitle = new AdSlot({
	...workingSlot,
	title : generateString(121), // longer than limit
})

const slotWithBrokenDescription = new AdSlot({
	...workingSlot,
	description : generateString(1201), // over 1200 limit
})

const slotWithInvalidWebsite = new AdSlot({
	...workingSlot,
	website : 'example[]fewfe{}',
})

const slotWithInvalidWebsiteSchema = new AdSlot({
	...workingSlot,
	website : 'tls://ggg.example.com',
})

// SHOULD PASS
const slotWithEmptyDescription = new AdSlot({
	...workingSlot,
	description : '',
})

// SHOULD WORK
const slotWithNoOptionalKeys = new AdSlot({
	type: 'legacy_250x250',
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test slot 1',
	modified: 1563204876826,
	website: workingSlot.website 
})

const workingUnit = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: generateString(20),
	description: generateString(50),
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenType = new AdUnit({
	...workingUnit,
	type: 'legacy_250x251', // invalid type
})

const unitBrokenMediaUrl = new AdUnit({
	...workingUnit,
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN - 1), // 1 symbol too short to be valid
})

const unitBrokenMime = new AdUnit({
	...workingUnit,
	mediaMime: 'image/asdf', // invalid mime type
})

const unitBrokenTargetUrl = new AdUnit({
	...workingUnit,
	targetUrl: 'xxxtentacion.com', // invalid url
})

const unitBrokenTargeting = new AdUnit({
	...workingUnit,
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60, oopsie: 'woopsie' } ], // bad key value
})

const unitBrokenTags = new AdUnit({
	...workingUnit,
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60, oopsie: 'woopsie' } ], // bad key value
})

const unitBrokenCreated = new AdUnit({
	...workingUnit,
	created: 'broken',
})

const unitBrokenTitle = new AdUnit({
	...workingUnit,
	title: 42,
})

const unitBrokenDesc = new AdUnit({
	...workingUnit,
	description:  [1, 2, 3, 4, 5],
})

const unitBrokenArchived = new AdUnit({
	...workingUnit,
	archived: 'not a bool',
})

const unitBrokenPassback = new AdUnit({
	...workingUnit,
	passback: 'not a bool'
})

const unitNoOptional = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: generateString(20),
	modified: 1563204876825
})

// NOTE: Won't cover every case like in POST since checks are the same
const putSlotWorking = new AdSlot({
	title: generateString(20),
	description: generateString(50),
	fallbackUnit: generateAddress('Qm', IPFS_NO_QM_LEN),
	archived: true,
	modified: 1563204876826,
	minPerImpression: { balance: '100' }
})

const putSlotExtraFields = workingSlot // Shouldn't be able to submit with all fields from the POST requests

const putSlotNoOptional = new AdSlot({
	title: generateString(20),
	archived: true,
	modified: 1563204876826
})

// optional - description
const putUnitWorking = new AdUnit({
	title: generateString(20),
	description: generateString(50),
	archived: true,
	modified: 1563204876826
})

const putUnitExtraFields = workingUnit

const putUnitNoOptional = new AdUnit({
	title: generateString(20),
	archived: true,
	modified: 1563204876826
})

const userValid = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 0,
	signature: generateAddress('0x', SIGNATURE_LEN),
	hash: generateAddress('0x', HASH_LEN),
	authToken: 'This is a string',
	signerAddress: generateAddress('0x', SIGNER_ADDR_LEN),
	prefixed: true,
	typedData: [{
		type: 'Type',
		name: 'Name',
		value: 'Value'
	}],
	role: 'advertiser'
}

const userInvalidIdentity = {
	...userValid,
	identity: generateAddress('0x', IDENTITY_ADDR_LEN - 1), // Too short
}

const userInvalidMode = {
	...userValid,
	mode: 1337,
}

const userInvalidSignature = {
	...userValid,
	signature: generateAddress('0x', SIGNATURE_LEN - 10),
}

const userInvalidHash = {
	...userValid,
	hash: generateAddress('0x', HASH_LEN + 1), // too long
}

const userInvalidAuthToken = {
	...userValid,
	authToken: 42, // should be string
}

const userInvalidsignerAddress = {
	...userValid,
	signerAddress: generateAddress('0x', SIGNER_ADDR_LEN + 2), // Too long
}

const userInvalidPrefix = {
	...userValid,
	prefixed: [true],
}

const userInvalidTypedData = {
	...userValid,
	typedData: [{
		type: 'Type',
		name: 'Name',
		value: 'Value',
	},
	{
		type: 'Type',
		name: 'Name', // missing value
	}
],
}

const userInvalidRole = {
	...userValid,
	role: 'something_else'
}

const userNoOptional = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 0,
	signature: generateAddress('0x', SIGNATURE_LEN),
	hash: generateAddress('0x', HASH_LEN),
	authToken: 'This is a string',
	signerAddress: generateAddress('0x', SIGNER_ADDR_LEN)
}

const putCampaignWorking = {
	title: generateString(120)
}

const putCampaignBrokenTitle = {
	title: generateString(121) // over 120 limit
}

const putCampaignExtraProperties = {
	title: generateString(120),
	description: generateString(200)
}

const validAccount = new Account({
	email: 'heprotecc@heatacc.com'
})

const accountInvalidEmail = {
	...validAccount,
	email: 'heproteccheatacc.com'
}

const accountInvalidEmailTLD = {
	...validAccount,
	email: 'heprotecc@heatacc.comrade'
}

const accountInvalidEmailUnicode = {
	...validAccount,
	email: 'heproteⒸⒸ@heⒶtⒶcc.com'
}

module.exports = {
	workingSlot,
	slotWithOwner,
	slotWithIpfs,
	slotWithInvalidType,
	slotWithBrokenCreated,
	slotWithBrokenDescription,
	slotWithBrokenFallbackUnit,
	slotWithBrokenTags,
	slotWithBrokenTitle,
	slotWithEmptyDescription,
	slotWithInvalidWebsite,
	slotWithInvalidWebsiteSchema,
	slotWithMatchType,
	slotWithNoOptionalKeys,
	workingUnit,
	unitBrokenArchived,
	unitBrokenCreated,
	unitBrokenDesc,
	unitBrokenMediaUrl,
	unitBrokenMime,
	unitBrokenPassback,
	unitBrokenTags,
	unitBrokenTargetUrl,
	unitBrokenTargeting,
	unitBrokenTitle,
	unitBrokenType,
	unitNoOptional,
	putUnitExtraFields,
	putUnitNoOptional,
	putUnitWorking,
	putSlotExtraFields,
	putSlotNoOptional,
	putSlotWorking,
	userValid,
	userInvalidAuthToken,
	userInvalidHash,
	userInvalidIdentity,
	userInvalidMode,
	userInvalidPrefix,
	userInvalidRole,
	userInvalidSignature,
	userInvalidsignerAddress,
	userInvalidTypedData,
	userNoOptional,
	putCampaignWorking,
	putCampaignBrokenTitle,
	putCampaignExtraProperties,
	validAccount,
	accountInvalidEmail,
	accountInvalidEmailTLD,
	accountInvalidEmailUnicode
}
