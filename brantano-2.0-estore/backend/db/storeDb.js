// CRUD: create, read, update, delete
const models = require('../models')

const readProducts = () => {
    return 'Uggs'
}

const readProduct = (productId) => {
    return models.Product.findOne({ where: { product_id: productId } })
}

exports.readProducts = readProducts
exports.readProduct = readProduct