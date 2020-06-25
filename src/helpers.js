const bs58 = require('bs58')
const { CountryTiers } = require('./constants')

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

const inputCountriesToRuleCountries = inputCountries => {
    const ruleCountries = inputCountries.reduce((all, c) => {
        const countries = CountryTiers[c] ? CountryTiers[c].countries : [c]
        return all.concat(countries)
    }, [])
        .filter((c, i, all) => all.indexOf(c) === i)

    return ruleCountries
}


const getPublisherRulesV1 = publishers => {
    const action = publishers.apply
    if (action === 'allin') {
        return []
    } else {
        const { publisherIds, hostnames } = publishers[action].reduce((rules, value) => {
            const { hostname, publisher } = JSON.parse(value)
            rules.hostnames.add(hostname)
            rules.publisherIds.add(publisher)
            return rules
        }, { publisherIds: new Set(), hostnames: new Set() })

        return [{ onlyShowIf: { [action]: [Array.from(publisherIds.values()), { get: 'publisherId' }] } },
        { onlyShowIf: { [action]: [Array.from(hostnames.values()), { get: 'adSlot.hostname' }] } },
        ]
    }
}

const audienceInputToTargetingRules = audienceInput => {
    if (audienceInput.version === '1') {
        const { inputs } = audienceInput
        const { location = {}, categories = {}, publishers = {}, advanced = {} } = inputs
        const rules = [
            ...(location.apply !== 'allin' ? [{ onlyShowIf: { [location.apply]: [inputCountriesToRuleCountries(location[location.apply]), { get: 'country' }] } }] : []),
            ...(getPublisherRulesV1(publishers)),
            ...(categories.apply.includes('in') && !categories.in.includes('ALL') ? [{ onlyShowIf: { intersects: [{ get: 'adSlot.categories' }, categories.in] } }] : []),
            ...(categories.apply.includes('nin') ? [{ onlyShowIf: { not: { intersects: [{ get: 'adSlot.categories' }, categories.nin] } } }] : []),
            ...(advanced.includeIncentivized ? [] : [{ onlyShowIf: { nin: [{ get: 'adSlot.categories' }, 'IAB25-7'] } }]),
            ...(advanced.disableFrequencyCapping ? [] : [{ onlyShowIf: { gt: [{ get: 'adView.secondsSinceCampaignImpression' }, 300] } }]),
            ...(advanced.limitDailyAverageSpending ? [{ onlyShowIf: { lt: [{ get: 'campaignTotalSpent' }, { mul: [{ div: [{ get: 'campaignSecondsActive' }, { get: 'campaignSecondsDuration' }] }, { get: 'campaignBudget' }] }] } }] : []),
        ]

        return rules
    }
}

const getLevelOneCategory = cat =>
    cat.split('-')[0]

const getToFixedDecimal = num =>
    parseFloat(num.toFixed(2))

const getSuggestedCPMRange = ({ minByCategory, countryTiersCoefficients, audienceInput }) => {
    const { inputs } = audienceInput
    const { location = {}, categories = {}, publishers = {}, advanced = {} } = inputs
    const minCategoryCpm = Math.min(...Object.values(minByCategory))

    const selectedCategoriesMinCpms = Object.values(Object.fromEntries(Object.entries(minByCategory).filter(([key, value]) => {

        const inSelected = !categories.in || !categories.in.length || categories.in.some(c => c === 'ALL' || (key === getLevelOneCategory(c)))
        const inExcluded = (categories.nin || []).some(c => key === getLevelOneCategory(c))

        return inSelected && !inExcluded
    })))

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

        return true
    }).map(([key, _]) => countryTiersCoefficients[key])

    const minTierCoefficient = Math.min(...Object.values(countryTiersCoefficients))
    const minCountryCoef = selectedCountryCoefficients.length ? Math.min(...selectedCountryCoefficients) : minTierCoefficient
    const maxCountryCoef = selectedCountryCoefficients.length ? Math.max(...selectedCountryCoefficients) : minTierCoefficient


    return { min: getToFixedDecimal(minCat * minCountryCoef), max: getToFixedDecimal(maxCat * maxCountryCoef) }
}

module.exports = {
    ipfsHashTo32BytesHex,
    from32BytesHexIpfs,
    toLowerCaseString,
    getAdSizeByType,
    getMediaUrlWithProvider,
    audienceInputToTargetingRules,
    getSuggestedCPMRange
}