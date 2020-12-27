const express = require('express')
const router = express.Router()
const { infoController } = require('../controllers')

router.get('/shipping', infoController.GetShippingCosts)
router.get('/UpdateShipping', infoController.PostShippingCosts)

module.exports = router