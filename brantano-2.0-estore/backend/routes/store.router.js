const express = require('express')
const router = express.Router()
const { storeController } = require('../controllers')
const ensureAuthenticated = require('../modules/ensureAuthenticated')
//const paypal_config = require('../config/paypal-config')
//const paypal = require('paypal-rest-sdk')

router.get('/', express.static('../frontend/public'))


router.get('/store/productinfo/:productId', storeController.getProductbyID)
router.get('/store/products/:page', storeController.getProducts)

//router.get('/store/categories', storeController.getCategories)
//router.get('/store/search', storeController.getSearch)
//router.get('/store/filter', storeController.getFilter)

router.post('/store/checkout', storeController.postCheckout) //for dev
//router.post('/store/checkout', ensureAuthenticated, storeController.postCheckout)
//router.get('/store/payment/success', ensureAuthenticated, storeController.getPaymentSuccess)

module.exports = router