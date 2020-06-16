const Base = require('./Base')

class Audience extends Base {
    constructor({
        id = '',        
        campaignId = null,
        version = '1',
        inputs = {},
        owner = '',
        created = null,
        modified = null,
        title = '',
        description = '',
        archived = false,
        temp = {},
    } = {}) {
        super()

        this.id = id
        this.campaignId = campaignId
        this.version = version
        this.inputs = inputs
        this.owner = owner
        this.created = created
        this.modified = modified
        this.title = title
        this.description = description
        this.archived = archived
        this.temp = temp

        return this
    }

    get marketAdd() {
        return this.deepCopyObj({
            campaignId: this. campaignId,
            version: this.version,
            inputs: this.inputs,
            title: this.title,
        })
    }

    get marketDbAdd() {
        return this.deepCopyObj({
            campaignId: this. campaignId,
            version: this.version,
            inputs: this.inputs,
            title: this.title,
            owner: this.owner,
            created: this.created,
        })
    }

    get marketDbUpdate() {
        return this.deepCopyObj({
            version: this.version,
            inputs: this.inputs,
            title: this.title,
            archived: this.archived,
            modified: this.modified
        })
    }

    get marketUpdate() {
        return this.deepCopyObj({
            version: this.version,
            inputs: this.inputs,
            title: this.title,
            archived: this.archived,
        })
    }
}

module.exports = Audience
