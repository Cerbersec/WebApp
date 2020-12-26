const userDb = require('../db/userDb')
const models = require('../models')
const ROLES = models.ROLES;

const checkDuplicateEmail = async(req, res, next) => {
    try {
        const user = await userDb.readUserByEmail(req.body.email_address)

        if(user) {
            res.status(400).send({
                message: "Email address already in use"
            })
            return
        }
        next()

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const checkRolesExisted = async(req, res, next) => {
    try {
        if(req.body.roles) {
            for(let i = 0; i < req.body.roles.length; i++) {
                if (!ROLES.includes(req.body.roles[i])) {
                    res.status(400).send({
                        message: "Role does not exist: " + req.body.roles[i]
                    })
                    return
                }
            }
        }
        next()

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

exports.checkDuplicateEmail = checkDuplicateEmail
exports.checkRolesExisted = checkRolesExisted