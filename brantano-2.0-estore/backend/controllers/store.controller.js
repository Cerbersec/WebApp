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

const getProduct = async(req, res, next) => {
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

exports.getProducts = getProducts
exports.getProduct = getProduct