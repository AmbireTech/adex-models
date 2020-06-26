const { Joi } = require('celebrate')
const tape = require('tape')
const schemas = require('../src/schemas')
const testData = require('./testData')
const errors = require('../src/errors')
const helpersTestData = require('./helpersTestData')
const helpers = require('../src/helpers')

// tape('Testing schema for POSTing ad slots', (t) => {
// 	t.equals(Joi.validate(testData.workingSlot.marketAdd, schemas.adSlotPost).error, null, 'No error for normal slot')
// 	t.equals(Joi.validate(testData.slotWithNoOptionalKeys.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with no optional keys')
// 	t.equals(Joi.validate(testData.slotWithMatchType.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with type that matches regex')
// 	t.equals(Joi.validate(testData.slotWithOwner.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with owner field, model doesn\'t pass it')
// 	t.equals(Joi.validate(testData.slotWithIpfs.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with IPFS, model doesn\'t pass it')
// 	t.equals(Joi.validate(testData.slotWithEmptyDescription.marketAdd, schemas.adSlotPost).error, null, 'No error for slot with empty description field')

// 	t.equals(Joi.validate(testData.slotWithInvalidType.marketAdd, schemas.adSlotPost).error.message, errors.TYPE_ERR_SLOT, 'Error for slot with invalid type')
// 	t.equals(Joi.validate(testData.slotWithBrokenDescription.marketAdd, schemas.adSlotPost).error.message, errors.DESC_ERR_SLOT, 'Error for slot with invalid description field')
// 	t.equals(Joi.validate(testData.slotWithBrokenCreated.marketAdd, schemas.adSlotPost).error.message, errors.CREATED_DATE_ERR_SLOT, 'Error for slot with invalid created timestamp')
// 	t.equals(Joi.validate(testData.slotWithBrokenFallbackUnit.marketAdd, schemas.adSlotPost).error.toString().slice(0, 15), 'ValidationError', 'Error for slot with invalid fallbackUnit field') // Failing to match regex results in ValidationError
// 	t.equals(Joi.validate(testData.slotWithBrokenTags.marketAdd, schemas.adSlotPost).error.toString().slice(0, 15), 'ValidationError', 'Error for slot with broken tags field')
// 	t.equals(Joi.validate(testData.slotWithBrokenTitle.marketAdd, schemas.adSlotPost).error.message, errors.TITLE_ERR_SLOT, 'Error for slot with broken title field')

// 	t.equals(Joi.validate(testData.slotWithInvalidWebsite.marketAdd, schemas.adSlotPost).error.message, errors.SLOT_WEBSITE_ERR, 'Error for slot with invalid website field')
// 	t.equals(Joi.validate(testData.slotWithInvalidWebsiteSchema.marketAdd, schemas.adSlotPost).error.message, errors.SLOT_WEBSITE_ERR, 'Error for slot with invalid website field (scheme)')
// 	t.equals(Joi.validate(testData.slotWithInvalidWebsiteSchemaHttp.marketAdd, schemas.adSlotPost).error.message, errors.SLOT_WEBSITE_ERR, 'Error for slot with invalid website field (http)')
// 	t.end()
// })

// tape('Testing schema for POSTing ad units', (t) => {
// 	t.equals(Joi.validate(testData.workingUnit.marketAdd, schemas.adUnitPost).error, null, 'No error for working unit')
// 	t.equals(Joi.validate(testData.unitNoOptional.marketAdd, schemas.adUnitPost).error, null, 'No error for unit with no optional fields')

