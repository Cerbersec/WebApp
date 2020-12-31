//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')

const getUserByID = async(req, res, next) => {
    const user_id = req.user_id
    try {
        const user = await userDb.readUserById(user_id)

        if(!user) {
            return res.status(404).json({
                message: 'user could not be found'
            })
        }
        return res.status(200).json({
            user: user
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateUser = async(req, res, next) => {
    const user_id = req.user_id
    try {
        const result = await userDb.updateUserById(user_id)

        return res.status(500).json({
            message: 'not implemented'
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const removeUser = async(req, res, next) => {
    const user_id = req.user_id
    try {
        //const result = await userDb.deleteUserById(user_id)
        //console.log(result)

        return res.status(500).json({
            message: 'not implemented'
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const updateUserAddress = async(req, res, next) => {
    const user_id = req.user_id
    try {
        //const result = userDb.updateUserAddressById(user_id, address_id)

        return res.status(500).json({
            message: 'not implemented'
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const addUserAddress = async(req, res, next) => {
    const user_id = req.user_id
    try {
        //const result = userDb.createUserAddressById(user_id)

        return res.status(500).json({
            message: 'not implemented'
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const removeUserAddress = async(req, res, next) => {
    const user_id = req.user_id
    try {
        //const result = userDb.deleteUserAddressById(address_id)

        return res.status(500).json({
            message: 'not implemented'
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

exports.getUserByID = getUserByID
exports.updateUser = updateUser
exports.removeUser = removeUser
exports.updateUserAddress = updateUserAddress
exports.addUserAddress = addUserAddress
exports.removeUserAddress = removeUserAddress