const Base = require('./Base')

class AdUnit extends Base {
    constructor({
        id = '', // we will use ipfs for ad unit
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
        passback = false,
        // UI temp
        temp = {},
        status = {}
    } = {}) {
        super()

        this.id = id || ipfs

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
        this.passback = passback

        this.temp = temp
        this.status = status

        return this
    }

    get adUrl() { return this.targetUrl }

    get spec() {
        return this.deepCopyObj({
            ipfs: this.ipfs,
            type: this.type,
            mediaUrl: this.mediaUrl,
            mediaMime: this.mediaMime,
            targetUrl: this.targetUrl,
            targeting: this.targeting,
            owner: this.owner,
            created: this.created
                ? new Date(this.created).getTime()
                : null,
            type: this.type,
        })
    }

    get marketAdd() {
        return this.deepCopyObj({
            type: this.type,
            mediaUrl: this.mediaUrl,
            mediaMime: this.mediaMime,
            targetUrl: this.targetUrl,
            targeting: this.targeting,
            tags: this.tags,
            title: this.title,
            description: this.description,
            archived: this.archived,
            passback: this.passback,
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
            mediaUrl: this.mediaUrl,
            mediaMime: this.mediaMime,
            targetUrl: this.targetUrl,
            targeting: this.targeting,
            tags: this.tags,
            title: this.title,
            description: this.description,
            created: this.created
                ? new Date(this.created)
                : new Date(Date.now()),
            archived: this.archived,
            modified: this.modified,
            passback: this.passback
        })
    }

    get marketDbUpdate() {
        return this.deepCopyObj({
            title: this.title,
            description: this.description,
            archived: this.archived,
            modified: this.modified
        })
    }

    get marketUpdate() {
        return this.deepCopyObj({
            title: this.title,
            description: this.description,
            archived: this.archived,
        })
    }
}

module.exports = AdUnit