// 	t.equals(Joi.validate(testData.unitBrokenArchived.marketAdd, schemas.adUnitPost).error.message, errors.ARCHIVED_ERR, 'Error for unit with invalid archived field')
// 	t.equals(Joi.validate(testData.unitBrokenCreated.marketAdd, schemas.adUnitPost).error.message, errors.CREATED_DATE_ERR_UNIT, 'Error for unit with invalid created field')
// 	t.equals(Joi.validate(testData.unitBrokenDesc.marketAdd, schemas.adUnitPost).error.message, errors.DESC_ERR_UNIT, 'Error for unit with invalid description field')
// 	t.equals(Joi.validate(testData.unitBrokenMediaUrl.marketAdd, schemas.adUnitPost).error.message, errors.IPFS_URL_ERR, 'Error for unit with invalid media URL')
// 	t.equals(Joi.validate(testData.unitBrokenMime.marketAdd, schemas.adUnitPost).error.message, errors.MEDIA_MIME_ERR, 'Error for unit for invalid mime type')
// 	t.equals(Joi.validate(testData.unitBrokenPassback.marketAdd, schemas.adUnitPost).error.message, errors.PASSBACK_ERR, 'Error for unit with invalid passback')
// 	t.equals(Joi.validate(testData.unitBrokenTags.marketAdd, schemas.adUnitPost).error.toString().slice(0, 15), 'ValidationError', 'Error for unit with invalid tags array')
// 	t.equals(Joi.validate(testData.unitBrokenTargetUrl.marketAdd, schemas.adUnitPost).error.message, errors.TARGET_URL_ERR, 'Error for unit with invalid targetUrl')
// 	t.equals(Joi.validate(testData.unitBrokenTargeting.marketAdd, schemas.adUnitPost).error.toString().slice(0, 15), 'ValidationError', 'Error for unit with invalid targeting field')
// 	t.equals(Joi.validate(testData.unitBrokenTitle.marketAdd, schemas.adUnitPost).error.message, errors.TITLE_ERR_UNIT, 'Error for unit with invalid title')
// 	t.equals(Joi.validate(testData.unitBrokenType.marketAdd, schemas.adUnitPost).error.message, errors.TYPE_ERR_UNIT, 'Error for unit with invalid type')
// 	t.end()
// })

// tape('Testing schema for PUTing ad slots', (t) => {
// 	t.equals(Joi.validate(testData.putSlotExtraFields.marketUpdate, schemas.adSlotPut).error, null, 'No error for putting slot with extra fields, they shouldn\'t be passed')
// 	t.equals(Joi.validate(testData.putSlotWorking.marketUpdate, schemas.adSlotPut).error, null, 'No error for working slot update')
// 	t.equals(Joi.validate(testData.putSlotNoOptional.marketUpdate, schemas.adSlotPut).error, null, 'No error when optional fields are skipped')
// 	t.end()
// })

// tape('Testing schema for PUTing ad units', (t) => {
// 	t.equals(Joi.validate(testData.putUnitExtraFields.marketUpdate, schemas.adUnitPut).error, null, 'No error for updating unit with extra fields as they shouldn\'t be passed')
// 	t.equals(Joi.validate(testData.putUnitNoOptional.marketUpdate, schemas.adUnitPut).error, null, 'No error for updating unit with no optional fields')
// 	t.equals(Joi.validate(testData.putUnitWorking.marketUpdate, schemas.adUnitPut).error, null, 'No error for updating working unit')
// 	t.end()
// })

// tape('Testing schema for Accounts', (t) => {
// 	t.equals(Joi.validate(testData.userValid, schemas.user).error, null, 'No error for adding valid user')
// 	t.equals(Joi.validate(testData.userNoOptional, schemas.user).error, null, 'No error for adding user with no optional fields')

// 	t.equals(Joi.validate(testData.userInvalidAuthToken, schemas.user).error.message, errors.AUTH_TOKEN_ERR, 'User with invalid auth token causes error')
// 	t.equals(Joi.validate(testData.userInvalidHash, schemas.user).error.message, errors.HASH_ERR, 'User with invalid hash causes error')
// 	t.equals(Joi.validate(testData.userInvalidIdentity, schemas.user).error.message, errors.IDENTITY_ERR, 'User with invalid identity address causes error')
// 	t.equals(Joi.validate(testData.userInvalidMode, schemas.user).error.message, errors.MODE_ERR, 'User with invalid auth mode causes error')
// 	t.equals(Joi.validate(testData.userInvalidPrefix, schemas.user).error.message, errors.PREFIXED_ERR, 'User with invalid prefix causes error')
// 	t.equals(Joi.validate(testData.userInvalidRole, schemas.user).error.message, errors.ROLE_ERR, 'User with invalid role causes error')
// 	t.equals(Joi.validate(testData.userInvalidSignature, schemas.user).error.message, errors.SIGNATURE_ERR, 'User with invalid signature causes error')
// 	t.equals(Joi.validate(testData.userInvalidsignerAddress, schemas.user).error.message, errors.SIGNER_ADDR_ERR, 'User with invalid signer address causes error')
// 	t.equals(Joi.validate(testData.userInvalidTypedData, schemas.user).error.message, errors.TD_VALUE_ERR, 'User with invalid typed data causes error')
// 	t.end()
// })

