const express = require('express')
const router = express.Router()
const { storeController } = require('../controllers')
const { authJwt } = require('../middleware')

router.get('/', express.static('../frontend/public'))

router.get('/products/:productid', storeController.getProductbyID)
router.post('/products', storeController.getProducts)
router.post('/productcount', storeController.getProductCountByCategory)

router.get('/reviews/:productid', storeController.getReviews)
router.post('/reviews/create', authJwt.verifyToken, storeController.postReview)

router.get('/categories', storeController.getCategories)

router.post('/checkout', authJwt.verifyToken, storeController.postCheckout)

router.post('/payment', authJwt.verifyToken, storeController.postPayment)

router.post('/createsuccess', authJwt.verifyToken, storeController.postSuccess)

router.get('/orders', authJwt.verifyToken, storeController.getOrders)
router.get('/orders/:orderid', authJwt.verifyToken, storeController.getOrderByID)

module.exports = router