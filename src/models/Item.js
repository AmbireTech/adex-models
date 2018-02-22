const Base = require('./Base')
const { AdSizesByValue } = require('adex-constants').items
const { toLowerCaseString } = require('./../helpers')
const IPFS_GATE = 'http://localhost:8080/ipfs/' // Config

// ITEM will be AdSlot or AdUnit (Channel/Campaign will be collections)
class Item extends Base {
    constructor({
        _meta = {},
        fullName,
        owner = '',
        _type,
        img = { url: null, ipfs: null, type: null, type_id: null, mime: null, originalName: null },
        size,
        adType,
        _description = '',
        _id = '',
        _ipfs = '',
        _modifiedOn,
        _deleted,
        _archived,
        _items
    } = {}) {
        super({
            fullName: fullName,
            _ipfs: _ipfs,
            _meta: _meta,
            _modifiedOn: _modifiedOn,
            _deleted: _deleted,
            _archived: _archived
        })

        this.owner = _meta.owner || owner //TODO: set this on the node?
        this.type = _meta.type || _type
        this.img = _meta.img || img
        this.size = _meta.size || size
        this.adType = _meta.adType || adType

        this.id = _id
        this.items = _items || []
        this.description = _description
    }

    // Meta (ipfs) props (can NOT be changed)
    get owner() { return this._meta.owner }
    set owner(value) { this._meta.owner = toLowerCaseString(value || '') }

    get type() { return this._meta.type }
    set type(value) {
        this._meta.type = value
        this._type = value // NOTE: used in the db for faster lookup
    }

    get img() { return this._meta.img }
    set img(value) { this._meta.img = value }

    // TODO: labels
    get size() { return this._meta.size }
    set size(value) { this._meta.size = parseInt(value) }

    get sizeTxtValue() { return AdSizesByValue[this.size].valueTxt }

    get adType() { return this._meta.adType }
    set adType(value) { this._meta.adType = parseInt(value) }

    // Dapp/adex-node fields (can be changed)
    get id() { return this._id }
    set id(value) { this._id = value }

    // Description only visible for the owner
    get description() { return this._description }
    set description(value) { this._description = value }

    get collections() { return this._collections }
    set collections(value) { this._collections = value }

    // NOTE: _items keep the ids of collections Campaign/Channel that thi item is in (as in the db to avoid big arrays there)  
    get items() { return this._items }
    set items(value) { this._items = value }

    // UI props    
    get imgUrl() {
        return Item.getImgUrl(this.img)
    }

    get sizeAndType() {
        return Item.sizeAndType({ adType: this.adType, size: this.size })
    }

    //NOTE: Keep it because in the UI are used plain objects and for listing more items they are not instances ot Item
    static getImgUrl(img, ipfsGate = IPFS_GATE) {
        // TODO: GET ipfs gateway from some config!!!
        if (!img) return null
        if (img.url) return img.url
        if (img.ipfs) return ipfsGate + img.ipfs
        if (img.type && img.type_id) {
            switch (img.type) {
                case 'ipfs':
                    return ipfsGate + img.type_id
                default: return ''
            }
        }
        if (typeof img === 'string') {
            return img
        }
        // used for temp url in the dapp, must be deleted before 
        if (img.tempUrl) {
            return img.tempUrl
        }
    }

    static sizeAndType({ adType, size }) {
        let sizeAndType = 0
        if (adType && size) {
            sizeAndType = parseInt(adType + '' + size)
        }

        return sizeAndType
    }

    // TODO: change it to work with the new models
    // TODO: item type when add/remove ?
    static addItem(item, toAdd) {
        if (toAdd._id) toAdd = toAdd._id

        let itemIndex = item._items.indexOf(toAdd)
        if (itemIndex > -1) return

        let newItem = Object.assign({}, item)
        let newItems = newItem._items.slice(0)
        newItems.push(toAdd)
        newItem._items = newItems
        newItem.modifiedOn = Date.now()

        return newItem
    }

    static removeItem(item, toRemove) {
        if (toRemove._id) toRemove = toRemove._id

        let itemIndex = item._items.indexOf(toRemove)
        if (itemIndex < 0) return

        let newItem = Object.assign({}, item)
        let newItems = newItem._items.slice(0)
        newItems.splice(itemIndex, 1)
        newItem._items = newItems
        newItem.modifiedOn = Date.now()

        return newItem
    }
}

module.exports = Item
