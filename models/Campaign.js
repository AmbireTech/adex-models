const Item = require('./Item')
const ItemsTypes = require('adex-constants').items.ItemsTypes

class Campaign extends Item {
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
        _bids,
        _syncedIpfs,
        _deleted,
        _items,
        _archived,
        _from,
        _to,
    } = {}) {
        super({
            fullName: fullName,
            owner: owner,
            type: ItemsTypes.Campaign.id,
            img: img,
            size: size,
            adType: adType,
            _id: _id,
            _ipfs: _ipfs,
            _description: _description,
            _items: _items,
            _meta: _meta,
            _syncedIpfs: _syncedIpfs
        })

        //TODO:  decide to keep it in meta or not
        this.from = _from || _meta.from
        this.to = _to || _meta.to
    }

    get from() { return this._from }
    set from(value) {
        this._from = value
        this._meta.from = value
    }

    get to() { return this._to }
    set to(value) {
        this._to = value
        this._meta.to = value
    }
}

module.exports = Campaign

