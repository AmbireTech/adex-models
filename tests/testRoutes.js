const router = require('express').Router()
const { celebrate } = require('celebrate')
const schemas = require('../src/schemas')

router.post('/adSlotPost', celebrate({ body: schemas.adSlotPost}), returnResult)
router.post('/adUnitPost', celebrate({ body: schemas.adUnitPost}), returnResult)
router.post('/adSlotPut', celebrate({ body: schemas.adSlotPut}), returnResult)
router.post('/adUnitPut', celebrate({ body: schemas.adUnitPut}), returnResult)
router.post('/userPost', celebrate({ body: schemas.user }), returnResult)

function returnResult (req, res) {
	return res.send({ success: true })
}

module.exports = router