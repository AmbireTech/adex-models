const { Joi } = require('celebrate')
const tape = require('tape')
const schemas = require('../src/schemas')
const testData = require('./testData')

tape('Testing schema for POSTing ad slots', (t) => {
	t.equals(Joi.validate(testData.workingSlot.marketAdd, schemas.adSlotPost).error, null, 'No error for normal slot')
	t.equals(Joi.validate(testData.slotWithNoOptionalKeys.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with no optional keys')
	t.equals(Joi.validate(testData.slotWithMatchType.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with type that matches regex')
	t.equals(Joi.validate(testData.slotWithOwner.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with owner field, model doesn\'t pass it')
	t.equals(Joi.validate(testData.slotWithIpfs.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with IPFS, model doesn\'t pass it')
	t.equals(Joi.validate(testData.slotWithEmptyDescription.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with empty description field')

	// TODO: Maybe stringify error object and look for error code as current check is too obscure
	t.ok(Joi.validate(testData.slotWithInvalidType.marketAdd, schemas.adSlotPost).error instanceof Error, 'Error for slot with invalid type')
	t.ok(Joi.validate(testData.slotWithBrokenDescription.marketAdd, schemas.adSlotPost).error instanceof Error, 'Error for slot with invalid description field')
	t.ok(Joi.validate(testData.slotWithBrokenCreated.marketAdd, schemas.adSlotPost).error instanceof Error, 'Error for slot with invalid created timestamp')
	t.ok(Joi.validate(testData.slotWithBrokenFallbackUnit.marketAdd, schemas.adSlotPost).error instanceof Error, 'Error for slot with invalid fallbackUnit field')
	t.ok(Joi.validate(testData.slotWithBrokenTags.marketAdd, schemas.adSlotPost).error instanceof Error, 'Error for slot with broken tags field')
	t.ok(Joi.validate(testData.slotWithBrokenTitle.marketAdd, schemas.adSlotPost).error instanceof Error, 'Error for slot with broken title field')
	t.end()
})

tape('Testing schema for POSTing ad units', (t) => {
	t.equals(Joi.validate(testData.workingUnit.marketAdd, schemas.adUnitPost).error, null, 'No error for working unit')
	t.equals(Joi.validate(testData.unitNoOptional.marketAdd, schemas.adUnitPost).error, null, 'No error for unit with no optional fields')

	t.ok(Joi.validate(testData.unitBrokenArchived.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid archived field')
	t.ok(Joi.validate(testData.unitBrokenCreated.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid created field')
	t.ok(Joi.validate(testData.unitBrokenDesc.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid description field')
	t.ok(Joi.validate(testData.unitBrokenMediaUrl.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid media URL')
	t.ok(Joi.validate(testData.unitBrokenMime.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit for invalid mime type')
	t.ok(Joi.validate(testData.unitBrokenPassback.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid passback')
	t.ok(Joi.validate(testData.unitBrokenTags.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid tags array')
	t.ok(Joi.validate(testData.unitBrokenTargetUrl.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid targetUrl')
	t.ok(Joi.validate(testData.unitBrokenTargeting.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid targeting field')
	t.ok(Joi.validate(testData.unitBrokenTitle.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid title')
	t.ok(Joi.validate(testData.unitBrokenType.marketAdd, schemas.adUnitPost).error instanceof Error, 'Error for unit with invalid type')
	t.end()
})

tape('Testing schema for PUTing ad slots', (t) => {
	t.equals(Joi.validate(testData.putSlotExtraFields.marketUpdate, schemas.adSlotPut).error, null, 'No error for putting slot with extra fields, they shouldn\'t be passed')
	t.equals(Joi.validate(testData.putSlotWorking.marketUpdate, schemas.adSlotPut).error, null, 'No error for working slot update')
	t.equals(Joi.validate(testData.putSlotNoOptional.marketUpdate, schemas.adSlotPut).error, null, 'No error when optional fields are skipped')
	t.end()
})

tape('Testing schema for PUTing ad units',  (t) => {
	t.equals(Joi.validate(testData.putUnitExtraFields.marketUpdate, schemas.adUnitPut).error, null, 'No error for updating unit with extra fields as they shouldn\'t be passed')
	t.equals(Joi.validate(testData.putUnitNoOptional.marketUpdate, schemas.adUnitPut).error, null, 'No error for updating unit with no optional fields')
	t.equals(Joi.validate(testData.putUnitWorking.marketUpdate, schemas.adUnitPut).error, null, 'No error for updating working unit')
	t.end()
})

tape('Testing schema for Accounts', (t) => {
	t.equals(Joi.validate(testData.userValid, schemas.user).error, null, 'No error for adding valid user')
	t.equals(Joi.validate(testData.userNoOptional, schemas.user).error, null, 'No error for adding user with no optional fields')

	t.ok(Joi.validate(testData.userInvalidAuthToken, schemas.user).error instanceof Error, 'User with invalid auth token causes error')
	t.ok(Joi.validate(testData.userInvalidHash, schemas.user).error instanceof Error, 'User with invalid hash causes error')
	t.ok(Joi.validate(testData.userInvalidIdentity, schemas.user).error instanceof Error, 'User with invalid identity address causes error')
	t.ok(Joi.validate(testData.userInvalidMode, schemas.user).error instanceof Error, 'User with invalid auth mode causes error')
	t.ok(Joi.validate(testData.userInvalidPrefix, schemas.user).error instanceof Error, 'User with invalid prefix causes error')
	t.ok(Joi.validate(testData.userInvalidRole, schemas.user).error instanceof Error, 'User with invalid role causes error')
	t.ok(Joi.validate(testData.userInvalidSignature, schemas.user).error instanceof Error, 'User with invalid signature causes error')
	t.ok(Joi.validate(testData.userInvalidsignerAddress, schemas.user).error instanceof Error, 'User with invalid signer address causes error')
	t.ok(Joi.validate(testData.userInvalidTypedData, schemas.user).error instanceof Error, 'User with invalid typed data causes error')
	t.end()
})
