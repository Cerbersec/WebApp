const express = require('express')
const router = express.Router()
const { storeController } = require('../controllers')
const { userController } = require('../controllers')

router.get('/', express.static('../frontend/public'))


router.get('/store/productinfo/:productId', storeController.getProductbyID)
router.get('/store/products/:page', storeController.getProducts)
router.get('/store/reviews/:productid', storeController.getReviews)
router.post('/store/reviews/create', storeController.verifyToken, storeController.postReview)

router.get('/store/categories', storeController.getCategories)
//router.get('/store/search', storeController.getSearch)
//router.get('/store/filter', storeController.getFilter)

router.post('/store/checkout', userController.verifyToken,storeController.postCheckout) //for dev
//router.post('/store/checkout', ensureAuthenticated, storeController.postCheckout)
//router.get('/store/payment/success', ensureAuthenticated, storeController.getPaymentSuccess)

router.get('/orders',userController.verifyToken,storeController.getOrders)
router.get('/orders/:orderid',userController.verifyToken,storeController.getOrderByID)

module.exports = router