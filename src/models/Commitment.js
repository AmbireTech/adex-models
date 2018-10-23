


class Commitment {
    constructor({
        // Contract props
        _bidId = '', // bytes32
        _tokenAddr = '', // address
        _validUntil = 0, // unit
        _advertiser = '', // address
        _publisher = '', // address
        _validators = [], // address[]
        _validatorRewards, // uint[]
    } = {}) {
        this.bidId = _bidId
        this.tokenAddr = _tokenAddr
        this.validUntil = _validUntil
        this.advertiser = _advertiser
        this.publisher = _publisher
        this.validators = _validators
        this.validatorRewards = _validatorRewards
    }

    get bidId() { return this._bidId }
    set bidId(value) { this._bidId = value }

    get tokenAddr() { return this._tokenAddr }
    set tokenAddr(value) { this._tokenAddr = value }

    get validUntil() { return this._validUntil }
    set validUntil(value) { this._validUntil = value }

    get advertiser() { return this._advertiser }
    set advertiser(value) { this._advertiser = value }

    get publisher() { return this._publisher }
    set publisher(value) { this._publisher = value }

    get validators() { return this._validators }
    set validators(value) { this._validators = value }

    get validatorRewards() { return this._validatorRewards }
    set validatorRewards(value) { this._validatorRewards = value }
}