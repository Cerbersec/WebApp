//PGUR: Put, Get, Update, Remove
const storeDb = require('../db/storeDb')
const models = require('../models')

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

//TODO: checkout and future cart functionality in its own controller
const postCheckout = async(req, res, next) => {
    try {
        req.checkBody('total_price').notEmpty()
        req.checkBody('shipping_costs').notEmpty()

        req.user = 1
        if (req.user == null) {
            res.json({
                message: "Not logged in"
            })
        }

        const { total_price, shipping_costs} = req.body     

        const newOrder = new models.Order({
            total_price: total_price,
            shipping_costs: shipping_costs,
            order_date: new Date(Date.now())
        })
        //const orderLines = JSON.parse(req.body.order_lines)

        const orderLines = [{"product_id":"3","quantity":"4","subtotal_price":"4","discount":"0"}, {"product_id":"1","quantity":"1","subtotal_price":"27","discount":"0"}]

        const placedOrder = await storeDb.createOrder(newOrder,orderLines,req.user)
        
        if(placedOrder != null) {
            return res.status(200).json({
                Order: placedOrder
            })
        }
        else {
            res.json({
                message: "Something went wrong, Order could not be placed"
            })
        }
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getOrders = async(req, res) => {
    try {
        const orders = await storeDb.readOrders(req.user)
        
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
        const order = await storeDb.readOrder(req.user,orderId)

        if (order == null) {
            return res.status(404).json({
                message: 'no order found'
            })
        }

        const orderLines = await storeDb.readOrderLines(orderId)

        res.status(200).json({
            order: order,
            orderlines: orderLines
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

exports.getProducts = getProducts
exports.getProductbyID = getProductbyID
exports.postCheckout = postCheckout
exports.getOrders = getOrders
exports.getOrderByID = getOrderByID
exports.getCategories = getCategories