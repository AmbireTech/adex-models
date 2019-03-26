const Base = require('./Base')

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
        this.adUnits = adUnits
        this.leader = leader
        this.follower = follower
        this.maxPerImpression = maxPerImpression
        this.minPerImpression = minPerImpression
        this.targeting = targeting
        this.created = created
        this.nonce = nonce

        return this
    }

    get adUnits() { return this._ }
    set adUnits(value) { this._ = value }

    get leader() { return this._leader }
    set leader(value) { this._leader = value }

    get follower() { return this._follower}
    set follower(value) { this._follower = value }

    get maxPerImpression() { return this._maxPerImpression }
    set maxPerImpression(value) { this._maxPerImpression = value }

    get minPerImpression() { return this._minPerImpression }
    set minPerImpression(value) { this._minPerImpression = value }

    get targeting() { return this._targeting }
    set targeting(value) { this._targeting = value }

    get created() { return this._created }
    set created(value) { this._created = value }

    get nonce() { return this._nonce }
    set nonce(value) { this._nonce = value }
}

module.exports = Campaign

