// CRUD: create, read, update, delete
const models = require('../models')

const readProducts = async (pageLimit,pageOffset, category, type, term) => {
    const { Op } = models.Sequelize

    //return products in specific cateory
    if(category !== "All categories") {
        //return all shoes in category
        if(type == "All " + category.toLowerCase() + " shoes") {
            return models.Product.findAll({
                where: {'$category.category_name$': category, '$category.product_group$': "Shoes", name: { [Op.substring]: term }},
                offset: pageOffset,
                limit: pageLimit,
                include: [{
                    model: models.Category,
                    as: 'category'
                }]
            })
        }
        //return all accessories in category
        else if(type == "All " + category.toLowerCase() + " accessories") {
            return models.Product.findAll({
                where: {'$category.category_name$': category, '$category.product_group$': "Accessories", name: { [Op.substring]: term }},
                offset: pageOffset,
                limit: pageLimit,
                include: [{
                    model: models.Category,
                    as: 'category'
                }]
            })
        }
        //return all products for gender
        else if(type == "All types"){
            return models.Product.findAll({
                where: {'$category.category_name$': category, name: { [Op.substring]: term }},
                offset: pageOffset,
                limit: pageLimit,
                include: [{
                    model: models.Category,
                    as: 'category'
                }]
            })
        }
        //return type of product in category
        else {
            return models.Product.findAll({
                where: {'$category.category_name$': category, type: type, name: { [Op.substring]: term }},
                offset: pageOffset,
                limit: pageLimit,
                include: [{
                    model: models.Category,
                    as: 'category'
                }]
            })
        }       
    }
    //return all products
    else {
        return models.Product.findAll({
            where: {name: { [Op.substring]: term }},
            offset: pageOffset,
            limit: pageLimit,
            include: [{
                model: models.Category,
                as: 'category'
            }]
        })
    }
}

const readProduct = async (productId) => {
    return models.Product.findOne({ where: { product_id: productId } })
}

const countProductsByCategory = async (category) => {
    if(category !== "All categories") {
        const result = await models.Category.findOne({ where: { category_name: category} })
        return models.Product.count({ where: { category_id: result.category_id } })
    }
    else {
        return models.Product.count()
    }
}

const createOrder = async (orderlines, user_id) => {
    const shipping_costs = 12;

    const orderPlaced = await models.Order.create({
        total_price: 0, 
        shipping_costs: shipping_costs,
        order_date: new Date(Date.now()),
        user_id: user_id,
        paid: false
    })

    const totalprice = await (createOrderlines(orderlines, orderPlaced))

    if(totalprice >= 100)
    {
        orderPlaced.shipping_costs = 0;
        console.log("shipping costs waived!")
    }

    orderPlaced.total_price = totalprice
    orderPlaced.save().then((order) => {console.log(order)})

    return orderPlaced
}

const updateOrderPaidStatus = async (order_id, status) => {
    models.Order.update(
        { paid: status},
        { where: {order_id: order_id} }
    )
    .then(order => {
        return order
    })
    .catch(error => {
        return error
    })
}

const createOrderlines = async(orderlines, orderPlaced) => {
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

        orderPlaced.createOrderline({
            quantity: element.quantity,
            subtotal_price: subtotal,
            discount: element.discount,
            product_id: element.product_id,
            size: element.selectedSize,
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

const readOrders = (user_id) => {
    return models.Order.findAll({where: { user_id: user_id}, include: models.Orderline})
}

const readOrder = (user_id, order_id) => {
    const order = models.Order.findOne({ where: { user_id: user_id, order_id: order_id }, include: [{model: models.Orderline, include : models.Product }]})
    return order
}

const readOrderLines = (order_id) => {
    const orderlines = models.Orderline.findAll({ where: { order_id: order_id } })
    return orderlines
}

const deleteOrder = async (order_id) => {
    return models.Order.destroy({
        where: {
            order_id: order_id
        }
    })
}

const readCategories = () => {
    return models.Category.findAll()
}

const readReviews = (product_id) => {
    return models.Review.findAll({where: { product_id: product_id }, include: models.User})
}

const createReview = async (review) => {
    return models.Review.create({
        rating: review.rating,
        description: review.description,
        review_date: review.review_date,
        product_id: review.product_id,
        user_id: review.user_id
    })
}

const createProduct = async (product) => {
    return models.Product.create({
        name: product.name,
        brand: product.brand,
        size: product.size,
        color: product.color,
        release_date: product.release_date,
        retail_price: product.retail_price,
        price: product.price,
        stock_quantity: product.stock_quantity,
        popular: false,
        description: product.description,
        image_url: product.image_url,
        type: product.type,
        category_id: product.category_id
    })
}

const deleteProduct = async (product_id) => {
    return models.Product.destroy({
        where: {
            product_id: product_id
        }
    })
}
const deleteReviews = async (product_id) => {
    return models.Review.destroy({
        where: {
            product_id: product_id
        }
    })
}

exports.readProducts = readProducts
exports.readProduct = readProduct
exports.createOrder = createOrder
exports.readOrders = readOrders
exports.readOrder = readOrder
exports.readOrderLines = readOrderLines
exports.deleteOrder = deleteOrder
exports.readCategories = readCategories
exports.readReviews = readReviews
exports.createReview = createReview
exports.updateOrderPaidStatus = updateOrderPaidStatus
exports.countProductsByCategory = countProductsByCategory
exports.createProduct = createProduct
exports.deleteProduct = deleteProduct
exports.deleteReviews = deleteReviews