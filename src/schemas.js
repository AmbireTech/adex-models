const { Joi } = require('celebrate')
const types = require('./constants').AdUnitsTypes
const mimeTypes = require('./constants').MimeTypes
const {
	ipfsRegex,
	typeRegex,
	addressRegex,
	signatureRegex,
	hashRegex
} = require('./constants').Regexes
const validModes = [0, 1, 2]
const roles = ['advertiser', 'publisher']

module.exports = {
	adSlotPost: {
		type: Joi.string().regex(typeRegex).allow(types).required().error('TYPE_ERR_SLOT'),
		tags: Joi.array().items({
			tag: Joi.string().required().error('TAG_NAME_ERR'),
			score: Joi.number().min(0).max(100).required().error('TAG_SCORE_ERR')
		}).required(),
		created: Joi.date().timestamp().required().error('CREATED_DATE_ERR_SLOT'),
		title: Joi.string().min(3).max(120).required().error('TITLE_ERR_SLOT'),
		description: Joi.string().max(300).optional().error('DESC_ERR_SLOT'),
		fallbackMediaUrl: Joi.string().length(53).regex(ipfsRegex).required().error('IPFS_URL_ERR'),
		fallbackMediaMime: Joi.string().valid(mimeTypes).required().error('MEDIA_MIME_ERR'),
		fallbackTargetUrl: Joi.string().uri().required().error('TARGET_URL_ERR'),
		archived: Joi.bool().optional().error('ARCHIVED_ERR'),
		modified: Joi.allow(null).error('MODIFIED_NOT_NULL_ERR')
	},
	adSlotPut: {
		title: Joi.string().min(3).max(120).required().error('TITLE_ERR_SLOT'),
		description: Joi.string().max(300).optional().error('DESC_ERR_SLOT'),
		fallbackMediaUrl: Joi.string().length(53).regex(ipfsRegex).required().error('IPFS_URL_ERR'),
		fallbackMediaMime: Joi.string().valid(mimeTypes).required().error('MEDIA_MIME_ERR'),
		fallbackTargetUrl: Joi.string().uri().required().error('TARGET_URL_ERR'),
		archived: Joi.bool().required().error('ARCHIVED_ERR'),
		modified: Joi.date().timestamp().required().error('MODIFIED_NOT_TIMESTAMP_ERR')
	},
	adUnitPost: {
		type: Joi.string().regex(typeRegex).allow(types).required().error('TYPE_ERR_UNIT'),
		mediaUrl: Joi.string().length(53).regex(ipfsRegex).required().error('IPFS_URL_ERR'),
		mediaMime: Joi.string().valid(mimeTypes).required().error('MEDIA_MIME_ERR'),
		targetUrl: Joi.string().uri().required().error('TARGET_URL_ERR'),
		targeting: Joi.array().items({
			tag: Joi.string().required().error('TAG_NAME_ERR'),
			score: Joi.number().min(0).max(100).required().error('TAG_SCORE_ERR')
		}).optional(),
		tags: Joi.array().items({
			tag: Joi.string().required().error('TAG_NAME_ERR'),
			score: Joi.number().min(0).max(100).required().error('TAG_SCORE_ERR')
		}).required(),
		created: Joi.date().timestamp().required().error('CREATED_DATE_ERR_UNIT'),
		title: Joi.string().min(3).max(120).required().error('TITLE_ERR_UNIT'),
		description: Joi.string().max(300).optional().error('DESC_ERR_UNIT'),
		archived: Joi.bool().optional().error('ARCHIVED_ERR'),
		modified: Joi.allow(null).error('MODIFIED_NOT_NULL_ERR')
	},
	adUnitPut: {
		title: Joi.string().min(3).max(120).required().error('TITLE_ERR_UNIT'),
		description: Joi.string().max(300).optional().error('DESC_ERR_UNIT'),
		archived: Joi.bool().required().error('ARCHIVED_ERR'),
		modified: Joi.date().timestamp().required().error('MODIFIED_NOT_TIMESTAMP_ERR')
	},
	user: {
		identity: Joi.string().regex(addressRegex).required().error('IDENTITY_ERR'),
		mode: Joi.number().valid(validModes).required().error('MODE_ERR'),
		signature: Joi.string().regex(signatureRegex).required().error('SIGNATURE_ERR'),
		hash: Joi.string().regex(hashRegex).required().error('HASH_ERR'),
		authToken: Joi.string().required().error('AUTH_TOKEN_ERR'),
		signerAddress: Joi.string().regex(addressRegex).required().error('SIGNER_ADDR_ERR'),
		prefixed: Joi.boolean().optional().error('PREFIXED_ERR'),
		typedData: Joi.array().items({
			type: Joi.string().required().error('TD_TYPE_ERR'),
			name: Joi.string().required().error('TD_NAME_ERR'),
			value: Joi.string().required().error('TD_VALUE_ERR')
		}).optional(),
		role: Joi.string().valid(roles).optional().error('ROLE_ERR')
	}
}
