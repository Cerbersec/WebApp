// CRUD: create, read, update, delete
const models = require('../models')

const readProducts = async (pageLimit,pageOffset) => {
    return models.Product.findAll({ offset: pageOffset, limit: pageLimit, include: models.Category})
}

const readProduct = (productId) => {
    return models.Product.findOne({ where: { product_id: productId } })
}

const createOrder = async (cart,orderLines,userid) => {
    const OrderPlaced = await models.Order.create({
        total_price: cart.total_price,
        shipping_costs: cart.shipping_costs,
        order_date: cart.order_date,
        customer_id: userid
    })

    orderLines.forEach(element => {
        const prod = models.Product.findOne({ where: { product_id: element.product_id } })

        if (prod == null){
            throw new Error('Product not found')
            //TODO: implement proper error handling
        }

        //TODO: check price
        console.log("prod id: " + element.product_id)
        const newOrderLine = OrderPlaced.createOrderline({
            quantity: element.quantity,
            subtotal_price: element.subtotal_price,
            discount: element.discount,
            product_id: element.product_id
        })
    });

    //TODO: check order total
    return OrderPlaced
}

const readOrders = (userid) => {
    return models.Order.findAll({where: { customer_id: userid} })
}

const readOrder = (userId,orderId) => {
    const order = models.Order.findOne({ where: { customer_id: userId, order_id: orderId } })
    return order
}

const readOrderLines = (orderId) => {
    const orderLines = models.Orderline.findAll({ where: { order_id: orderId } })
    return orderLines
}

const readCategories = () => {
    return models.Category.findAll()
}

exports.readProducts = readProducts
exports.readProduct = readProduct
exports.createOrder = createOrder
exports.readOrders = readOrders
exports.readOrder = readOrder
exports.readOrderLines = readOrderLines
exports.readCategories = readCategories