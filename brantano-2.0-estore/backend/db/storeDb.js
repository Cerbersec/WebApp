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

exports.readProducts = readProducts
exports.readProduct = readProduct
exports.createOrder = createOrder