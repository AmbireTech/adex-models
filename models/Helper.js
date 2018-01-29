const AdUnit = require('./AdUnit')
const AdSlot = require('./AdSlot')
const Channel = require('./Channel')
const Campaign = require('./Campaign')
const { ItemsTypes } = require('adex-constants').items

// NOTE: not cool but better here
function modelByTypeId(type) {
    let model = null
    switch (type) {
        case ItemsTypes.AdUnit.id:
            model = AdUnit
            break
        case ItemsTypes.AdSlot.id:
            model = AdSlot
            break
        case ItemsTypes.Campaign.id:
            model = Campaign
            break
        case ItemsTypes.Channel.id:
            model = Channel
            break
        default:
            break
    }

    return model
}

module.exports = {
    modelByTypeId: modelByTypeId
}
