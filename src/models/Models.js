const AdUnit = require('./AdUnit')
const AdSlot = require('./AdSlot')
const Campaign = require('./Campaign')

// DODO: Remove
const itemClassByTypeId = {
    [0]: AdUnit,
    [1]: AdSlot,
    [2]: Campaign,
}

module.exports = {
    itemClassByTypeId: itemClassByTypeId
}
