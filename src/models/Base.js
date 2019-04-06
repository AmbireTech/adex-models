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
    static updateObject({ item = {}, newValues = {}, objModel = null } = {}) {
        if (!objModel) throw 'objModel is required!'

        let newData = Object.assign({}, newValues)
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
}

module.exports = Base
