const { Joi } = require('celebrate')
const types = require('./constants').AdUnitsTypes
const mimeTypes = require('./constants').MimeTypes
const { SignatureModes } = require('./constants')
const {
    ipfsRegex,
    ipfsIdRegex,
    typeRegex,
    addressRegex,
    signatureRegex,
    hashRegex,
    campaignAddrRegex
} = require('./validations').Regexes
const validModes = Object.keys(SignatureModes).map(key => SignatureModes[key])
const roles = ['advertiser', 'publisher']
// because joi will accept as valid "http:/some.com", "http:/", "http://" with scheme prop to uri\
// translate the regex ^ - starts with http:// ot https:// and then at least one non white space character [/S]+
// then use .uri to validate the rest of the url
const errors = require('./errors')
const targetUrlSchema = Joi.string().regex(/^((http:\/\/)|(https:\/\/))[\S]+/).uri({ scheme: ['http', 'https'], allowQuerySquareBrackets: true })
const numericString = Joi.string().regex(/^\d+$/)
const slotMinPerImpression = Joi.object().allow(null).pattern(/^/, numericString).optional().error(new Error(errors.SLOT_MIN_PER_IMPR))
// TODO: bump celebrate/joi version to add tlsd validations (joi 16+) for slot website
// That will require update of using .allow([]) (it is not allowed at joi 16+)

