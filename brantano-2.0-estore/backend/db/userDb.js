// CRUD: create, read, update, delete
const models = require('../models')

const readUsers = () => {
    return models.Customer.findAll()
}

const createUser = (user) => {
    return models.Customer.findOrCreate({
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
    return models.Customer.findOne({ where: { email_address: email_address } })
}

exports.readUsers = readUsers
exports.readUser = readUser
exports.createUser = createUser