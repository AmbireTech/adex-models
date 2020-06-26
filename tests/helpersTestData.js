const deepCopyObj = (obj) => {
    const deepCopy = JSON.parse(JSON.stringify(obj))
    return deepCopy
}

const audienceInput1 = {
    "version": "1",
    "inputs": {
        "location": {
            "in": [
                "TIER_3" // x1.5
            ],
            "apply": "in"
        },
        "categories": {
            "in": [
                "IAB25-6" // 0.2
            ],
            "apply": [
                "in"
            ]
        },
        "publishers": {
            "in": [
                "{\"hostname\":\"hicomm.bg\",\"publisher\":\"0x99D162298ffC4ECd949BF574c2959130c8d2D8f8\"}"
            ],
            "apply": "in"
        },
        "advanced": {
            "includeIncentivized": true,
            "disableFrequencyCapping": true
        }
    },
}

const audienceInput2 = deepCopyObj(audienceInput1)
audienceInput2.inputs.location.in = ['US'] // x4
audienceInput2.inputs.categories.in = ['IAB3'] // 0.6

const audienceInput3 = deepCopyObj(audienceInput1)
audienceInput3.inputs.location.in = ['TIER_1', 'TIER_4'] // x4, x1
audienceInput3.inputs.categories.apply = ['in', 'nin']
audienceInput3.inputs.categories.in = ['IAB16'] // 0.4 - in is Required for input (translated to empty rule if not selected)
audienceInput3.inputs.categories.nin = ['IAB23', 'IAB24'] // not - 3, 0.1, other min 0.2

const audienceInput4 = deepCopyObj(audienceInput1)
audienceInput4.inputs.location.in = ['TIER_2', 'TIER_3'] // x2.5, x1.5
audienceInput4.inputs.categories.apply = ['in', 'nin']
audienceInput4.inputs.categories.in = [] // 'in' is Required for input but if empty means all
audienceInput4.inputs.categories.nin = ['IAB24'] // not - 0.2 - 3

const audienceInput5 = deepCopyObj(audienceInput1)
audienceInput5.inputs.location.in = ['TIER_2', 'TIER_3'] // x2.5, x1.5
audienceInput5.inputs.categories.apply = ['in', 'nin']
audienceInput5.inputs.categories.in = ['ALL'] // 'in' is Required for input (translated to empty rule if 'ALL' not selected)
audienceInput5.inputs.categories.nin = ['IAB24'] // not - 0.2 - 3

const audienceInput6 = deepCopyObj(audienceInput1)
audienceInput6.inputs.location.apply = 'nin'
audienceInput6.inputs.location.nin = ['TIER_1'] // x2.5
audienceInput6.inputs.categories.in = ['IAB3'] // 0.6

const audienceInput7 = deepCopyObj(audienceInput1)
audienceInput7.inputs.location.apply = 'in'
audienceInput7.inputs.location.in = ['TIER_1','TIER_2', 'TIER_3', 'TIER_4'] // x1, x4
audienceInput7.inputs.categories.in = ['IAB3'] // 0.6

const audienceInput8 = deepCopyObj(audienceInput1)
audienceInput8.inputs.location.apply = 'in'
audienceInput8.inputs.location.in = ['DE','BA', 'GD', 'PR'] // 1 3 2 4
audienceInput8.inputs.categories.in = ['IAB3'] // 0.6


const audienceInput9 = deepCopyObj(audienceInput1)
audienceInput9.inputs.location.apply = 'nin'
audienceInput9.inputs.location.nin = ['TIER_1', 'BG'] // max x2.5 in x1
audienceInput9.inputs.categories.in = ['IAB3'] // 0.6


const minByCategory = {
    IAB1: 0.5, // 'Arts & Entertainment'
    IAB2: 0.5, // 'Automotive'
    IAB3: 0.6, //'Business'
    IAB4: 0.69, //'Careers'
    IAB5: 0.42, //'Education'
    IAB6: 0.33, //'Family & Parenting'
    IAB7: 0.69, //'Health & Fitness'
    IAB8: 0.28, //'Food & Drink'
    IAB9: 0.5, //'Hobbies & Interests'
    IAB10: 0.2, //'Home & Garden'
    IAB11: 3, //'Law, Government, & Politics'
    IAB12: 0.6, //'News / Weather / Information'
    IAB13: 1, //'Personal Finance'
    IAB14: 0.2, //'Society'
    IAB15: 0.42, //'Science'
    IAB16: 0.4, //'Pets'
    IAB17: 0.72, //'Sports'
    IAB18: 0.69, //'Style & Fashion'
    IAB19: 0.314, //'Technology & Computing'
    IAB20: 0.7, //'Travel'
    IAB21: 0.9, //'Real Estate'
    IAB22: 0.6, //'Shopping'
    IAB23: 3, // 'Religion & Spirituality'
    IAB24: 0.1, //'Uncategorize'
    IAB25: 0.2, //"Non-Standard Content"
    IAB26: 3, //'Illegal Content'
}

const countryTiersCoefficients = {
    TIER_1: 4,
    TIER_2: 2.5,
    TIER_3: 1.5,
    TIER_4: 1,
}

const decimals = 18

// match audienceInput1 Suggested { min: 0.3, max: 0.3 }
const pricingBounds1 = {
    min: '300000000000000000',
    max: '300000000000000000'
}

// match audienceInput2 Suggested { min: 2.4, max: 2.4 }
const pricingBounds2 = {
    min: '2400000000000000000',
    max: '2400000000000000000'
}

// match audienceInput3 Suggested { min: 0.4, max: 1.6 }
const pricingBounds3 = {
    min: '400000000000000000',
    max: '1600000000000000000'
}

// match audienceInput4 Suggested { min: 0.3, max: 7.5 }
const pricingBounds4 = {
    min: '300000000000000000',
    max: '7500000000000000000'
}

// match audienceInput5 Suggested { min: 0.3, max: 7.5 }
const pricingBounds5 = {
    min: '300000000000000000',
    max: '7500000000000000000'
}

// match audienceInput6 Suggested { min: 0.6, max: 1.5 }
const pricingBounds6 = {
    min: '600000000000000000',
    max: '1500000000000000000'
}

module.exports = {
    audienceInput1,
    audienceInput2,
    audienceInput3,
    audienceInput4,
    audienceInput5,
    audienceInput6,
    audienceInput7,
    audienceInput8,
    audienceInput9,
    decimals,
    pricingBounds1,
    pricingBounds2,
    pricingBounds3,
    pricingBounds4,
    pricingBounds5,
    pricingBounds6,
    minByCategory,
    countryTiersCoefficients
}
