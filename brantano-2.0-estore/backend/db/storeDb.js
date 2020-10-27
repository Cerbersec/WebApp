// CRUD: create, read, update, delete
const models = require('../models')

const readProducts = (pageLimit,pageOffset) => {
    return models.Product.findAll({ offset: pageOffset, limit: pageLimit})
}

const readProduct = (productId) => {
    return models.Product.findOne({ where: { product_id: productId } })
}

const createOrder = async (cart,orderLines) => {

    const OrderPlaced = await models.Order.create({
        total_price: cart.total_price,
        shipping_costs: cart.shipping_costs,
        order_date: cart.order_date
    })

    console.log(orderLines)
    orderLines.forEach(element => {
        const newOrderLine = OrderPlaced.createOrderline({
            quantity: element.quantity,
            subtotal_price: element.subtotal_price,
            discount: element.discount,
        })
        //assign productID to orderline
    });
    
    //assign customerID to order

    return OrderPlaced
}

exports.readProducts = readProducts
exports.readProduct = readProduct
exports.createOrder = createOrder