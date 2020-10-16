const express = require('express')
const router = express.Router()
//const ensureAuthenticated = require('../modules/ensureAuthenticated')
//const paypal_config = require('../config/paypal-config')
//const paypal = require('paypal-rest-sdk')
const { storeController } = require('../controllers')

//home
router.get('/', express.static('../frontend/public'))

//get products
router.get('/store/products', storeController.getProducts)

//get product
router.get('/store/products/:productId', storeController.getProduct)

//router.get('/store/categories', storeController.getCategories)

//router.get('/store/search', storeController.getSearch)

//router.get('/store/filter', storeController.getFilter)

//router.get('/store/checkout/:cartId', ensureAuthenticated, storeController.getCheckout)

//router.get('/store/payment/success', ensureAuthenticated, storeController.getPaymentSuccess)

module.exports = router