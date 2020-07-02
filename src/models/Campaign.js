const Base = require('./Base')

class Campaign extends Base {
    constructor({
        // Tx props
        id = '', // After mined
        creator = '', // address
        depositAsset = '', // ERC-20) token addr 
        depositAmount = '', // amount str
        validUntil = null, //in seconds timestamp
        // Spec props
        title = '',
        adUnits = [], // objs with AdUnits spec props
        validators = [], // 2 objs {id: '', url: '', fee: ''} , 1st - leader, 2nd - follower
        pricingBounds = null, //{IMPRESSION: { CLICK: { min: "0", max: "1000" } }}
        maxPerImpression = '', // BigNumStr // OBSOLETE - TODO: remove
        minPerImpression = '', // BigNumStr // OBSOLETE - TODO: remove
        targeting = [], // {tag: '', score: 0} // OBSOLETE - TODO: remove
        targetingRules = null,
        audienceInput = null, // { version: '', inputs: { location: { in: ['TIER_1', 'BG'], nin: ['TIER_4', 'MK'], apply: ['in', 'min'] /*or apply: 'in' in single action mode */ } } 
        minTargetingScore = null, /// optional number // OBSOLETE - TODO: remove
        created = null, // timestamp in milliseconds
        nonce = null, // BigNumStr
        withdrawPeriodStart = null,  // timestamp in milliseconds 
        eventSubmission = {}, // { allow: [{ uids: [channel.creator] }, { uids: null, rateLimit: { type: "ip", timeframe: 1000 } }] }
        activeFrom = null,
        // UI temp
        temp = {},
        status = {},
        state = {}
    } = {}) {
        super()

        this.id = id
        this.creator = creator
        this.depositAsset = depositAsset
        this.depositAmount = depositAmount
        this.validUntil = validUntil

        this.title = title
        this.adUnits = adUnits
        this.validators = validators
        this.pricingBounds = pricingBounds
        this.maxPerImpression = maxPerImpression
        this.minPerImpression = minPerImpression
        this.targeting = targeting
        this.targetingRules = targetingRules
        this.audienceInput = audienceInput
        this.minTargetingScore = minTargetingScore
        this.created = created
        this.nonce = nonce
        this.withdrawPeriodStart = withdrawPeriodStart
        this.eventSubmission = eventSubmission
        this.activeFrom = activeFrom

        this.temp = temp
        this.status = status
        this.state = state

        return this
    }

    get spec() {
        return this.deepCopyObj({
            title: this.title,
            adUnits: this.adUnits,
            validators: this.validators,
            pricingBounds: this.pricingBounds,
            maxPerImpression: this.maxPerImpression,
            minPerImpression: this.minPerImpression,
            targetingRules: this.targetingRules,
            minTargetingScore: this.minTargetingScore,
            created: this.created,
            nonce: this.nonce,
            withdrawPeriodStart: this.withdrawPeriodStart,
            eventSubmission: this.eventSubmission,
            activeFrom: this.activeFrom
        })
    }

    get openReady() {
        return this.deepCopyObj({
            id: this.id,
            creator: this.creator,
            depositAsset: this.depositAsset,
            depositAmount: this.depositAmount,
            validUntil: this.validUntil,
            validUntil: this.validUntil,
            spec: this.spec
        })
    }

    get mediaUrl() {
        return this.adUnits[0] ? this.adUnits[0].mediaUrl : ''
    }

    get audienceInputMarket() {
        return  this.audienceInput && this.audienceInput.version && Object.keys(this.audienceInput.inputs).length ? this.deepCopyObj({
            version: this.audienceInput.version,
            inputs: this.audienceInput.inputs,
        }) : null
    }

    get marketUpdate() {
        return this.deepCopyObj({
            title: this.title,
            targetingRules: this.targetingRules,
            audienceInput: this.audienceInputMarket,
        })
    }

    get marketDbUpdate() {
        return this.deepCopyObj({
            title: this.title,
            targetingRules: this.targetingRules,
            audienceInput: this.audienceInputMarket,
            modified: this.modified,
        })
    }
}

module.exports = Campaign

