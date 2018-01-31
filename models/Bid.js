const { BID_STATES } = require('adex-constants').exchange

// TODO: extend Base?
class Bid {
    constructor({
        _id = null,
        _state = BID_STATES.DoesNotExist.id,
        _advertiser = null, //address
        _adUnit = null,//bytes32 (ipfs hash or node id)
        _publisher = null, //address
        _adSlot = null,//bytes32
        _acceptedTime = null,//uint
        _amount = 0,//uint
        _target = 0,//uint
        _timeout = 0,//uint
        _publisherConfirmation = false,//bytes32
        _advertiserConfirmation = false,//bytes32
    } = {}) {
        // TODO: validate types!!!
        // TODO: getters/setters
        this.id = _id
        this.state = _state
        this.amount = _amount
        this.advertiser = _advertiser
        this.adUnit = _adUnit
        this.publisher = _publisher
        this.adSlot = _adSlot
        this.acceptedTime = _acceptedTime
        this.target = _target
        this.timeout = _timeout
        this.publisherConfirmation = _publisherConfirmation
        this.advertiserConfirmation = _advertiserConfirmation
        return this
    }

    get id() { return this._id }
    set id(value) { this._id = value }

    get state() { return this._state }
    set state(value) { this._state = parseInt(value) }

    get amount() { return this._amount }
    set amount(value) { this._amount = parseInt(value) }

    get advertiser() { return this._advertiser }
    set advertiser(value) { this._advertiser = value }

    get adUnit() { return this._adUnit }
    set adUnit(value) { this._adUnit = value }

    get publisher() { return this._publisher }
    set publisher(value) { this._publisher = value }

    get adSlot() { return this._adSlot }
    set adSlot(value) { this._adSlot = value }

    get acceptedTime() { return this._acceptedTime }
    set acceptedTime(value) { this._acceptedTime = parseInt(value) }

    get target() { return this._target }
    set target(value) { this._target = parseInt(value) }

    get timeout() { return this._timeout }
    set timeout(value) { this._timeout = parseInt(value) }

    get publisherConfirmation() { return this._publisherConfirmation }
    set publisherConfirmation(value) { this._publisherConfirmation = value }

    get advertiserConfirmation() { return this._advertiserConfirmation }
    set advertiserConfirmation(value) { this._advertiserConfirmation = value }

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
