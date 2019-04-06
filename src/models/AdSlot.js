const Base = require('./Base')

class AdSlot extends Base {
    constructor({
        // Spec props
        type,
        tags,
        owner,
        created,
        // Non spec props
        ipfs = '',
        title = '',
        description = '',
        fallbackMediaUrl = '',
        fallbackMediaMime = '',
        fallbackTargetUrl = '',
        archived,
        modified
    } = {}) {
        super()

        // Spec props
        this.type = type
        this.tags = tags
        this.owner = owner
        this.created = created

        // Non spec props
        this.ipfs = ipfs
        this.title = title
        this.description = description
        this.fallbackMediaUrl = fallbackMediaUrl
        this.fallbackMediaMime = fallbackMediaMime
        this.fallbackTargetUrl = fallbackTargetUrl
        this.archived = archived
        this.modified = modified

        return this
    }

    // TODO: change to adUrl 
    get adUrl() { return this.fallbackMediaUrl }

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

module.exports = AdSlot
