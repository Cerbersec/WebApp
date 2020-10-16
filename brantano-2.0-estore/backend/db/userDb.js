// CRUD: create, read, update, delete
const models = require('../models')

const readUsers = () => {
    return models.customer.findAll()
}

exports.readUsers = readUsers