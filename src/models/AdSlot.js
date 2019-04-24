const Base = require('./Base')

class AdSlot extends Base {
    constructor({
        id = '', // we will use ipfs for ad slot
        // Spec props
        type = '',
        tags = [],
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
        temp = {},
        status = {}
    } = {}) {
        super()

        this.id = id || ipfs

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
        this.status = status

        return this
    }

    get adUrl() { return this.fallbackMediaUrl }

    
    get mediaUrl() {
        return this.fallbackMediaUrl
    }

    get spec() {
        return this.deepCopyObj({
            type: this.type,
            tags: this.tags,
            owner: this.owner,
            created: this.created
        })
    }

    get marketAdd() {
        return this.deepCopyObj({
            type: this.type,
            tags: this.tags,
            title: this.title,
            description: this.description,
            fallbackMediaUrl: this.fallbackMediaUrl,
            fallbackMediaMime: this.fallbackMediaMime,
            fallbackTargetUrl: this.fallbackTargetUrl,
            created: this.created
                ? new Date(this.created).getTime()
                : Date.now(),
            type: this.type,
        })
    }

    get marketUpdate() {
        return this.deepCopyObj({
            title: this.title,
            description: this.description,
            fallbackMediaUrl: this.fallbackMediaUrl,
            fallbackMediaMime: this.fallbackMediaMime,
            fallbackTargetUrl: this.fallbackTargetUrl,
            archived: this.archived,
            modified: this.modified
        })
    }
}

module.exports = AdSlot
