const bs58 = require('bs58')
const { CountryTiers, OsGroups } = require('./constants')
const { formatUnits, parseUnits } = require('@ethersproject/units')

const IPFS_BASE_58_LEADING = '1220'

const ipfsHashTo32BytesHex = (ipfsHash) => {
    let ipfs58Buf = bs58.decode(ipfsHash)
    let hex = ipfs58Buf.toString('hex')
        .replace(new RegExp('^' + IPFS_BASE_58_LEADING), '0x')
    return hex
}

const from32BytesHexIpfs = (ipfsHex) => {
    let fullHex = ipfsHex
        .replace(new RegExp('^' + '0x'), IPFS_BASE_58_LEADING)

    let bytes = Buffer.from(fullHex, 'hex')
    let ipfsHash = bs58.encode(bytes)

    return ipfsHash
}

const toLowerCaseString = (obj) => {
    //Maybe defaut value ot validation but for its current use case is good to throw
    return obj.toString().toLowerCase()
}

const getAdSizeByType = (type) => {
    const [width, height] = (type.split('_')[1]).split('x')

    return {
        width,
        height,
        valueTxt: type,
        label: 'LABEL_SIZE_PX',
        labelArgs: [width, height]
    }
}

// TODO: fix it
const getMediaUrlWithProvider = (mediaUrl = 'ipfs://', provider = '') => {
    return provider + mediaUrl.substring(7)
}

const areAllCountriesSelected = (inputCountries = []) =>
    inputCountries && inputCountries.length ? Object.keys(CountryTiers).every(c => inputCountries.includes(c)) : false

const areAllDevicesSelected = (inputDevices = []) =>
    inputDevices && inputDevices.length ? Object.keys(OsGroups).every(c => inputDevices.includes(c)) : false

const inputCountriesToRuleCountries = (inputCountries = []) => {
    const ruleCountries = inputCountries.reduce((all, c) => {
        const countries = CountryTiers[c] ? CountryTiers[c].countries : [c]
        return all.concat(countries)
    }, [])
        .filter((c, i, all) => all.indexOf(c) === i)

    return ruleCountries
}

// by userAgentOS
const inputDevicesToRuleDevices = (inputDevices = []) => {
    const ruleDevices = inputDevices.reduce((all, d) => {
        const agentOs = OsGroups[d] ? OsGroups[d].oss : [c]
        return all.concat(agentOs)
    }, [])
        .filter((c, i, all) => all.indexOf(c) === i)

    return ruleDevices
}

const getLevelOneCategory = cat =>
    cat.split('-')[0]

const getSuggestedPricingBoundsV1 = ({ minByCategory, countryTiersCoefficients, audienceInput }) => {
    const { inputs } = audienceInput
    const { location = {}, categories = {}, publishers = {}, advanced = {} } = inputs

    const selectedCategoriesMinCpms = Object.values(Object.fromEntries(Object.entries(minByCategory).filter(([key, value]) => {

        const inSelected = !categories.apply.includes('in') ||
            !categories.in ||
            !categories.in.length ||
            categories.in.some(c => c === 'ALL' || (key === getLevelOneCategory(c)))

        const notExcluded = !categories.apply.includes('nin') ||
            !(categories.nin || []).some(c => key === getLevelOneCategory(c))

        return inSelected && notExcluded
    })))

    // Set min category from all as default if no selected categories
    const minCategoryCpm = Math.min(...Object.values(minByCategory))
    const minCat = selectedCategoriesMinCpms.length ? Math.min(...selectedCategoriesMinCpms) : minCategoryCpm
    const maxCat = selectedCategoriesMinCpms.length ? Math.max(...selectedCategoriesMinCpms) : minCategoryCpm

    const selectedCountryCoefficients = Object.entries(CountryTiers).filter(([key, value]) => {
        if (location.apply == 'allin') {
            return true
        }

        const isInThisTier = (location[location.apply] || []).some(c => (c === key) || value.countries.includes(c))

        if (location.apply == 'in') {
            return isInThisTier
        }
        if (location.apply == 'nin') {
            return !isInThisTier
        }

        return false
    }).map(([key, _]) => countryTiersCoefficients[key])

    // Set min country coefficient from all as default if no selected countries
    const minTierCoefficient = Math.min(...Object.values(countryTiersCoefficients))
    const minCountryCoef = selectedCountryCoefficients.length ? Math.min(...selectedCountryCoefficients) : minTierCoefficient
    const maxCountryCoef = selectedCountryCoefficients.length ? Math.max(...selectedCountryCoefficients) : minTierCoefficient


    // Returns decimal strings as user input values because it is not used for calculations
    return { IMPRESSION: { min: (minCat * minCountryCoef).toFixed(2), max: (maxCat * maxCountryCoef).toFixed(2) } }
}

