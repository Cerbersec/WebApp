//PGUR: Put, Get, Update, Remove
const storeDb = require('../db/storeDb')


const getProducts = async(req, res, next) => {
    try {
        const products = await storeDb.readProducts()
        
        if (products.length < 1) {
            return res.status(404).json({
                message: 'products not found'
            })
        }
        res.status(200).json({
            products: products
        })
        //next()
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getProduct = async(req, res, next) => {
    const productId = req.params.productId
    try {
        const product = await storeDb.readProduct(productId)

        if(product.length < 1) {
            return res.status(404).json({
                message: 'product could not be found'
            })
        }
        res.status(200).json({
            product: product
        })
        //next()
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

exports.getProducts = getProducts
exports.getProduct = getProduct