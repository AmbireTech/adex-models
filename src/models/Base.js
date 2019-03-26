const Helper = require('./../helpers')

/**
 * NOTE: We use _meta as constructor argument in order to make new instances of the object from plain objects
 * and use validations with setters but keep plain object in redux store
 */
class Base {

    plainObj() {
        let plain = Object.assign({}, this)
        return plain
    }

    static getIpfsMetaUrl(ipfs, ipfsGate) {
        let url = ipfsGate + ipfs

        return url
    }

    // NOTE: update without mutating the item (required by redux)
    static updateObject({ item = {}, ownProps = {}, meta = {}, newValues = {}, objModel = null } = {}) {
        if (!objModel) throw 'objModel is required!'

        let newData = Object.assign({}, meta, ownProps, newValues) //TODO: fix it - use only newValues
        let newItem = new objModel(item)

        for (let key in newData) {
            if (newData.hasOwnProperty(key) && key in newItem) {

                let value = newData[key]

                if (value instanceof Date) {
                    value = value.getTime()
                }

                if (Array.isArray(value)) {
                    value = [...value]
                }

                newItem[key] = value
            }
        }

        newItem.modifiedOn = Date.now()
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

                if (Array.isArray(value)) {
                    value = [...value]
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
