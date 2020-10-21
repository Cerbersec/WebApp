// CRUD: create, read, update, delete
const models = require('../models')

const readUsers = () => {
    return models.customer.findAll()
}

const registerUser = () => {
    return models.customer.registerUser()
}

exports.readUsers = readUsers