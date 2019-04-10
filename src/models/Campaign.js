const Base = require('./Base')

class Campaign extends Base {
    constructor({
        // Tx props
        id = '', // After mined
        creator = '', // address
        depositAsset = '', // ERC-@) token addr 
        depositAmount = '',
        validUntil = 0, //in seconds
        // Spec props
        adUnits = [],
        validators = [], //{id: '', url: '', fee: ''}
        maxPerImpression = '',
        minPerImpression = '',
        targeting = [], 
        created = null,
        nonce,
        // UI temp
        temp = {}
    } = {}) {
        super()

        this.id = id
        this.creator = creator
        this.depositAsset = depositAsset
        this.depositAmount = depositAmount
        this.validUntil = validUntil
                
        this.adUnits = adUnits
        this.validators = validators
        this.maxPerImpression = maxPerImpression
        this.minPerImpression = minPerImpression
        this.targeting = targeting
        this.created = created
        this.nonce = nonce

        this.temp = temp

        return this
    }
}

module.exports = Campaign

