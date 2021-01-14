//PGUR: Put, Get, Update, Remove
const storeDb = require('../db/storeDb')
const models = require('../models')
const TypedError = require('../modules/ErrorHandler')

const test = async (req, res, next) => {
    try {
        res.status(200).send({
            message: "welcome, administrator"
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const putProduct = async (req, res, next) => {
    try {
        const { name, brand, size, color, release_date, retail_price, price, stock_quantity, description, image_url, type, category} = req.body
        
        var newProduct = new models.Product({
            name: name,
            brand: brand,
            size: size,
            color: color,
            release_date: release_date,
            retail_price: retail_price,
            price: price,
            stock_quantity: stock_quantity,
            description: description,
            image_url: image_url,
            type: type,
            category_id: category
        })

        const createdProduct = await storeDb.createProduct(newProduct)

        if(createdProduct) {
            res.status(200).send({
                message: 'Product added successfully'
            })
        }
        else {
            res.status(400).send({
                message: 'Something went wrong'
            })
        }

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { name, brand, size, color, release_date, retail_price, price, stock_quantity, description, image_url, type} = req.body
        const product_id = req.params.product_id

        const product = await storeDb.readProduct(product_id)

        if (product) {
            product.name = name,
            product.brand = brand,
            product.size = size,
            product.color = color,
            product.release_date = Date.parse(release_date),
            product.retail_price = retail_price,
            product.price = price,
            product.stock_quantity = stock_quantity,
            product.description = description,
            product.image_url = image_url,
            product.type = type
        }

        const result = await product.save({fields: ['name', 'brand', 'size', 'color', 'release_date', 'retail_price', 'price', 'stock_quantity', 'description', 'image_url', 'type']})
        if(result) {
            res.status(200).send({
                message: 'Product updated successfully'
            })
        }
        else {
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const removeProduct = async (req, res, next) => {
    const product_id = req.params.product_id
    try { 
        const reviews = await storeDb.deleteReviews(product_id)
        const product = await storeDb.deleteProduct(product_id)
        
        if(product) {
            res.status(200).send({
                message: 'Product removed'
            })
        }
        else {
            res.status(500).send({
                message: 'something went wrong'
            })
        }
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

exports.test = test
exports.putProduct = putProduct
exports.updateProduct = updateProduct
exports.removeProduct = removeProduct