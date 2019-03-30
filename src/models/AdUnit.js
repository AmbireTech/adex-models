const Base = require('./Base')
// const { ItemsTypes, DefaultTargets } = require('adex-constants').items

class AdUnit extends Base {
    constructor({
        _meta = {},
        // Spec props
        type,
        mediaUrl,
        mediaMime,
        targetUrl,
        targeting,
        tags,
        owner,
        created,
        // Non spec props
        ipfs,
        title,
        description,
        archived,
        modified
    } = {}) {
        super()

        // Spec props
        this.type = _meta.type || type
        this.mediaUrl = _meta.mediaUrl || mediaUrl
        this.mediaMime = _meta.mediaMime || mediaMime
        this.targetUrl = _meta.targetUrl || targetUrl
        this.targeting = _meta.targeting || targeting
        this.tags = _meta.tags || tags
        this.owner = _meta.owner || owner
        this.created = _meta.created || created

        // Non spec props
        this.ipfs = ipfs
        this.title = title
        this.description = description
        this.archived = archived
        this.modified = modified

        return this
    }

    // Spec props
    get type() { return this._type }
    set type(value) { this._type = value }

    get mediaUrl() { return this._mediaUrl }
    set mediaUrl(value) { this._mediaUrl = value }

    get mediaMime() { return this._mediaMime }
    set mediaMime(value) { this._mediaMime = value }

    get targetUrl() { return this._targetUrl }
    set targetUrl(value) { this._targetUrl = value }

    get targeting() { return this._targeting }
    set targeting(value) { this._targeting = value }

    get tags() { return this._tags }
    set tags(value) { this._tags = value }

    get owner() { return this._owner }
    set owner(value) { this._owner = value }

    get created() { return this._created }
    set created(value) { this._created = value }

    // Non spec props
    get ipfs() { return this._ipfs }
    set ipfs(value) { this._ipfs = value }

    get title() { return this._title }
    set title(value) { this._title = value }

    get description() { return this._description }
    set description(value) { this._description = value }

    get archived() { return this._archived }
    set archived(value) { this._archived = value }

    get modified() { return this._modified }
    set modified(value) { this._modified = value }

    get _meta() {
        return {
            type: this.type,
            mediaUrl: this.mediaUrl,
            mediaMime: this.mediaMime,
            targetUrl: this.targetUrl,
            targeting: this.targeting,
            tags: this.tags,
            owner: this.owner,
            created: this.created,
        }
    }

    // TODO: change to adUrl 
    get adUrl() { return this._meta.ad_url }

    get ad_url() { return this._meta.ad_url }
    set ad_url(value) { this._meta.ad_url = value }

    static updateTargets(targets, target, newTag, newScore) {
        // TODO: validate target
        target = Object.assign({}, target)
        target.tag = newTag
        if (!!newScore || (newScore === 0)) {
            target.score = newScore
        }

        targets = targets.slice(0)
        let hasThisTarget = false

        for (let i = 0; i < targets.length; i++) {
            let currentTarget = targets[i]
            if (currentTarget.tag === target.tag) {
                targets[i] = target
                hasThisTarget = true
                break
            }
        }

        if (!hasThisTarget) targets.push(target)

        return targets
    }
}

module.exports = AdUnit
