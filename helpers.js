const slug = require('slug')
const unidecode = require('unidecode')

const slugify = (str, legth = 32) => {
    if (!str || (typeof str !== 'string')) return ''
    let slugified = slug(unidecode(str), { lower: true }).substring(0, legth)
    // console.log('slugified', slugified)
    return slugified
}

module.exports = {
    slugify: slugify
}