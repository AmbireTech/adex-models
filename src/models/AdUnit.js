const Base = require('./Base')

class AdUnit extends Base {
    constructor({
        // Spec props
        type = '',
        mediaUrl = '',
        mediaMime = '',
        targetUrl = '',
        targeting = [],
        tags = [],
        owner = '',
        created = null,
        // Non spec props
        ipfs = '',
        title = '',
        description = '',
        archived = false,
        modified = null,
        // UI temp
        temp = {}
    } = {}) {
        super()

        // Spec props
        this.type = type
        this.mediaUrl = mediaUrl
        this.mediaMime = mediaMime
        this.targetUrl = targetUrl
        this.targeting = targeting
        this.tags = tags
        this.owner = owner
        this.created = created

        // Non spec props
        this.ipfs = ipfs
        this.title = title
        this.description = description
        this.archived = archived
        this.modified = modified

        this.temps = temp

        return this
    }

    // TODO: change to adUrl 
    get adUrl() { return this.targetUrl }

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