const getSuggestedPricingBounds = ({ minByCategory, countryTiersCoefficients, audienceInput }) => {
    if (audienceInput.version === '1') {
        return getSuggestedPricingBoundsV1({ minByCategory, countryTiersCoefficients, audienceInput })
    }
}


const getPublisherRulesV1 = publishers => {
    const action = publishers.apply
    if (action === 'allin') {
        return []
    } else {
        const { publisherIds, hostnames } = publishers[action].reduce((rules, value) => {
            const { hostname, publisher } = JSON.parse(value)
            if (hostname) {
                rules.hostnames.add(hostname)
            }
            if (publisher) {
                rules.publisherIds.add(publisher)
            }
            return rules
        }, { publisherIds: new Set(), hostnames: new Set() })

        return [{ onlyShowIf: { [action]: [Array.from(publisherIds.values()), { get: 'publisherId' }] } },
        { onlyShowIf: { [action]: [Array.from(hostnames.values()), { get: 'adSlot.hostname' }] } },
        ]
    }
}

const getClampedNumber = (x, min, max) => {
    if (x < min) {
        return min
    }
    if (x > max) {
        return max
    }

    return x
}

const getSelectedCountryTiersFormAudienceInput = (location) => {
    const { apply } = location
    if (apply === 'in') {
        return Object.fromEntries(Object.entries({ ...CountryTiers })
            .filter(([key, value]) => {
                return location.in.some(x => x === key || value.countries.includes(x))
            })
            .map(([key, value]) => {
                if (location.in.includes(key)) {
                    return [key, value]
                }

                const countries = [...value.countries].filter(x => location.in.includes(x))
                return [key, { ...value, countries }]
            })
        )
    } else if (apply === 'nin') {
        return Object.fromEntries(Object.entries(CountryTiers)
            .filter(([key, value]) => {
                return !location.nin.includes(key) || !value.countries.every(x => location.nin.includes(x))
            })
            .map(([key, value]) => {
                const countries = [...value.countries].filter(x => !location.nin.includes(x))
                return [key, { ...value, countries }]
            }))
    }

    return { ...CountryTiers }
}

const getPriceRulesV1 = ({ audienceInput, countryTiersCoefficients, pricingBounds, decimals }) => {
    const { inputs } = audienceInput
    const { location = {}, categories = {}, publishers = {}, advanced = {} } = inputs
    // using floats for easier math as it is no crucial
    const userPricingBounds = {
        min: parseFloat(formatUnits(pricingBounds.IMPRESSION.min, decimals)),
        max: parseFloat(formatUnits(pricingBounds.IMPRESSION.max, decimals)),
    }

    const selectedTiers = getSelectedCountryTiersFormAudienceInput(location)

    const selectedTiersOrdered = Object.entries(countryTiersCoefficients)
        .filter(([key, value]) => !!selectedTiers[key])
        .sort((a, b) => a[1] - b[1])

    // The lowest tier is with coefficient is 1 as it is already calculated in pricingBounds
    // then we normalize the higher tiers coefficients to the lowest one
    const normalizedCountryTiersCoefficients = Object.fromEntries(selectedTiersOrdered
        .map(([key, value], index, entries) => {
            if (index === 0) {
                return [key, 1]
            } else {
                const normalizedCoefficient = countryTiersCoefficients[key] / countryTiersCoefficients[entries[0][0]]

                return [key, normalizedCoefficient]
            }

        }))

    const topSelectedTier = selectedTiersOrdered.pop()[0]

    const rules = []

    // Add price rules for each tier
    Object.values(selectedTiers).forEach(tier => {
        const multiplier = (normalizedCountryTiersCoefficients[tier.ruleValue])

        const isTopSelectedTier = topSelectedTier === tier.ruleValue

        // If multiplier === 1 this is min tier so no rule
        // If only one tier is selected it actually min tier and top tier at the same time
        // In this case we count it as top tier and set the max bound
        if (multiplier !== 1 || isTopSelectedTier) {

            const price = isTopSelectedTier ? userPricingBounds.max : userPricingBounds.min * multiplier
            console.log('price', price)

            const tierPrice = getClampedNumber(price, userPricingBounds.min, userPricingBounds.max)
            console.log('tierPrice', tierPrice)


            rules.push({
                if: [
                    { in: [[...tier.countries], { get: 'country' }] },
                    { set: ['price.IMPRESSION', { bn: parseUnits(tierPrice.toFixed(8), decimals).toString() }] }
                ]
            })
        }
    })


    return rules
}

