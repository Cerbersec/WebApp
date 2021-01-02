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
    // const user_id = req.user_id
    // try {
    //     const result = await userDb.updateUserById(user_id)

    //     return res.status(500).json({
    //         message: 'not implemented'
    //     })
    // } catch(e) {
    //     console.log(e.message)
    //     res.sendStatus(500) && next(e)
    // }

    try {
        const { firstname, lastname, gender, phone, email, username, street, streetnr, postal, bus_nr, city, country} = req.body
        const user_id = req.params.user_id

        const user = await userDb.updateUserById(user_id)

        if(user) {
            user.first_name = firstname
            user.last_name = lastname
            user.gender = gender
            user.phone = phone
            user.email_address = email
            user.username = username
            user.street_name = street
            user.street_nr = streetnr
            user.postal_code = postal
            user.bus_nr = bus_nr
            user.city = city
            user.country = country

            const result = await user.save({fields: ['firstname', 'lastname', 'gender', 'phone', 'email', 'username', 'street', 'streetnr', 'postal', 'bus_nr', 'city', 'country']})
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