const express = require('express')
const router = express.Router()
const { adminController } = require('../controllers')
const { authJwt } = require('../middleware')

router.get('/', [authJwt.verifyToken, authJwt.isAdministrator], adminController.test)
router.post('/products/add', [authJwt.verifyToken, authJwt.isAdministrator], adminController.putProduct)
router.post('/products/update/:product_id', [authJwt.verifyToken, authJwt.isAdministrator], adminController.updateProduct)
router.get('/products/delete/:product_id', [authJwt.verifyToken, authJwt.isAdministrator], adminController.removeProduct)

module.exports = router