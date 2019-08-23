const slotWithOwner = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	owner: '0x0', // shouldnt be here
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithIpfs = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	ipfs : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t', // shouldnt be here
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}


const workingSlot = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithInvalidType = {
	type : 'legacy_250x251', // shouldnt match
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithMatchType = {
	type : 'iab_flex_1x1', // should match regex
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithBrokenTags = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60, oopsie: 'woopsie' } ], // oopsie key shouldnt be there
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithBrokenCreated = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : '15632048768261231312312',
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithBrokenFallbackUnit = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2', // one symbol short
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithBrokenTitle = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'This title is longer than 120 symbols when it should be less, which will cause celebrate to throw an error because of this.',
	description : 'Test slot for running integration tests',
	archived : false,
	modified : 1563204876826
}

const slotWithBrokenDescription = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS LONGER THAN 1200 SYMBOLS',
	archived : false,
	modified : 1563204876826
}

// SHOULD PASS
const slotWithEmptyDescription = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : '',
	archived : false,
	modified : 1563204876826
}


// TODO: Break archived
const slotWithBrokenArchived = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	fallbackUnit : 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
	title : 'Test slot 1',
	description : 'Test slot for running integration tests',
	archived : 'xxxtentacion', // must be bool
	modified : 1563204876826
}

// SHOULD WORK
const slotWithNoOptionalKeys = {
	type : 'legacy_250x250',
	tags : [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created : 1563204876826,
	title : 'Test slot 1',
	modified : 1563204876826
}

const workingUnit = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenType = {
	type: 'legacy_250x251', // invalid type
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenMediaUrl = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://000000000000000000000000000000000000000000000', // 1 symbol too short to be valid
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
}

const unitBrokenMime = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenTargetUrl = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenTargeting = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenTags = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenCreated = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenTitle = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenDesc = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenArchived = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitBrokenPassback = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
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
}

const unitNoOptional = {
	type: 'legacy_250x250',
	mediaUrl: 'ipfs://0000000000000000000000000000000000000000000000',
	mediaMime: 'image/jpeg',
	targetUrl: 'https://xxxtentacion.com',
	tags: [ { tag : 'games', score : 42 }, { tag : 'usa', score : 60 } ],
	created: 1563204876826,
	title: 'Test unit',
	modified: 1563204876825
}

// NOTE: Won't cover every case like in POST since checks are the same
const putSlotWorking = {
	title: 'Test slot title update',
	description: 'Test description update',
	fallbackUnit: 'Qm00000000000000000000000000000000000000000000',
	archived: true,
	modified: 1563204876826
}

const putSlotExtraFields = workingSlot // Shouldn't be able to submit with all fields from the POST requests

const putSlotNoOptional = {
	title: 'Test unit update',
	archived: true,
	modified: 1563204876826
}

// optional - description
const putUnitWorking = {
	title: 'Test unit title update',
	description: 'Test Description',
	archived: true,
	modified: 1563204876826
}

const putUnitExtraFields = workingUnit

const putUnitNoOptional = {
	title: 'Test unit title update',
	archived: true,
	modified: 1563204876826
}

module.exports = {
	workingSlot,
	slotWithOwner,
	slotWithIpfs,
	slotWithInvalidType,
	slotWithBrokenCreated,
	slotWithBrokenArchived,
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
	putSlotWorking
}