const Base = require('./Base')

class Audience extends Base {
    constructor({
        id = '',
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
            type: this.type,
            inputs: this.inputs,
            title: this.title,
            owner: this.owner,
        })
    }

    get marketDbAdd() {
        return this.deepCopyObj({
            type: this.type,
            inputs: this.inputs,
            title: this.title,
            owner: this.owner,
            created: this.created,
        })
    }

    get marketDbUpdate() {
        return this.deepCopyObj({
            type: this.type,
            inputs: this.inputs,
            title: this.title,
            owner: this.owner,
            created: this.created,
            archived: this.archived,
            modified: this.modified
        })
    }

    get marketUpdate() {
        return this.deepCopyObj({
            type: this.type,
            inputs: this.inputs,
            title: this.title,
            owner: this.owner,
            created: this.created,
            archived: this.archived,
            modified: this.modified
        })
    }
}

module.exports = Audience
