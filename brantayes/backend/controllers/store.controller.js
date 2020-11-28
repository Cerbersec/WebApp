//PGUR: Put, Get, Update, Remove
const storeDb = require('../db/storeDb')
const models = require('../models')
const config = require('../config/stripe')
const stripe = require("stripe")(config.STRIPE_SECRET_TEST);

const getProducts = async(req, res, next) => {
    const pageNo = req.params.page
    const resultsPerPage = 10
    const searchOffset = (pageNo -1) * resultsPerPage

    try {
        const products = await storeDb.readProducts(resultsPerPage + 1,searchOffset)
        
        if (products.length == 0) {
            return res.status(404).json({
                message: 'products not found'
            })
        }
        res.status(200).json({
            products: products
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getProductbyID = async(req, res, next) => {
    const productId = req.params.productId
    try {
        const product = await storeDb.readProduct(productId)

        if(product== null) {
            return res.status(404).json({
                message: 'product could not be found'
            })
        }
        return res.status(200).json({
            product: product
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const postCheckout = async(req, res, next) => {
    try {
        const { orderlines } = req.body

        const placedOrder = await storeDb.createOrder(orderlines, req.customer_id)
        
        if(placedOrder != null) {
            return res.status(200).json({
                order: placedOrder
            })
        }
        else {
            res.status(500).json({
                message: "Something went wrong, order could not be placed"
            })
        }
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getOrders = async(req, res) => {
    try {
        const orders = await storeDb.readOrders(req.customer_id)
        
        if (orders == null) {
            return res.status(404).json({
                message: 'no orders found'
            })
        }
        res.status(200).json({
            orders: orders
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getOrderByID = async(req, res) => {
    const orderId = req.params.orderid

    try {
        const order = await storeDb.readOrder(req.customer_id, orderId)

        if (order == null) {
            return res.status(404).json({
                message: 'no order found'
            })
        }

        res.status(200).json({
            order: order
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getCategories = async (req, res, next) => {
    try {
        const categories = await storeDb.readCategories()

        if(!categories) {
            return res.status(404).json({
                message: 'no categories found'
            })
        }

        res.status(200).json({
            categories: categories
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getReviews = async (req, res, next) => {

    try {
        const reviews = await storeDb.readReviews(req.params.productid)
        
        if (reviews.length == 0) {
            return res.status(404).json({
                message: 'reviews not found'
            })
        }
        res.status(200).json({
            reviews: reviews
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const postReview = async (req, res, next) => {
    try {
        const { rating, description, productId} = req.body

        //TODO: perform validation => XSS
        const newModel = new models.Review({
            rating: rating,
            description: description,
            review_date: new Date(),
            product_id: productId,
            customer_id: req.customer_id
        })

        const review = await storeDb.createReview(newModel)

        if(!review){
            return res.status(404).send({
                message: 'something went wrong'
            })
        }
        res.status(200).send({
            message: 'review submitted'
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const postPayment = async (req, res, next) => {
    try {
        //process payment for orderId
        const { orderId } = req.body.order_id.orderId;

        const order = await storeDb.readOrder(req.customer_id, orderId)

        if(order){
            if(!order.paid) {
                const amount = order.total_price + order.shipping_costs
                const { id } = req.body

                console.log(amount + " " + id)

                try {
                    const payment = await stripe.paymentIntents.create({
                        amount: amount * 100,
                        currency: "EUR",
                        description: "BRANTAYES.BE",
                        payment_method: id,
                        confirm: true,
                    })

                    //update Order paid status to true
                    const result = await storeDb.updateOrderPaidStatus(orderId, true)

                    res.status(200).send({
                        message: "payment successful",
                        success: true
                    })
                }
                catch(error) {
                    res.status(500).send({
                        message: "payment failed",
                        success: false
                    })
                }
            }
            else {
                res.status(403).send({
                    message: "order already paid",
                    success: false
                })
            }
        }
        else {
            res.status(404).send({
                message: "order does not exist",
                success: false
            })
        }
    }
    catch(error) {
        res.status(500).send({
            message: "something went wrong" + error.message,
            success: false
        })
    }
}

exports.getProducts = getProducts
exports.getProductbyID = getProductbyID
exports.postCheckout = postCheckout
exports.getOrders = getOrders
exports.getOrderByID = getOrderByID
exports.getCategories = getCategories
exports.getReviews = getReviews
exports.postReview = postReview
exports.postPayment = postPayment