const audienceInputToTargetingRules = ({ audienceInput, minByCategory, countryTiersCoefficients, pricingBounds, decimals }) => {
    if (audienceInput.version === '1') {
        const { inputs } = audienceInput
        const { location = {}, categories = {}, publishers = {}, advanced = {}, devices = {} } = inputs
        const allCountriesSelected = location.apply === 'allin' || areAllCountriesSelected(location[location.apply])
        const allDevicesSelected = devices.apply === 'allin' || areAllDevicesSelected(devices[devices.apply])
        const rules = [
            ...(!allCountriesSelected ? [{ onlyShowIf: { [location.apply]: [inputCountriesToRuleCountries(location[location.apply]), { get: 'country' }] } }] : []),
            ...(allCountriesSelected && location.apply === 'in' ? [] : []),
            ...(allCountriesSelected && location.apply === 'nin' ? [{ onlyShowIf: false }] : []),
            ...(getPublisherRulesV1(publishers)),
            ...(categories.apply && categories.apply.includes('in') && !categories.in.includes('ALL') ? [{ onlyShowIf: { intersects: [{ get: 'adSlot.categories' }, categories.in] } }] : []),
            ...(categories.apply && categories.apply.includes('nin') ? [{ onlyShowIf: { not: { intersects: [{ get: 'adSlot.categories' }, categories.nin] } } }] : []),
            ...(advanced.includeIncentivized ? [] : [{ onlyShowIf: { nin: [{ get: 'adSlot.categories' }, 'IAB25-7'] } }]),
            ...(advanced.disableFrequencyCapping ? [] : [{ onlyShowIf: { gt: [{ get: 'adView.secondsSinceCampaignImpression' }, 300] } }]),
            ...(advanced.limitDailyAverageSpending ? [{ onlyShowIf: { lt: [{ get: 'campaignTotalSpent' }, { div: [{ mul: [{ get: 'campaignSecondsActive' }, { get: 'campaignBudget' }] }, { get: 'campaignSecondsDuration' }] }] } }] : []),
            ...(getPriceRulesV1({ audienceInput, minByCategory, countryTiersCoefficients, pricingBounds, decimals })),
            ...(!allDevicesSelected && devices.apply ? [{ onlyShowIf: { [devices.apply]: [inputDevicesToRuleDevices(devices[devices.apply]), { get: 'userAgentOS' }] } }] : []),
        ]

        return rules
    }

    throw new Error('INVALID_AUDIENCE_INPUT_VERSION')
}

const slotRulesInputToTargetingRules = ({ rulesInput, suggestedMinCPM, decimals }) => {
    if (!suggestedMinCPM) {
        throw new Error('INVALID_SUGGESTED_MIN_CPM')
    }
    if (!decimals) {
        throw new Error('INVALID_DECIMALS')
    }
    if (rulesInput.version === '1') {
        const { inputs } = rulesInput
        const { allowAdultContent = false, autoSetMinCPM = false } = inputs
        const rules = [
            ...(autoSetMinCPM || suggestedMinCPM
                ? [
                    // NOTE: We pass CPM but the rule is for impression
                    { onlyShowIf: { gt: [{ get: 'price.IMPRESSION' }, { bn: parseUnits(suggestedMinCPM, decimals).div(1000).toString() }] } }]
                : []),
            ...(allowAdultContent ? [] : [{ onlyShowIf: { not: { intersects: [{ get: 'adUnitCategories' }, ['IAB25-2', 'IAB25-3', 'IAB25-4', 'IAB25-5']] } } }]),
        ]

        return rules
    }

    throw new Error('INVALID_RULES_INPUT_VERSION')
}

const useInputValuePerMileToTokenValue = (value, decimals) => {
    return parseUnits(value, decimals).div(1000).toString()
}

const userInputPricingBoundsPerMileToRulesValue = ({ pricingBounds, decimals }) => {
    if (!pricingBounds) {
        throw new Error('ERR_PRICING_BOUNDS_NOT_PROVIDED')
    } else if (!pricingBounds.IMPRESSION) {
        throw new Error('ERR_PRICING_BOUNDS_IMPRESSION_NOT_PROVIDED')
    }

    const pricingBoundsInRuleValue = {
        IMPRESSION: {
            min: useInputValuePerMileToTokenValue(pricingBounds.IMPRESSION.min, decimals),
            max: useInputValuePerMileToTokenValue(pricingBounds.IMPRESSION.max, decimals)
        }

    }

    return pricingBoundsInRuleValue
}

module.exports = {
    ipfsHashTo32BytesHex,
    from32BytesHexIpfs,
    toLowerCaseString,
    getAdSizeByType,
    getMediaUrlWithProvider,
    audienceInputToTargetingRules,
    slotRulesInputToTargetingRules,
    getSuggestedPricingBounds,
    userInputPricingBoundsPerMileToRulesValue,
    useInputValuePerMileToTokenValue
}