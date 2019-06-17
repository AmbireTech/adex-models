const Base = require('./Base')

class AdSlot extends Base {
    constructor({
        // Spec props
        type = '',
        tags = '',
        owner = '',
        created = null,
        // Non spec props
        ipfs = '',
        title = '',
        description = '',
        fallbackMediaUrl = '',
        fallbackMediaMime = '',
        fallbackTargetUrl = '',
        archived = false,
        modified = null,
        // UI temp
        temp = {}
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

        this.temp = temp

        return this
    }

    get adUrl() { return this.fallbackMediaUrl }

    get spec() {
        return {
            type: this.type,
            tags: this.tags,
            owner: this.owner,
            created: this.created
        }
    }
}

module.exports = AdSlot
