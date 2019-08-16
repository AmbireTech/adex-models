const tape = require('tape')
const testData = require('./testData')
const fetch = require('node-fetch')

const serverUrl = process.env.MOCK_SERVER_URL

function postRequest(obj, endpoint) {
	return fetch(`${serverUrl}/${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(obj)
	})
}

function testRequest(obj, msg, endpoint, pass, t) {
	return postRequest(obj, endpoint)
		.then((res) => t.equals(res.status, pass ? 200 : 500, msg))
		.catch((err) => t.fail(err))
}



tape('AdSlot POST', (t) => {
	const requests = [
		testRequest(testData.workingSlot, 'Slot is OK, should pass', 'adslotpost', true, t),
		testRequest(testData.slotWIthOwner, 'Doesnt accept owner as param', 'adslotpost', false, t),
		testRequest(testData.slotWithIpfs, 'Doesnt accept ipfs as param', 'adslotpost', false, t),
		testRequest(testData.slotWithInvalidType, 'Slot with invalid type should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenCreated, 'Slot with invalid created should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenArchived, 'Slot with invalid archived should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenDescription, 'Slot with too long description should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenFallbackUnit, 'Slot with invalid fallback unit should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenModified, 'Slot with invalid modified field should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenCreated, 'Slot with invalid created should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenTags, 'Slot with invalid tag array should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithBrokenTitle, 'Slot with too long title should fail', 'adslotpost', false, t),
		testRequest(testData.slotWithEmptyDescription, 'Slot with empty description should pass', 'adslotpost', true, t),
		testRequest(testData.slotWithMatchType, 'Slot with type that matches regex should pass', 'adslotpost', true, t),
		testRequest(testData.slotWithNoOptionalKeys, 'Slot with no optional keys should pass', 'adslotpost', true, t)
	]

	Promise.all(requests).then(() => {
		t.end()
	})
})

tape('AdUnit POST', (t) => {
	const requests = [
		testRequest(testData.workingUnit, 'Unit is OK, should pass', true, t),
		testRequest(testData.unitNoOptional, 'Unit with no optional fields should pass', 'adunitpost', true, t),
		testRequest(testData.unitBrokenArchived, 'Unit with broken archived should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenCreated, 'Unit with broken created should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenDesc, 'Unit with broken description should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenMediaUrl, 'Unit with broken media url should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenMime, 'Unit with broken media mime should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenModified, 'Unit with broken modified date should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenPassback, 'Unit with broken passback should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenTags, 'Unit with broken tag array should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenTargetUrl, 'Unit with broken target URL should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenTargeting, 'Unit with broken targeting tags should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenTitle, 'Unit with broken title should cause error', 'adunitpost', false, t),
		testRequest(testData.unitBrokenType, 'Unit with broken type should cause error', 'adunitpost', false, t)
	]

	Promise.all(requests).then(() => {
		t.end()
	})
})

tape('AdSlot PUT', (t) => {
	const requests = [
		testRequest(testData.putSlotWorking, 'Editable slot, should pass', 'adslotput', true, t),
		testRequest(testData.putSlotExtraFields, 'Slot with uneditable fields should cause error', 'adslotput', false, t),
		testRequest(testData.putSlotNoOptional, 'Editing slot with no optional fields should pass', 'adslotput', true, t)
	]

	Promise.all(requests).then(() => {
		t.end()
	})
})

tape('AdUnit PUT', (t) => {
	const requests = [
		testRequest(testData.putUnitWorking, 'Editable unit, should pass', 'adunitput', true, t),
		testRequest(testData.putUnitExtraFields, 'Unit with uneditable fields should cause error', 'adunitput', false, t),
		testRequest(testData.putUnitNoOptional, 'Unit with no optionAl fields should pass', 'adunitput', true, t)
	]
	Promise.all(requests).then(() => {
		t.end()
	})
})