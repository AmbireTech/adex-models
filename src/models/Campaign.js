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
        super()
        
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
}

module.exports = Campaign