// tape('Testing schema for editing campaigns', (t) => {
// 	t.equals(Joi.validate(testData.putCampaignWorking, schemas.campaignPut).error, null, 'No error for editing a campaign')
// 	t.equals(Joi.validate(testData.putCampaignBrokenTitle, schemas.campaignPut).error.message, errors.TITLE_ERR_CAMPAIGN, 'Campaign with broken title returns error')
// 	t.ok(Joi.validate(testData.putCampaignExtraProperties, schemas.campaignPut).error.toString().slice(0, 15), 'ValidationError', 'Editing campaign won\'t work with more than the title property')
// 	t.end()
// })

// tape('Testing schema for account', (t) => {
// 	t.equals(Joi.validate(testData.validAccount.email, schemas.account.email).error, null, 'No error for account')
// 	t.equals(Joi.validate(testData.accountInvalidEmail.email, schemas.account.email).error.message, errors.ACCOUNT_EMAIL_ERR, 'Campaign with invalid email')
// 	t.equals(Joi.validate(testData.accountInvalidEmailTLD.email, schemas.account.email).error.message, errors.ACCOUNT_EMAIL_ERR, 'Campaign with invalid email top level domain')
// 	t.equals(Joi.validate(testData.accountInvalidEmailUnicode.email, schemas.account.email).error.message, errors.ACCOUNT_EMAIL_ERR, 'Campaign with invalid email - unicode characters')
// 	t.end()
// })


const { minByCategory, countryTiersCoefficients, audienceInput1, audienceInput2, audienceInput3, audienceInput4, audienceInput5, audienceInput6, decimals, pricingBounds1, pricingBounds2, pricingBounds3, pricingBounds4 } = helpersTestData
tape('Testing getSuggestedPricingBounds', (t) => {
	t.equals(JSON.stringify(helpers.getSuggestedPricingBounds({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput1 })), JSON.stringify({ min: 0.3, max: 0.3 }), '1 loc tier "in", 1 cat "in"  works')
	t.equals(JSON.stringify(helpers.getSuggestedPricingBounds({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput2 })), JSON.stringify({ min: 2.4, max: 2.4 }), '1 loc country "in", 1 cat "in"  works')
	t.equals(JSON.stringify(helpers.getSuggestedPricingBounds({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput3 })), JSON.stringify({ min: 0.4, max: 1.6 }), ' loc tiers "in", 1 cat "in" 2 cat "nin"  works')
	t.equals(JSON.stringify(helpers.getSuggestedPricingBounds({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput4 })), JSON.stringify({ min: 0.3, max: 7.5 }), '2 loc tiers "in", 0 cat "in" , 1 cat "nin" works')
	t.equals(JSON.stringify(helpers.getSuggestedPricingBounds({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput5 })), JSON.stringify({ min: 0.3, max: 7.5 }), '2 loc "in", 1 cat "ALL" "in", 1 cat "nin"  works')
	t.equals(JSON.stringify(helpers.getSuggestedPricingBounds({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput6 })), JSON.stringify({ min: 0.6, max: 1.5 }), '1 loc tier "nin", 1 cat "in"  works')

	t.end()
})

tape('Testing audienceInputToTargetingRules with getPriceRulesV1', (t) => {
	t.equals(helpers.audienceInputToTargetingRules({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput1, decimals, pricingBounds: pricingBounds1 })[4].if[1].set[1].bn,  '300000000000000000', 'set exact price when no difference between min and max')
	t.equals(helpers.audienceInputToTargetingRules({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput1, decimals, pricingBounds: pricingBounds2 })[4].if[1].set[1].bn,  '2400000000000000000', 'set exact price when no difference between min and max (higher numbers)')
	t.equals(helpers.audienceInputToTargetingRules({ minByCategory, countryTiersCoefficients, audienceInput: audienceInput4, decimals, pricingBounds: pricingBounds4 })[5].if[1].set[1].bn,  '7500000000000000000', 'set max price to top tier countries')


	t.end()
})


