const { BID_STATES } = require('adex-constants').exchange
const { ipfsHashTo32BytesHex } = require('./../helpers')

console.log('BID_STATES', BID_STATES)

// TODO: extend Base?
class Bid {
    constructor({
        _id,
        _state = BID_STATES.DoesNotExist.id,
        _advertiser = '', //address
        _adUnit = '',//bytes32 (ipfs hash)
        _adUnitId = '',//only node
        _publisher = '', //address
        _adSlot = '',//bytes32
        _adSlotId = '',//only node 
        _acceptedTime = 0,//uint
        _amount = 0,//uint
        _target = 0,//uint
        _timeout = 0,//uint
        _publisherConfirmation = '',//bytes32
        _advertiserConfirmation = '',//bytes32
        _opened,
        sizeAndType = 0, // only node
        _signature = {}
    } = {}) {
        // TODO: validate types!!!
        // TODO: getters/setters
        this.id = _id
        this.state = _state
        this.advertiser = _advertiser
        this.adUnit = _adUnit
        this.adUnitId = _adUnitId
        this.publisher = _publisher
        this.adSlot = _adSlot
        this.adSlotId = _adSlotId
        this.acceptedTime = _acceptedTime
        this.amount = _amount
        this.target = _target
        this.timeout = _timeout
        this.publisherConfirmation = _publisherConfirmation
        this.advertiserConfirmation = _advertiserConfirmation
        this.sizeAndType = sizeAndType
        this.opened = _opened
        this.signature = _signature
        return this
    }

    get id() { return this._id }
    set id(value) { this._id = value }

    get state() { return this._state }
    set state(value) { this._state = parseInt(value) }

    get advertiser() { return this._advertiser }
    set advertiser(value) { this._advertiser = value || '' }

    get adUnit() { return this._adUnit }
    set adUnit(value) { this._adUnit = value._ipfs || value || '' }

    get adUnitId() { return this._adUnitId }
    set adUnitId(value) { this._adUnitId = value._id || value || '' }

    get publisher() { return this._publisher }
    set publisher(value) { this._publisher = value || '' }

    get adSlot() { return this._adSlot }
    set adSlot(value) { this._adSlot = value._ipfs || value || '' }

    get adSlotId() { return this._adSlotId }
    set adSlotId(value) { this._adSlotId = value._id || value || '' }

    get acceptedTime() { return this._acceptedTime }
    set acceptedTime(value) { this._acceptedTime = parseInt(value || 0) }

    get amount() { return this._amount }
    set amount(value) { this._amount = parseInt(value || 0) }

    get target() { return this._target }
    set target(value) { this._target = parseInt(value || 0) }

    get timeout() { return this._timeout }
    set timeout(value) { this._timeout = parseInt(value || 0) }

    get publisherConfirmation() { return this._publisherConfirmation }
    set publisherConfirmation(value) { this._publisherConfirmation = value || '' }

    get advertiserConfirmation() { return this._advertiserConfirmation }
    set advertiserConfirmation(value) { this._advertiserConfirmation = value || '' }

    get opened() { return this._opened }
    set opened(value) { this._opened = value || Date.now() }

    get signature() { return this._signature }
    set signature(value) { this._signature = value }

    // web3 sign
    get typed() {
        return [
            { type: 'address', name: 'Advertiser', value: this.advertiser },
            { type: 'bytes32', name: 'Ad Unit (ipfs in hex)', value: ipfsHashTo32BytesHex(this.adUnit) },
            { type: 'uint', name: 'Opened (UTC in ms)', value: this.opened },
            { type: 'uint', name: 'Amount / 10000 = ADX (Decimals of precision: 4)', value: this.amount.toString() },
            { type: 'uint', name: 'Target (clicks)', value: this.target.toString() },
            { type: 'uint', name: 'Timeout (in ms)', value: this.timeout.toString() }
        ]
    }

    plainObj() {
        return Object.assign({}, this)
    }

    static updateBid(bid, key, value, dirtyProps) {
        // TODO: handle prop types
        let newBid = new Bid(bid)
        let hasDirtyProps = Array.isArray(dirtyProps)
        if (hasDirtyProps) dirtyProps = dirtyProps.slice(0)
        // TODO: Validate bid props
        if (key in newBid) {
            newBid[key] = value

            if (hasDirtyProps && dirtyProps.indexOf(key) < 0) {
                dirtyProps.push(key)
            }
        }

        return newBid
    }
}

module.exports = Bid
