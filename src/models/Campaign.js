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
        maxPerImpression = '', // BigNumStr
        minPerImpression = '', // BigNumStr
        targeting = [], // {tag: '', score: 0}
        minTargetingScore = null, /// optional number
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
        this.maxPerImpression = maxPerImpression
        this.minPerImpression = minPerImpression
        this.targeting = targeting
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
            maxPerImpression: this.maxPerImpression,
            minPerImpression: this.minPerImpression,
            targeting: this.targeting,
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
            spec: this.spec
        })
    }

    get mediaUrl() {
        return this.adUnits[0] ? this.adUnits[0].mediaUrl : ''
    }
}

module.exports = Campaign

