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
        slotUrl,
        _id,
        _ipfs,
        _description,
        _items,
        _bids,
        _deleted,
        _archived,
        _fallbackAdImg = { url: null, ipfs: null, type: null, type_id: null, mime: null, originalName: null },
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

        this.slotUrl = _meta.slotUrl || slotUrl
        this._fallbackAdImg = _fallbackAdImg
        this.fallbackAdUrl = _fallbackAdUrl

        return this
    }

    get slotUrl() { return this._meta.slotUrl }
    set slotUrl(value) { this._meta.slotUrl = value }

    get fallbackAdImg() { return this._fallbackAdImg }
    set fallbackAdImg(value) { this._fallbackAdImg = value }

    get fallbackAdUrl() { return this._fallbackAdUrl }
    set fallbackAdUrl(value) { this._fallbackAdUrl = value }
}

module.exports = AdSlot
