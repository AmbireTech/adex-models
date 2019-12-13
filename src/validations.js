const Regexes = {
    ipfsRegex: /(ipfs):\/\/(.){46}?$/,
    ipfsIdRegex: /^Qm[a-zA-z0-9]{44}$/,
	addressRegex: /^0x[0-9A-Fa-f]{40}$/,
	signatureRegex: /^0x[0-9A-Fa-f]{130}$/,
	hashRegex: /^0x[0-9A-Fa-f]{64}$/,
	campaignAddrRegex: /^0x[0-9A-Fa-f]{64}$/,
	typeRegex: /^iab_flex_.{1,}/,
	numberString: /^([0-9]+\.?[0-9]*)$/
}

function isNumberString(str) {
	let isValid = Regexes.numberString.test(str)
	return isValid
}

module.exports = {
	Regexes,
	isNumberString
}