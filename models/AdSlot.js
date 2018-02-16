const Item = require('./Item')
const ItemsTypes = require('adex-constants').items.ItemsTypes

class AdSlot extends Item {
    constructor({
        _meta = {},
        fullName,
        owner,
        img,
        size,
        adType,
        _id,
        _ipfs,
        _description,
        _items,
        _bids,
        _deleted,
        _archived,
        _fallbackImageUrl,
        _fallbackAdUrl
    } = {}) {
        super({
            fullName: fullName,
            owner: owner,
            type: ItemsTypes.AdSlot.id,
            img: img,
            size: size,
            adType: adType,
            _id: _id,
            _ipfs: _ipfs,
            _description: _description,
            _items: _items,
            _meta: _meta
        })

        this.bids = _meta.bids || []
        //TODO: Ad it with img obj
        this.fallbackImageUrl = _fallbackImageUrl
        this.fallbackAdUrl = _fallbackAdUrl

        return this
    }

    //TODO: check if it is used and delete it!!
    get bids() { return this._bids }
    set bids(value) { this._bids = value }

    get fallbackImageUrl() { return this._fallbackImageUrl }
    set fallbackImageUrl(value) { this._fallbackImageUrl = value }

    get fallbackAdUrl() { return this._fallbackAdUrl }
    set fallbackAdUrl(value) { this._fallbackAdUrl = value }
}

module.exports = AdSlot
