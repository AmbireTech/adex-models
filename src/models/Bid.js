const { BID_STATES } = require('adex-constants').exchange
const { ipfsHashTo32BytesHex, toLowerCaseString } = require('./../helpers')

class Bid {
    constructor({
        _id,//Adex exchange contract id (getBidID) also used as db id because it's meant to be unique
        _state = BID_STATES.DoesNotExist.id,
        _advertiser = '', //address
        _adUnit = '',//bytes32 (ipfs hash)
        _adUnitId = '',//only node
        _tokenAddr = 0,//address
        _tokenAmount = 0,//uint
        _validators = [],//address[]
        _validatorRewards = [],//uint[]
        _nonce = 0, // unit
        _goal = 0,//uint
        _timeout = 0,//uint
        _opened,
        sizeAndType = 0, // only node
        _signature = {},
        _exchangeAddr,
        clicksCount = 0, // only node
        tags
    } = {}) {
        this.id = _id
        this.state = _state
        this.advertiser = _advertiser
        this.adUnit = _adUnit
        this.adUnitId = _adUnitId
        this.tokenAddr = _tokenAddr
        this.tokenAmount = _tokenAmount
        this.validators = _validators
        this.validatorRewards = _validatorRewards
        this.nonce = _nonce
        this.goal = _goal
        this.timeout = _timeout
        this.sizeAndType = sizeAndType
        this.opened = _opened
        this.signature = _signature
        this.exchangeAddr = _exchangeAddr
        this.clicksCount = clicksCount //maybe get/set
        this.tags = tags
        return this
    }

    get id() { return this._id }
    set id(value) { this._id = value }

    get state() { return this._state }
    set state(value) { this._state = parseInt(value, 10) }

    get advertiser() { return this._advertiser }
    set advertiser(value) { this._advertiser = toLowerCaseString(value || '') }

    get adUnit() { return this._adUnit }
    set adUnit(value) { this._adUnit = value._ipfs || value || '' }

    get adUnitId() { return this._adUnitId }
    set adUnitId(value) { this._adUnitId = value._id || value || '' }

    get tokenAddr() { return this._tokenAddr }
    set tokenAddr(value) { this._tokenAddr = value }

    get tokenAmount() { return this._tokenAmount }
    set tokenAmount(value) { this._tokenAmount = value }

    get validators() { return this._validators }
    set validators(value) { this._validators = value }

    get validatorRewards() { return this._validatorRewards }
    set validatorRewards(value) { this._validatorRewards = value }

    get nonce() { return this._nonce }
    set nonce(value) { this._nonce = value }

    get goal() { return this._goal }
    set goal(value) { this._goal = value }

    get timeout() { return this._timeout }
    set timeout(value) { this._timeout = value }

    get opened() { return this._opened }
    set opened(value) { this._opened = value || Date.now() }

    get signature() { return this._signature }
    set signature(value) { this._signature = value }

    get exchangeAddr() { return this._exchangeAddr }
    set exchangeAddr(value) { this._exchangeAddr = value }

    get values() {
        return [
            {
                type: 'bytes32[7]', name: 'values', value: [
                    toLowerCaseString(this.advertiser),
                    toLowerCaseString(ipfsHashTo32BytesHex(this.adUnit)),
                    toLowerCaseString(this.goal),
                    toLowerCaseString(this.timeout),
                    toLowerCaseString(this.tokenAddr),
                    toLowerCaseString(this.tokenAmount),
                    toLowerCaseString(this.nonce),
                    toLowerCaseString(this.validators),
                    toLowerCaseString(this.validatorRewards)
                ]
            },
            { type: 'address[]', name: 'validators', value: [...this.validators] },
            { type: 'uint[]', name: 'validatorRewards', value: [...this.validatorRewards] },
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
