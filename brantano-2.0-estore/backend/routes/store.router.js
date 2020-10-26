const express = require('express')
const router = express.Router()
const { storeController } = require('../controllers')
//const ensureAuthenticated = require('../modules/ensureAuthenticated')
//const paypal_config = require('../config/paypal-config')
//const paypal = require('paypal-rest-sdk')

router.get('/', express.static('../frontend/public'))

router.get('/store/products/:page', storeController.getProducts)
router.get('/store/products/:productId', storeController.getProduct)

//router.get('/store/categories', storeController.getCategories)
//router.get('/store/search', storeController.getSearch)
//router.get('/store/filter', storeController.getFilter)

//router.get('/store/checkout/:cartId', ensureAuthenticated, storeController.getCheckout)
//router.get('/store/payment/success', ensureAuthenticated, storeController.getPaymentSuccess)

module.exports = router