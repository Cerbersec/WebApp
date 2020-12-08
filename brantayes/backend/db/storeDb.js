// CRUD: create, read, update, delete
const models = require('../models')

const readProducts = async (pageLimit,pageOffset) => {
    return models.Product.findAll({ offset: pageOffset, limit: pageLimit, include: models.Category})
}

const readProduct = async (productId) => {
    return models.Product.findOne({ where: { product_id: productId } })
}

const countProducts = async () => {
    return models.Product.count()
}

const createOrder = async (orderlines, userid) => {
    const shipping_costs = 12;

    const OrderPlaced = await models.Order.create({
        total_price: 0, 
        shipping_costs: shipping_costs,
        order_date: new Date(Date.now()),
        customer_id: userid,
        paid: false
    })

    const totalprice = await (createOrderlines(orderlines, OrderPlaced))
 
    OrderPlaced.total_price = totalprice
    OrderPlaced.save().then((order) => {console.log(order)})

    return OrderPlaced
}

const updateOrderPaidStatus = async (orderid, status) => {
    models.Order.update(
        { paid: status},
        { where: {order_id: orderid} }
    )
    .then(order => {
        return order
    })
    .catch(error => {
        return error
    })
}

const createOrderlines = async(orderlines, OrderPlaced) => {
    var totalprice = 0;

    for(const element of orderlines) {
        const prod = await models.Product.findOne({ where: { product_id: element.product_id } })
        var subtotal = 0;

        if (prod == null){
            throw new Error('Product not found')
        }

        subtotal = prod.retail_price * element.quantity
        totalprice = totalprice + subtotal
        element.discount = 0;
        
        OrderPlaced.createOrderline({
            quantity: element.quantity,
            subtotal_price: subtotal,
            discount: element.discount,
            product_id: element.product_id
        })

        //update product quantity
        if(prod.stock_quantity - element.quantity >= 0) {
            prod.stock_quantity = prod.stock_quantity - element.quantity;
        }
        else {
            prod.stock_quantity = 0;
        }
        prod.save();
    }
    return totalprice;
}

const readOrders = (userid) => {
    return models.Order.findAll({where: { customer_id: userid}, include: models.Orderline})
}

const readOrder = (userId,orderId) => {
    const order = models.Order.findOne({ where: { customer_id: userId, order_id: orderId }, include: models.Orderline })
    return order
}

const readOrderLines = (orderId) => {
    const orderlines = models.Orderline.findAll({ where: { order_id: orderId } })
    return orderlines
}

const readCategories = () => {
    return models.Category.findAll()
}

const readReviews = (product_Id) => {
    return models.Review.findAll({where: { product_id: product_Id }, include: models.Customer})
}

const createReview = async (review) => {
    return models.Review.create({
        rating: review.rating,
        description: review.description,
        review_date: review.review_date,
        product_id: review.product_id,
        customer_id: review.customer_id
    })
}

exports.readProducts = readProducts
exports.readProduct = readProduct
exports.createOrder = createOrder
exports.readOrders = readOrders
exports.readOrder = readOrder
exports.readOrderLines = readOrderLines
exports.readCategories = readCategories
exports.readReviews = readReviews
exports.createReview = createReview
exports.updateOrderPaidStatus = updateOrderPaidStatus
exports.countProducts = countProducts