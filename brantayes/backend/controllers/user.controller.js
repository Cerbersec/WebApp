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
    try {
        const { first_name, last_name, gender, phone, email_address, username, street_name, street_nr, postal_code, bus_nr, city, country} = req.body
        const user_id = req.user_id

        const user = await userDb.readUserById(user_id)

        if(user) {
            user.first_name = first_name
            user.last_name = last_name
            user.gender = gender
            user.phone = phone
            user.email_address = email_address
            user.username = username
            user.street_name = street_name
            user.street_nr = street_nr
            user.postal_code = postal_code
            user.bus_nr = bus_nr
            user.city = city
            user.country = country

            const result = await user.save()
            if(result) {
                res.status(200).send({
                    message: 'user updated'
                })
            }
            else {
                res.status(500).send({
                    message: 'something went wrong'
                })
            }
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