const { Joi } = require('celebrate')
const tape = require('tape')
const schemas = require('../src/schemas')
const testData = require('./testData')
const errors = require('./errors')

tape('Testing schema for POSTing ad slots', (t) => {
	t.equals(Joi.validate(testData.workingSlot.marketAdd, schemas.adSlotPost).error, null, 'No error for normal slot')
	t.equals(Joi.validate(testData.slotWithNoOptionalKeys.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with no optional keys')
	t.equals(Joi.validate(testData.slotWithMatchType.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with type that matches regex')
	t.equals(Joi.validate(testData.slotWithOwner.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with owner field, model doesn\'t pass it')
	t.equals(Joi.validate(testData.slotWithIpfs.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with IPFS, model doesn\'t pass it')
	t.equals(Joi.validate(testData.slotWithEmptyDescription.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with empty description field')

	t.deepEquals(Joi.validate(testData.slotWithInvalidType.marketAdd, schemas.adSlotPost).error, errors.TYPE_ERR_SLOT, 'Error for slot with invalid type')
	t.deepEquals(Joi.validate(testData.slotWithBrokenDescription.marketAdd, schemas.adSlotPost).error, errors.DESC_ERR_SLOT, 'Error for slot with invalid description field')
	t.deepEquals(Joi.validate(testData.slotWithBrokenCreated.marketAdd, schemas.adSlotPost).error, errors.CREATED_DATE_ERR_SLOT, 'Error for slot with invalid created timestamp')
	t.equals(Joi.validate(testData.slotWithBrokenFallbackUnit.marketAdd, schemas.adSlotPost).error.toString().slice(0, 15), 'ValidationError', 'Error for slot with invalid fallbackUnit field') // Failing to match regex results in ValidationError
	t.equals(Joi.validate(testData.slotWithBrokenTags.marketAdd, schemas.adSlotPost).error.toString().slice(0, 15), 'ValidationError', 'Error for slot with broken tags field')
	t.deepEquals(Joi.validate(testData.slotWithBrokenTitle.marketAdd, schemas.adSlotPost).error, errors.TITLE_ERR_SLOT, 'Error for slot with broken title field')
	t.end()
})

tape('Testing schema for POSTing ad units', (t) => {
	t.equals(Joi.validate(testData.workingUnit.marketAdd, schemas.adUnitPost).error, null, 'No error for working unit')
	t.equals(Joi.validate(testData.unitNoOptional.marketAdd, schemas.adUnitPost).error, null, 'No error for unit with no optional fields')

	t.deepEquals(Joi.validate(testData.unitBrokenArchived.marketAdd, schemas.adUnitPost).error, errors.ARCHIVED_ERR, 'Error for unit with invalid archived field')
	t.deepEquals(Joi.validate(testData.unitBrokenCreated.marketAdd, schemas.adUnitPost).error, errors.CREATED_DATE_ERR_UNIT, 'Error for unit with invalid created field')
	t.deepEquals(Joi.validate(testData.unitBrokenDesc.marketAdd, schemas.adUnitPost).error, errors.DESC_ERR_UNIT, 'Error for unit with invalid description field')
	t.deepEquals(Joi.validate(testData.unitBrokenMediaUrl.marketAdd, schemas.adUnitPost).error, errors.IPFS_URL_ERR, 'Error for unit with invalid media URL')
	t.deepEquals(Joi.validate(testData.unitBrokenMime.marketAdd, schemas.adUnitPost).error, errors.MEDIA_MIME_ERR, 'Error for unit for invalid mime type')
	t.deepEquals(Joi.validate(testData.unitBrokenPassback.marketAdd, schemas.adUnitPost).error, errors.PASSBACK_ERR, 'Error for unit with invalid passback')
	t.equals(Joi.validate(testData.unitBrokenTags.marketAdd, schemas.adUnitPost).error.toString().slice(0, 15), 'ValidationError', 'Error for unit with invalid tags array')
	t.deepEquals(Joi.validate(testData.unitBrokenTargetUrl.marketAdd, schemas.adUnitPost).error, errors.TARGET_URL_ERR, 'Error for unit with invalid targetUrl')
	t.equals(Joi.validate(testData.unitBrokenTargeting.marketAdd, schemas.adUnitPost).error.toString().slice(0, 15), 'ValidationError', 'Error for unit with invalid targeting field')
	t.deepEquals(Joi.validate(testData.unitBrokenTitle.marketAdd, schemas.adUnitPost).error, errors.TITLE_ERR_UNIT, 'Error for unit with invalid title')
	t.deepEquals(Joi.validate(testData.unitBrokenType.marketAdd, schemas.adUnitPost).error, errors.TYPE_ERR_UNIT, 'Error for unit with invalid type')
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

	t.deepEquals(Joi.validate(testData.userInvalidAuthToken, schemas.user).error, errors.AUTH_TOKEN_ERR, 'User with invalid auth token causes error')
	t.deepEquals(Joi.validate(testData.userInvalidHash, schemas.user).error, errors.HASH_ERR, 'User with invalid hash causes error')
	t.deepEquals(Joi.validate(testData.userInvalidIdentity, schemas.user).error, errors.IDENTITY_ERR, 'User with invalid identity address causes error')
	t.deepEquals(Joi.validate(testData.userInvalidMode, schemas.user).error, errors.MODE_ERR, 'User with invalid auth mode causes error')
	t.deepEquals(Joi.validate(testData.userInvalidPrefix, schemas.user).error, errors.PREFIXED_ERR, 'User with invalid prefix causes error')
	t.deepEquals(Joi.validate(testData.userInvalidRole, schemas.user).error, errors.ROLE_ERR, 'User with invalid role causes error')
	t.deepEquals(Joi.validate(testData.userInvalidSignature, schemas.user).error, errors.SIGNATURE_ERR, 'User with invalid signature causes error')
	t.deepEquals(Joi.validate(testData.userInvalidsignerAddress, schemas.user).error, errors.SIGNER_ADDR_ERR, 'User with invalid signer address causes error')
	t.deepEquals(Joi.validate(testData.userInvalidTypedData, schemas.user).error, errors.TD_VALUE_ERR, 'User with invalid typed data causes error')
	t.end()
})

tape('Testing schema for editing campaigns', (t) => {
	t.equals(Joi.validate(testData.putCampaignWorking, schemas.campaignPut).error, null, 'No error for editing a campaign')
	t.deepEquals(Joi.validate(testData.putCampaignBrokenTitle, schemas.campaignPut).error, errors.TITLE_ERR_CAMPAIGN, 'Campaign with broken title returns error')
	t.ok(Joi.validate(testData.putCampaignExtraProperties, schemas.campaignPut).error.toString().slice(0, 15), 'ValidationError', 'Editing campaign won\'t work with more than the title property')
	t.end()
})
