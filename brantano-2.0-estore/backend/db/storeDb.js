// CRUD: create, read, update, delete
const models = require('../models')

const readProducts = (pageLimit,pageOffset) => {
    return models.Product.findAll({ offset: pageOffset, limit: pageLimit})
}

const readProduct = (productId) => {
    return models.Product.findOne({ where: { product_id: productId } })
}

exports.readProducts = readProducts
exports.readProduct = readProduct