module.exports = {
    adSlotPost: {
        type: Joi.string().regex(typeRegex).allow(types).required().error(new Error(errors.TYPE_ERR_SLOT)),
        tags: Joi.array().items({
            tag: Joi.string().required().error(new Error(errors.TAG_NAME_ERR)),
            score: Joi.number().min(0).max(100).required().error(new Error(errors.TAG_SCORE_ERR))
        }).required(),
        created: Joi.date().timestamp().required().error(new Error(errors.CREATED_DATE_ERR_SLOT)),
        title: Joi.string().min(3).max(120).required().error(new Error(errors.TITLE_ERR_SLOT)),
        description: Joi.string().allow('').max(300).optional().error(new Error(errors.DESC_ERR_SLOT)),
        fallbackUnit: Joi.string().allow(null).regex(ipfsIdRegex).optional(), //.error(new Error(errors.FALLBACK_UNIT_IPFS_ID_ERR)),
        minPerImpression: slotMinPerImpression,
        website: Joi.string().required().regex(/^(https:\/\/)[\S]+/).uri({ scheme: ['http', 'https']}).error(new Error(errors.SLOT_WEBSITE_ERR)),
        archived: Joi.bool().optional().error(new Error(errors.ARCHIVED_ERR)),
        modified: Joi.allow(null).error(new Error(errors.MODIFIED_NOT_NULL_ERR))
    },
    adSlotPut: {
        title: Joi.string().min(3).max(120).required().error(new Error(errors.TITLE_ERR_SLOT)),
        description: Joi.string().allow('').max(300).optional().error(new Error(errors.DESC_ERR_SLOT)),
        fallbackUnit: Joi.string().allow(null).length(46).optional().regex(ipfsIdRegex).error(new Error(errors.FALLBACK_UNIT_IPFS_ID_ERR)),
        minPerImpression: slotMinPerImpression,
        archived: Joi.bool().optional().error(new Error(errors.ARCHIVED_ERR)),
        website: Joi.string().allow('').optional().regex(/^(https:\/\/)[\S]+/).uri({ scheme: ['http', 'https']}).error(new Error(errors.SLOT_WEBSITE_ERR)),
        // modified: set it on the server
    },
    adUnitPost: {
        type: Joi.string().regex(typeRegex).allow(types).required().error(new Error(errors.TYPE_ERR_UNIT)),
        mediaUrl: Joi.string().length(53).regex(ipfsRegex).required().error(new Error(errors.IPFS_URL_ERR)),
        mediaMime: Joi.string().valid(mimeTypes).required().error(new Error(errors.MEDIA_MIME_ERR)),
        targetUrl: targetUrlSchema.required().error(new Error(errors.TARGET_URL_ERR)),
        targeting: Joi.array().items({
            tag: Joi.string().required().error(new Error(errors.TAG_NAME_ERR)),
            score: Joi.number().min(0).max(100).required().error(new Error(errors.TAG_SCORE_ERR))
        }).optional(),
        tags: Joi.array().items({
            tag: Joi.string().required().error(new Error(errors.TAG_NAME_ERR)),
            score: Joi.number().min(0).max(100).required().error(new Error(errors.TAG_SCORE_ERR))
        }).required(),
        created: Joi.date().timestamp().required().error(new Error(errors.CREATED_DATE_ERR_UNIT)),
        title: Joi.string().min(3).max(120).required().error(new Error(errors.TITLE_ERR_UNIT)),
        description: Joi.string().allow('').max(300).optional().error(new Error(errors.DESC_ERR_UNIT)),
        archived: Joi.bool().optional().error(new Error(errors.ARCHIVED_ERR)),
        modified: Joi.allow(null).error(new Error(errors.MODIFIED_NOT_NULL_ERR)),
        passback: Joi.bool().optional().error(new Error(errors.PASSBACK_ERR))
    },
    adUnitPut: {
        title: Joi.string().min(3).max(120).required().error(new Error(errors.TITLE_ERR_UNIT)),
        description: Joi.string().allow('').max(300).optional().error(new Error(errors.DESC_ERR_UNIT)),
        archived: Joi.bool().optional().error(new Error(errors.ARCHIVED_ERR)),
        // modified: set it on the server
    },
    user: {
        identity: Joi.string().regex(addressRegex).required().error(new Error(errors.IDENTITY_ERR)),
        mode: Joi.number().valid(validModes).required().error(new Error(errors.MODE_ERR)),
        signature: Joi.string().regex(signatureRegex).required().error(new Error(errors.SIGNATURE_ERR)),
        hash: Joi.string().regex(hashRegex).required().error(new Error(errors.HASH_ERR)),
        authToken: Joi.string().required().error(new Error(errors.AUTH_TOKEN_ERR)),
        signerAddress: Joi.string().regex(addressRegex).required().error(new Error(errors.SIGNER_ADDR_ERR)),
        prefixed: Joi.boolean().optional().error(new Error(errors.PREFIXED_ERR)),
        typedData: Joi.array().items({
            type: Joi.string().required().error(new Error(errors.TD_TYPE_ERR)),
            name: Joi.string().required().error(new Error(errors.TD_NAME_ERR)),
            value: Joi.string().required().error(new Error(errors.TD_VALUE_ERR))
        }).optional(),
        role: Joi.string().valid(roles).optional().error(new Error(errors.ROLE_ERR))
    },
    validator: {
        url: Joi.string().uri().required().error(new Error(errors.VAL_URL_ERR)),
        addr: Joi.string().regex(addressRegex).optional().error(new Error(errors.VAL_ADDR_ERR))
    },
    campaignPut: {
        title: Joi.string().min(3).max(120).required().error(new Error(errors.TITLE_ERR_CAMPAIGN)),
    },
    account: {
        email: Joi.string().email({ allowUnicode: false }).required().error(new Error(errors.ACCOUNT_EMAIL_ERR)),
    },
    audiencePost: {
        version: Joi.string().min(1).max(69).required().error(new Error(errors.AUDIENCE_VERSION_ERR)),
        inputs: Joi.object().required().error(new Error(errors.AUDIENCE_INPUTS_ERR)),
        title: Joi.string().allow(null).min(3).max(300).optional().error(new Error(errors.AUDIENCE_TITLE_ERR)),
    },
    audiencePost: {
        version: Joi.string().min(1).max(69).required().error(new Error(errors.AUDIENCE_VERSION_ERR)),
        inputs: Joi.object().required().error(new Error(errors.AUDIENCE_INPUTS_ERR)),
        title: Joi.string().allow(null).min(3).max(300).optional().error(new Error(errors.AUDIENCE_TITLE_ERR)),
    }

}
