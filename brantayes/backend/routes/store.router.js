const express = require('express')
const router = express.Router()
const { storeController } = require('../controllers')
const { userController } = require('../controllers')

router.get('/', express.static('../frontend/public'))

router.get('/store/productinfo/:productId', storeController.getProductbyID)
router.get('/store/products/:page', storeController.getProducts)

router.get('/store/reviews/:productid', storeController.getReviews)
router.post('/store/reviews/create', userController.verifyToken, storeController.postReview)

router.get('/store/categories', storeController.getCategories)

router.post('/store/checkout', userController.verifyToken,storeController.postCheckout)

router.post('/store/payment', userController.verifyToken, storeController.postPayment)

router.get('/orders',userController.verifyToken,storeController.getOrders)
router.get('/orders/:orderid',userController.verifyToken,storeController.getOrderByID)

module.exports = router