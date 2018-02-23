const Helper = require('./../helpers')

/**
 * NOTE: We use _meta as constructor argument in order to make new instances of the object from plain objects
 * and use validations with setters but keep plain object in redux store
 */
class Base {
    constructor({ fullName = '', _ipfs = '', _meta = {}, _modifiedOn, _deleted, _archived } = {}) {
        /**
         * NOTE: The meta field is the one saved into ipfs and it cannot be changed
         * ipfs field will corresponding to the value of meta field
         *  meta and ipfs field should not be changed because the exchange bits will keep the ipfs hash of the meta field
         */
        this._meta = {}

        this.fullName = _meta.fullName || fullName
        this.createdOn = _meta.createdOn

        /**
         * NOTE: props only available on the UI/anex-node
         */

        this.ipfs = _ipfs
        this.modifiedOn = _modifiedOn
        this.deleted = _deleted || false
        this.archived = _archived || false
    }

    // Meta (ipfs) props (can NOT be changed)
    get meta() { return this._meta }

    get createdOn() { return this._meta.createdOn }
    set createdOn(value) { this._meta.createdOn = value }

    get fullName() { return this._meta.fullName }
    set fullName(value) { this._meta.fullName = value }

    // Dapp/adex-node fields (can be changed)
    get ipfs() { return this._ipfs };
    set ipfs(value) { this._ipfs = value }

    get modifiedOn() { return this._modifiedOn }
    set modifiedOn(value) { this._modifiedOn = value }

    get archived() { return this._archived }
    set archived(value) { this._archived = value }

    get deleted() { return this._deleted }
    set deleted(value) { this._deleted = value }

    plainObj() {
        let plain = Object.assign({}, this)
        return plain
    }

    static getIpfsMetaUrl(ipfs, ipfsGate) {
        let url = ipfsGate + ipfs

        return url
    }

    // NOTE: update without mutating the item (required by redux)
    static updateObject({ item = {}, ownProps = {}, meta = {}, newValues = {}, objModel = null, dirtyProps } = {}) {
        if (!objModel) throw 'objModel is required!'

        let newData = Object.assign({}, meta, ownProps, newValues) //TODO: fix it - use one
        let newItem = new objModel(item)

        // console.log('newItem', newItem)
        let hasDirtyProps = Array.isArray(dirtyProps)
        if (hasDirtyProps) dirtyProps = dirtyProps.slice(0)

        for (let key in newData) {
            if (newData.hasOwnProperty(key) && key in newItem) {

                let value = newData[key]

                if (value instanceof Date) {
                    value = value.getTime()
                }

                newItem[key] = value

                if (hasDirtyProps && dirtyProps.indexOf(key) < 0) {
                    dirtyProps.push(key)
                }
            }
        }

        newItem.modifiedOn = Date.now()
        newItem.dirtyProps = dirtyProps
        let plainObj = newItem.plainObj()

        return plainObj
    }

    // TODO: remove this
    static updateMeta(item, meta, dirtyProps) {
        let newItem = Object.assign({}, item)
        let newMeta = Object.assign({}, newItem._meta)
        let hasDirtyProps = Array.isArray(dirtyProps)
        if (hasDirtyProps) dirtyProps = dirtyProps.slice(0)

        // TODO: Handle remove key value
        for (let key in meta) {
            if (meta.hasOwnProperty(key) && newMeta.hasOwnProperty(key)) {

                let value = meta[key] //|| newMeta[key]

                if (value instanceof Date) {
                    value = value.getTime()
                }

                newMeta[key] = value

                if (hasDirtyProps && dirtyProps.indexOf(key) < 0) {
                    dirtyProps.push(key)
                }
            }
        }

        newItem.dirtyProps = dirtyProps
        newItem._meta = newMeta

        return newItem
    }
}

module.exports = Base
