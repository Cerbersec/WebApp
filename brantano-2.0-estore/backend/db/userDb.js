// CRUD: create, read, update, delete
const models = require('../models')

const readUsers = () => {
    return models.customer.findAll()
}

const createUser = (user) => {
    return models.customer.findOrCreate({
        where: { 
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            phone: user.phone,            
            gender: user.gender,
            username: user.username,
            password: user.password
        }
    })
}

const readUser = (email_address) => {
    return models.customer.findOne({ where: { email_address: email_address } })
}

exports.readUsers = readUsers
exports.readUser = readUser
exports.createUser = createUser