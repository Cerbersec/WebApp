//PGUR: Put, Get, Update, Remove
const storeDb = require('../db/storeDb')
const models = require('../models')
const config = require('../config/stripe')
const stripe = require("stripe")(config.STRIPE_SECRET_TEST);
const TypedError = require('../modules/ErrorHandler')

const getProducts = async(req, res, next) => {
    const pageNo = req.body.page
    const { category, type, term } = req.body
    const resultsPerPage = 100
    const searchOffset = (pageNo -1) * resultsPerPage

    try {
        const products = await storeDb.readProducts(resultsPerPage + 1, searchOffset, category, type, term)
        
        if (!products) {
            return res.status(404).json({
                message: 'no products found'
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

const getProductCountByCategory = async(req, res, next) => {
    const category = req.body.category
    try {
        const productcount = await storeDb.countProductsByCategory(category)

        if(!productcount) {
            res.status(404).json({
                message: "no products in database"
            })
        }

        res.status(200).json({
            productcount: productcount
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getProductbyID = async(req, res, next) => {
    const productId = req.params.productid
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

const postCheckout = async(req, res, next) => {
    try {
        const { orderlines } = req.body

        const placedOrder = await storeDb.createOrder(orderlines, req.user_id)
        
        if(placedOrder != null) {
            return res.status(200).json({
                order: placedOrder
            })
        }
        else {
            res.status(500).json({
                message: "Something went wrong, order could not be placed"
            })
        }
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getOrders = async(req, res, next) => {
    try {
        const orders = await storeDb.readOrders(req.user_id)
        
        if (!orders) {
            return res.status(404).json({
                message: 'no orders found'
            })
        }
        res.status(200).json({
            orders: orders
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getOrderByID = async(req, res, next) => {
    const orderId = req.params.orderid

    try {
        const order = await storeDb.readOrder(req.user_id, orderId)

        if (order == null) {
            return res.status(404).json({
                message: 'no order found'
            })
        }

        res.status(200).json({
            order: order
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getCategories = async (req, res, next) => {
    try {
        const categories = await storeDb.readCategories()

        if(!categories) {
            return res.status(404).json({
                message: 'no categories found'
            })
        }

        res.status(200).json({
            categories: categories
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getReviews = async (req, res, next) => {

    try {
        const reviews = await storeDb.readReviews(req.params.productid)
        
        if (reviews.length == 0) {
            return res.status(404).json({
                message: 'reviews not found'
            })
        }
        res.status(200).json({
            reviews: reviews
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const postReview = async (req, res, next) => {
    try {

        req.checkBody('description','description is required').notEmpty()
        req.checkBody('rating','rating is required').notEmpty().isInt()
        req.checkBody('productId','productID is required').notEmpty().isInt()

        const validationResults = req.validationErrors()
        
        if(validationResults)
        {
            console.log("errors were found:")
            console.log(validationResults);
            let err = new TypedError('register error', 400, 'missing_field', {
                errors: validationResults,
            })
            return next(err)
        }

        req.sanitizeBody('description').escape().trim();

        const { rating, description, productId} = req.body  

        const newModel = new models.Review({
            rating: rating,
            description: description,
            review_date: new Date(),
            product_id: productId,
            user_id: req.user_id
        })

        const review = await storeDb.createReview(newModel)

        if(!review){
            return res.status(404).send({
                message: 'something went wrong'
            })
        }
        res.status(200).send({
            message: 'review submitted'
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const postPayment = async (req, res, next) => {
    console.log(req.headers)
    try {
        const orderId = req.body.order_id;

        const order = await storeDb.readOrder(req.user_id, orderId)


        if(order){
            if(!order.paid) {
                const amount = order.total_price + order.shipping_costs

                console.log(amount)

                try {
                    let lineitems = new Array();
                    let productIds = [];
                    order.Orderlines.forEach((orderline) => {
                        for(let i = 0; i < orderline.dataValues.quantity; i++) {
                            productIds.push(orderline.dataValues.product_id)
                        }
                    })

                    const result = await lookForProducts(productIds).then(foundProducts => {
                        foundProducts.forEach(product => {
                            let data = {
                                price_data: {
                                    currency: 'eur',
                                    product_data: {
                                        name: product.dataValues.name,
                                    },
                                    unit_amount: product.dataValues.retail_price * 100,
                                },
                                quantity: 1,
                            }
                            lineitems.push(data);
                        })

                    const shippingLine = {
                        price_data: {
                            currency: 'eur',
                            product_data: {
                                name: "shipping",
                            },
                            unit_amount: order.shipping_costs * 100,
                        },
                        quantity: 1,
                        }
            
                    lineitems.push(shippingLine);

                    }).catch((err) => {
                        console.log(err)
                    })
                    
                    console.log("creating session object")
                    const session = await stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: lineitems,
                        mode: 'payment',
                        success_url: req.headers.referer.split('/')[0] + '//' + req.headers.referer.split('/')[2] + '/ordersuccess/{CHECKOUT_SESSION_ID}',
                        cancel_url: req.headers.referer.split('/')[0] + '//' + req.headers.referer.split('/')[2] + '/ordercancel',
                    });
                    console.log("updating order")
                  
                    //update Order paid status to true
                    const updateOrder = await storeDb.updateOrderPaidStatus(orderId, true)
                    console.log("sending back session id")
                    res.json({ id: session.id });
                }
                catch(error) {
                    console.log(error)
                    res.status(500).send({
                        message: "payment failed",
                        success: false
                    })
                }
            }
            else {
                res.status(403).send({
                    message: "order already paid",
                    success: false
                })
            }
        }
        else {
            res.status(404).send({
                message: "order does not exist",
                success: false
            })
        }
    }
    catch(error) {
        res.status(500).send({
            message: "something went wrong" + error.message,
            success: false
        })
    }
}

const postSuccess = async(req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        const customer = await stripe.customers.retrieve(session.customer);
        console.log(session)
        console.log(customer)

        res.send({
            email: customer.email,
            invoice: customer.invoice_prefix,
            amount: session.amount_total / 100,
        });
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

async function lookForProducts(productIds) {
    let products = [];

    for(let productId of productIds) {
        try {
            let found = await storeDb.readProduct(productId);
            products.push(found);
        }
        catch(e) {
            console.log(e);
        }
    }
    return products;
}

const removeOrder = async (req, res, next) => {
    const order_id = req.params.orderid
    try { 
        const order = await storeDb.deleteOrder(order_id)
        
        if(order) {
            res.status(200).send({
                message: 'Order has been canceled!'
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

exports.getProducts = getProducts
exports.getProductbyID = getProductbyID
exports.postCheckout = postCheckout
exports.getOrders = getOrders
exports.getOrderByID = getOrderByID
exports.getCategories = getCategories
exports.getReviews = getReviews
exports.postReview = postReview
exports.postPayment = postPayment
exports.getProductCountByCategory = getProductCountByCategory
exports.postSuccess = postSuccess
exports.removeOrder = removeOrder