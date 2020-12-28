//PGUR: Put, Get, Update, Remove
const infoDb = require('../db/infoDb')
const TypedError = require('../modules/ErrorHandler')

const GetShippingCosts = async (req, res, next) => {
    try {
        const costs = await infoDb.ReadShippingCosts();
        res.status(200).json({
            shipping_costs: costs
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const PostShippingCosts = async (req, res, next) => {
    try {
        const shipping_costs = req.params.shipping_costs;
        infoDb.UpdateShippingCosts(shipping_costs);
        res.send({
            message: 'Shipping costs updated'
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

exports.GetShippingCosts = GetShippingCosts
exports.PostShippingCosts = PostShippingCosts