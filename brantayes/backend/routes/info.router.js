const express = require('express')
const router = express.Router()
const { infoController } = require('../controllers')
const { authJwt } = require('../middleware')

router.get('/shipping', infoController.GetShippingCosts)
router.get('/UpdateShipping', infoController.PostShippingCosts)
router.post('/updatelogo', [authJwt.verifyToken, authJwt.isAdministrator], infoController.updateLogo)

module.exports = router