const { Joi } = require('celebrate')
const types = require('./constants').AdUnitsTypes
const ipfsRegex = /(ipfs):\/\/(.){46}?$/
const mimeTypes = ['image/jpeg', 'image/png']
const addressRegex = /^0x[0-9A-Fa-f]{40}$/
const signatureRegex = /^0x[0-9A-Fa-f]{130}$/
const hashRegex = /^0x[0-9A-Fa-f]{64}$/
const typeRegex = /^iab_flex_.{1,}/
const validModes = [0, 1, 2, 3, 4]
const roles = ['advertiser', 'publisher']

const TYPE_ERR_SLOT = new Error('Invalid adSlot type!')
const TYPE_ERR_UNIT = new Error('Invalid adUnit type!')
const TAG_NAME_ERR = new Error('Tags array contains a tag with invalid tag name')
const TAG_SCORE_ERR = new Error('Tags array contains tag with invalid tag score. Score must be between 1-100')
const CREATED_DATE_ERR_SLOT = new Error('Date when adSlot is created is not a valid timestamp')
const CREATED_DATE_ERR_UNIT = new Error('Date when adUnit is created is not a valid timestamp')
const TITLE_ERR_SLOT = new Error('adSlot title is not a valid title. It must be a valid string up to 120 characters.')
const TITLE_ERR_UNIT = new Error('adUnit title is not a valid title. It must be a valid string up to 120 characters.')
const DESC_ERR_SLOT = new Error('adSlot description is not a valid description. It must be a valid string up to 300 characters.')
const DESC_ERR_UNIT = new Error('adUnit description is not a valid description. It must be a valid string up to 300 characters.')
const IPFS_URL_ERR = new Error('Media URL is not a valid ipfs URL')
const MEDIA_MIME_ERR = new Error('Media mime is not a supported mime type, must be either image/jpeg or image/png.')
const TARGET_URL_ERR = new Error('Target URL is not a valid URL')
const ARCHIVED_ERR = new Error('Archived is not a boolean value!')
const MODIFIED_NOT_NULL_ERR = new Error('Modified is not null on a new adSlot')
const MODIFIED_NOT_TIMESTAMP_ERR = new Error('Modified is not a valid timestamp for the adSlot')
// User
const IDENTITY_ERR = new Error('Invalid user identity address!')
const MODE_ERR = new Error('Invalid authentication mode')
const SIGNATURE_ERR = new Error('Invalid user signature')
const HASH_ERR = new Error('Invalid user hash')
const AUTH_TOKEN_ERR = new Error('Invalid auth token')
const SIGNER_ADDR_ERR = new Error('Invalid signer address')
const PREFIXED_ERR = new Error('Invalid prefixed')
const ROLE_ERR = new Error('Invalid user role')
// TD = Typed Data
const TD_TYPE_ERR = new Error('Invalid typed data type')
const TD_NAME_ERR = new Error('Invalid typed data name')
const TD_VALUE_ERR = new Error('Invalid typed data value')

module.exports = {
	adSlotPost: {
		type: Joi.string().regex(typeRegex).allow(types).required().error(TYPE_ERR_SLOT),
		tags: Joi.array().items({
			tag: Joi.string().required().error(TAG_NAME_ERR),
			score: Joi.number().min(0).max(100).required().error(TAG_SCORE_ERR)
		}).required(),
		created: Joi.date().timestamp().required().error(CREATED_DATE_ERR_SLOT),
		title: Joi.string().max(120).required().error(TITLE_ERR_SLOT),
		description: Joi.string().max(300).required().error(DESC_ERR_SLOT),
		fallbackMediaUrl: Joi.string().length(53).regex(ipfsRegex).required().error(IPFS_URL_ERR),
		fallbackMediaMime: Joi.string().valid(mimeTypes).required().error(MEDIA_MIME_ERR),
		fallbackTargetUrl: Joi.string().uri().required().error(TARGET_URL_ERR),
		archived: Joi.bool().optional().error(ARCHIVED_ERR),
		modified: Joi.allow(null).error(MODIFIED_NOT_NULL_ERR)
	},
	adSlotPut: {
		title: Joi.string().max(120).required().error(TITLE_ERR_SLOT),
		description: Joi.string().max(300).required().error(DESC_ERR_SLOT),
		fallbackMediaUrl: Joi.string().length(53).regex(ipfsRegex).required().error(IPFS_URL_ERR),
		fallbackMediaMime: Joi.string().valid(mimeTypes).required().error(MEDIA_MIME_ERR),
		fallbackTargetUrl: Joi.string().uri().required().error(TARGET_URL_ERR),
		archived: Joi.bool().required().error(ARCHIVED_ERR),
		modified: Joi.date().timestamp().required().error(MODIFIED_NOT_TIMESTAMP_ERR)
	},
	adUnitPost: {
		type: Joi.string().regex(typeRegex).allow(types).required().error(TYPE_ERR_UNIT),
		mediaUrl: Joi.string().length(53).regex(ipfsRegex).required().error(IPFS_URL_ERR),
		mediaMime: Joi.string().valid(mimeTypes).required().error(MEDIA_MIME_ERR),
		targetUrl: Joi.string().uri().required().error(TARGET_URL_ERR),
		targeting: Joi.array().items({
			tag: Joi.string().required().error(TAG_NAME_ERR),
			score: Joi.number().min(0).max(100).required().error(TAG_SCORE_ERR)
		}).optional(),
		tags: Joi.array().items({
			tag: Joi.string().required().error(TAG_NAME_ERR),
			score: Joi.number().min(0).max(100).required().error(TAG_SCORE_ERR)
		}).required(),
		created: Joi.date().timestamp().required().error(CREATED_DATE_ERR_UNIT),
		title: Joi.string().max(120).required().error(TITLE_ERR_UNIT),
		description: Joi.string().max(300).required().error(DESC_ERR_UNIT),
		archived: Joi.bool().optional().error(ARCHIVED_ERR),
		modified: Joi.allow(null).error(MODIFIED_NOT_NULL_ERR)
	},
	adUnitPut: {
		title: Joi.string().max(120).required().error(TITLE_ERR_UNIT),
		description: Joi.string().max(300).required().error(DESC_ERR_UNIT),
		archived: Joi.bool().required().error(ARCHIVED_ERR),
		modified: Joi.date().timestamp().required().error(MODIFIED_NOT_TIMESTAMP_ERR)
	},
	user: {
		identity: Joi.string().regex(addressRegex).required().error(IDENTITY_ERR),
		mode: Joi.number().valid(validModes).required().error(MODE_ERR),
		signature: Joi.string().regex(signatureRegex).required().error(SIGNATURE_ERR),
		hash: Joi.string().regex(hashRegex).required().error(HASH_ERR),
		authToken: Joi.string().required().error(AUTH_TOKEN_ERR),
		signerAddress: Joi.string().regex(addressRegex).required().error(SIGNER_ADDR_ERR),
		prefixed: Joi.boolean().optional().error(PREFIXED_ERR),
		typedData: Joi.array().items({
			type: Joi.string().required().error(TD_TYPE_ERR),
			name: Joi.string().required().error(TD_NAME_ERR),
			value: Joi.string().required().error(TD_VALUE_ERR)
		}).optional(),
		role: Joi.string().valid(roles).optional().error(ROLE_ERR)
	}
}
