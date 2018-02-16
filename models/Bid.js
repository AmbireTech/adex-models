const { BID_STATES } = require('adex-constants').exchange
const { ipfsHashTo32BytesHex, toLowerCaseString } = require('./../helpers')

console.log('BID_STATES', BID_STATES)

// TODO: extend Base?
class Bid {
    constructor({
        _id,
        _contractId,
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
        _signature = {},
        _exchangeAddr,
        clicksCount = 0 // only node
    } = {}) {
        // TODO: validate types!!!
        // TODO: getters/setters
        this.id = _id
        this.contractId = _contractId
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
        this.exchangeAddr = _exchangeAddr
        this.clicksCount = clicksCount //maybe get/set
        return this
    }

    get id() { return this._id }
    set id(value) { this._id = value }

    get contractId() { return this._contractId }
    set contractId(value) { this._contractId = value }

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

    get exchangeAddr() { return this._exchangeAddr }
    set exchangeAddr(value) { this._exchangeAddr = value }

    //NOTE: web3 eip sign schema - DO NOT CHANGE !!!
    get typed() {
        return [
            { type: 'address', name: 'Advertiser', value: toLowerCaseString(this.advertiser) },
            { type: 'bytes32', name: 'Ad Unit ID', value: toLowerCaseString(ipfsHashTo32BytesHex(this.adUnit)) },
            { type: 'uint', name: 'Opened', value: toLowerCaseString(this.opened) },
            { type: 'uint', name: 'Target', value: toLowerCaseString(this.target) },
            { type: 'uint', name: 'Amount', value: toLowerCaseString(this.amount) },
            { type: 'uint', name: 'Timeout', value: toLowerCaseString(this.timeout) },
            { type: 'address', name: 'Exchange', value: toLowerCaseString(this.exchangeAddr) },
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
