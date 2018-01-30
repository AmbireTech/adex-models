const AdUnit = require('./AdUnit')
const AdSlot = require('./AdSlot')
const Channel = require('./Channel')
const Campaign = require('./Campaign')
const { ItemsTypes } = require('adex-constants').items

const itemClassByTypeId = {
    [ItemsTypes.AdUnit.id]: AdUnit,
    [ItemsTypes.AdSlot.id]: AdSlot,
    [ItemsTypes.Campaign.id]: Campaign,
    [ItemsTypes.Channel.id]: Channel
}

module.exports = {
    itemClassByTypeId: itemClassByTypeId
}
