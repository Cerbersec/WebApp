//PGUR: Put, Get, Update, Remove
const storeDb = require('../db/storeDb')
const models = require('../models')

const getProducts = async(req, res, next) => {
    const pageNo = req.params.page
    const resultsPerPage = 20
    const searchOffset = (pageNo -1) * resultsPerPage

    try {
        const products = await storeDb.readProducts(resultsPerPage,searchOffset)
        
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
        req.checkBody('total_price').notEmpty()
        req.checkBody('shipping_costs').notEmpty()

        const { total_price, shipping_costs} = req.body
        const orderLines = JSON.parse(req.body.order_lines)

        const newOrder = new models.Order({
            total_price: total_price,
            shipping_costs: shipping_costs,
            order_date: new Date(Date.now())
        })

        const placedOrder = await storeDb.createOrder(newOrder,orderLines)
        
        if(placedOrder != null) {
            res.json({
                message: "Order Success"
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

exports.getProducts = getProducts
exports.getProductbyID = getProductbyID
exports.postCheckout = postCheckout