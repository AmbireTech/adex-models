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
        temp = {},
        status = {}
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

        this.temp = temp
        this.status = status

        return this
    }

    get adUrl() { return this.targetUrl }

    get spec() {
        return this.deepCopyObj({
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
            archived: this.archived,
            modified: this.modified
        })
    }
}

module.exports = AdUnit
