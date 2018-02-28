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
        _modifiedOn,
        _deleted,
        _archived,
        _fallbackAdImg = { url: null, ipfs: null, type: null, type_id: null, mime: null, originalName: null },
        _fallbackAdUrl
    } = {}) {
        super({
            fullName: fullName,
            owner: owner,
            _type: ItemsTypes.AdSlot.id,
            img: img,
            size: size,
            adType: adType,
            _id: _id,
            _ipfs: _ipfs,
            _description: _description,
            _items: _items,
            _meta: _meta,
            _modifiedOn: _modifiedOn,
            _deleted: _deleted,
            _archived: _archived
        })

        this._fallbackAdImg = _fallbackAdImg
        this.fallbackAdUrl = _fallbackAdUrl

        return this
    }

    get fallbackAdImg() { return this._fallbackAdImg }
    set fallbackAdImg(value) { this._fallbackAdImg = value }

    get fallbackAdUrl() { return this._fallbackAdUrl }
    set fallbackAdUrl(value) { this._fallbackAdUrl = value }
}

module.exports = AdSlot
