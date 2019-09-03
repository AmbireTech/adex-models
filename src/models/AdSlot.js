const Base = require('./Base')
const AdUnit = require('./AdUnit')

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
        fallbackUnit =  null,
        mediaUrl = '',
        mediaMime = '',
        targetUrl = '',
        minPerImpression = null, 
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
        this.fallbackUnit = fallbackUnit
        this.minPerImpression = minPerImpression
        this.archived = archived
        this.modified = modified

        // Platform related props
        this.temp = temp
        this.status = status

        // Used for easier fallback unit creation
        this.mediaUrl = mediaUrl
        this.mediaMime = mediaMime
        this.targetUrl = targetUrl

        return this
    }

    get adUrl() { return this.targetUrl }

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
            fallbackUnit: this.fallbackUnit,
            minPerImpression: this.minPerImpression,
            created: this.created
                ? new Date(this.created).getTime()
                : Date.now()
        })
    }

    get marketDbAdd() {
        return this.deepCopyObj({
            id: this.ipfs,
            ipfs: this.ipfs,
            owner: this.owner,
            type: this.type,
            tags: this.tags,
            title: this.title,
            description: this.description,
            fallbackUnit: this.fallbackUnit,
            minPerImpression: this.minPerImpression,
            created: this.created,
            archived: this.archived,
            modified: this.modified
        })
    }

    get marketDbUpdate() {
        return this.deepCopyObj({
            title: this.title,
            description: this.description,
            fallbackUnit: this.fallbackUnit,
            minPerImpression: this.minPerImpression,
            archived: this.archived,
            modified: this.modified
        })
    }

    get marketAdUnitAdd() {
        return new AdUnit({
          type: this.type,
          mediaUrl: this.mediaUrl,
          mediaMime: this.mediaMime,
          targetUrl: this.targetUrl,
          targeting: [],
          tags: [],
          owner: this.owner,
          created: this.created
                ? new Date(this.created).getTime()
                : Date.now()
        })
    }

    get marketUpdate() {
        return this.deepCopyObj({
            title: this.title,
            description: this.description,
            fallbackUnit: this.fallbackUnit,
            archived: this.archived,
            modified: this.modified
        })
    }
}

module.exports = AdSlot
