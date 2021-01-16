const express = require('express')
const router = express.Router()
const { infoController } = require('../controllers')
const { authJwt } = require('../middleware')

router.get('/shipping', infoController.GetShippingCosts)
router.post('/updateshipping', [authJwt.verifyToken, authJwt.isAdministrator], infoController.PostShippingCosts)
router.post('/updatelogo', [authJwt.verifyToken, authJwt.isAdministrator], infoController.updateLogo)
router.get('/companyinfo', infoController.getCompanyInfo)
router.post('/updatecompinfo', [authJwt.verifyToken, authJwt.isAdministrator], infoController.postCompanyInfo)

module.exports = router