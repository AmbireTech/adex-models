/**
 * NOTE: We use _meta as constructor argument in order to make new instances of the object from plain objects
 * and use validations with setters but keep plain object in redux store
 */
class Base {

    plainObj() {
        const plain = Object.assign({}, this)
        return plain
    }

    plainDeepCopy() {
        const plain = this.plainObj()
        const deepCopy = JSON.parse(JSON.stringify(plain))
        return deepCopy
    }

    static getIpfsMetaUrl(ipfs, ipfsGate) {
        let url = ipfsGate + ipfs

        return url
    }

    // NOTE: update without mutating the item (required by redux)
    static updateObject({ item = {}, newValues = {}, objModel = null } = {}) {
        if (!objModel) throw 'objModel is required!'

        const newData = Object.assign({}, newValues)
        const newItem = new objModel(item)

        for (const key in newData) {
            if (newData.hasOwnProperty(key) && key in newItem) {

                let value = newData[key]

                if (value instanceof Date) {
                    value = value.getTime()
                }

                if (Array.isArray(value)) {
                    value = [...value]
                } else if (!!value && (typeof value === 'object')) {
                    value = Object.assign({}, value)
                }

                newItem[key] = value
            }
        }
        
        const plainObj = newItem.plainDeepCopy()

        return plainObj
    }
}

module.exports = Base
