//PGUR: Put, Get, Update, Remove
const infoDb = require('../db/infoDb')
const TypedError = require('../modules/ErrorHandler')
const multer = require('multer')

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
        const shipping_costs = req.body.shipping_costs;
        infoDb.UpdateShippingCosts(shipping_costs);
        res.send({
            message: 'Shipping costs succesfully updated'
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateLogo = async (req, res, next) => {
    let storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, '../frontend/public')
        },
        filename: function(req, file, cb) {
            cb(null, 'banner.png')
        }
    })

    let upload = multer({storage: storage}).single('file')

    try {
        upload(req, res, function(err) {
            if(err) {
                return res.status(500).send({
                    message: err
                })
            }

            return res.status(200).send({
                message: "Upload successful",
                imageURL: "./public/banner.png"
            })
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getCompanyInfo = async (req, res, next) => {
    try {
        const info = await infoDb.ReadCompanyInfo();
        res.status(200).json({
            info: info
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const postCompanyInfo = async (req, res, next) => {
    try {
        const info = req.body;
        infoDb.UpdateCompanyInfo(info);
        res.send({
            message: 'Company info sucessfuly updated'
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

exports.GetShippingCosts = GetShippingCosts
exports.PostShippingCosts = PostShippingCosts
exports.updateLogo = updateLogo
exports.getCompanyInfo = getCompanyInfo
exports.postCompanyInfo = postCompanyInfo