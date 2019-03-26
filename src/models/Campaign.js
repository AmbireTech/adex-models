const Base = require('./Base')
// const ItemsTypes = require('adex-constants').items.ItemsTypes

class Campaign extends Base {
    constructor({
        adUnits = [],
        leader,
        follower,
        maxPerImpression,
        minPerImpression,
        targeting,
        created,
        nonce
    } = {}) {

        //TODO:  decide to keep it in meta or not
        this.from = _from || _meta.from
        this.to = _to || _meta.to

        return this
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

