const AdSlot = require('../src/models/AdSlot')
const AdUnit = require('../src/models/AdUnit')

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

const slotWithOwner = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	owner: '0x0', // shouldnt be here
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithIpfs = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	ipfs : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t', // shouldnt be here
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})


const workingSlot = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithInvalidType = new AdSlot({
	type : 'legacy_250x251', // shouldnt match
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithMatchType = new AdSlot({
	type : 'iab_flex_1x1', // should match regex
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithBrokenTags = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60, oopsie: 'woopsie' } ], // oopsie key shouldnt be there
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithBrokenCreated = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : '15632048768261231312312',
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithBrokenFallbackUnit = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2', // one symbol short
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithBrokenTitle = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'This title is longer than 120 symbols when it should be less, which will cause celebrate to throw an error because of this.',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

const slotWithBrokenDescription = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

// SHOULD PASS
const slotWithEmptyDescription = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : '',
	archived : false,
	modified : 1563204876826,
	minPerImpression: { balance: '100' }
})

// SHOULD WORK
const slotWithNoOptionalKeys = new AdSlot({
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	title : 'Test slot 1',
	modified : 1563204876826
})

const workingUnit = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenType = new AdUnit({
	type: 'legacy_250x251', // invalid type
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenMediaUrl = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN - 1), // 1 symbol too short to be valid
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenMime = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/asdf', // invalid mime type
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenTargetUrl = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'xxxtentacion.com', // invalid url
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenTargeting = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60, oopsie: 'woopsie' } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenTags = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60, oopsie: 'woopsie' } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenCreated = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 'broken',
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenTitle = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 42,
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenDesc = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description:  [1, 2, 3, 4, 5],
	archived: true,
	modified: 1563204876825,
	passback: true
})

const unitBrokenArchived = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: 'not a bool',
	modified: 1563204876825,
	passback: true
})

const unitBrokenPassback = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	targeting: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	description: 'Test unit',
	archived: true,
	modified: 1563204876825,
	passback: 'qweqweret'
})

const unitNoOptional = new AdUnit({
	type: 'legacy_250x250',
	mediaUrl: generateAddress('ipfs://', IPFS_ADDR_LEN),
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	modified: 1563204876825
})

// NOTE: Won't cover every case like in POST since checks are the same
const putSlotWorking = new AdSlot({
	title: 'Test slot title update',
	description: 'Test description update',
	fallbackUnit: generateAddress('Qm', IPFS_NO_QM_LEN),
	archived: true,
	modified: 1563204876826,
	minPerImpression: { balance: '100' }
})

const putSlotExtraFields = workingSlot // Shouldn't be able to submit with all fields from the POST requests

const putSlotNoOptional = new AdSlot({
	title: 'Test unit update',
	archived: true,
	modified: 1563204876826
})

// optional - description
const putUnitWorking = new AdUnit({
	title: 'Test unit title update',
	description: 'Test Description',
	archived: true,
	modified: 1563204876826
})

const putUnitExtraFields = workingUnit

const putUnitNoOptional = new AdUnit({
	title: 'Test unit title update',
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
	identity: generateAddress('0x', IDENTITY_ADDR_LEN - 1), // Too short
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

const userInvalidMode = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 1337,
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

const userInvalidSignature = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 0,
	signature: generateAddress('0x', SIGNATURE_LEN - 10),
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

const userInvalidHash = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 0,
	signature: generateAddress('0x', SIGNATURE_LEN),
	hash: generateAddress('0x', HASH_LEN + 1), // too long
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

const userInvalidAuthToken = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 0,
	signature: generateAddress('0x', SIGNATURE_LEN),
	hash: generateAddress('0x', HASH_LEN),
	authToken: 42, // should be string
	signerAddress: generateAddress('0x', SIGNER_ADDR_LEN),
	prefixed: true,
	typedData: [{
		type: 'Type',
		name: 'Name',
		value: 'Value'
	}],
	role: 'advertiser'
}

const userInvalidsignerAddress = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 0,
	signature: generateAddress('0x', SIGNATURE_LEN),
	hash: generateAddress('0x', HASH_LEN),
	authToken: 'This is a string',
	signerAddress: generateAddress('0x', SIGNER_ADDR_LEN + 2), // Too long
	prefixed: true,
	typedData: [{
		type: 'Type',
		name: 'Name',
		value: 'Value'
	}],
	role: 'advertiser'
}

const userInvalidPrefix = {
	identity: generateAddress('0x', IDENTITY_ADDR_LEN),
	mode: 0,
	signature: generateAddress('0x', SIGNATURE_LEN),
	hash: generateAddress('0x', HASH_LEN),
	authToken: 'This is a string',
	signerAddress: generateAddress('0x', SIGNER_ADDR_LEN),
	prefixed: [true],
	typedData: [{
		type: 'Type',
		name: 'Name',
		value: 'Value'
	}],
	role: 'advertiser'
}

const userInvalidTypedData = {
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
		value: 'Value',
	},
	{
		type: 'Type',
		name: 'Name'
	}
],
	role: 'advertiser'
}

const userInvalidRole = {
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
	userNoOptional
}