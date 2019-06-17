const bs58 = require('bs58')

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
const getMediaUrlWithProvider = (mediaUrl = 'ipfs://', provider ='') => {
    return provider + mediaUrl.substring(7)
}

module.exports = {
    ipfsHashTo32BytesHex: ipfsHashTo32BytesHex,
    from32BytesHexIpfs: from32BytesHexIpfs,
    toLowerCaseString: toLowerCaseString,
    getAdSizeByType: getAdSizeByType,
    getMediaUrlWithProvider: getMediaUrlWithProvider
}