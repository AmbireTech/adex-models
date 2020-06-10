const AdUnit = require('./AdUnit')
const AdSlot = require('./AdSlot')
const Campaign = require('./Campaign')
const Audience = require('./Audience')

// DODO: Remove
const itemClassByName = {
    AdUnit,
    AdSlot,
    Campaign,
    Audience
}

module.exports = {
    itemClassByName: itemClassByName
}
