const Item = require('./Item')
const { ItemsTypes, DefaultTargets } = require('adex-constants').items

// console.log('item', Item)

class AdUnit extends Item {
    constructor({
        _meta = {},
        fullName,
        owner,
        img,
        size,
        adType,
        ad_url,
        targets,
        _id,
        _ipfs,
        _description,
        _items,
        _bids,
        _deleted,
        _archived
     } = {}) {
        super({
            fullName: fullName,
            owner: owner,
            type: ItemsTypes.AdUnit.id,
            img: img,
            size: size,
            adType: adType,
            _id: _id,
            _ipfs: _ipfs,
            _description: _description,
            _items: _items,
            _meta: _meta
        })

        this.banner = _meta.banner || img
        this.ad_url = _meta.ad_url || ad_url
        this.targets = _meta.targets || targets
    }

    get banner() { return this._meta.banner }
    set banner(value) { this._meta.banner = value }

    get adUrl() { return this._meta.ad_url }
    set adUrl(value) { this._meta.ad_url = value }

    get targets() { return this._meta.targets }
    set targets(value) { this._meta.targets = value || DefaultTargets }

    static updateTargets(targets, target, newValue, newWeight) {
        // TODO: validate target
        target = Object.assign({}, target)
        target.value = newValue
        if (!!newWeight || (newWeight === 0)) {
            target.weight = newWeight
        }

        targets = targets.slice(0)
        let hasThisTarget = false

        for (let i = 0; i < targets.length; i++) {
            let currentTarget = targets[i]
            if (currentTarget.name === target.name) {
                targets[i] = target
                hasThisTarget = true
                break
            }
        }

        if (!hasThisTarget) targets.push(target)

        return targets
    }
}

module.exports = AdUnit
