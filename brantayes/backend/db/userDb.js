// CRUD: create, read, update, delete
const models = require('../models')

const readUsers = () => {
    return models.Customer.findAll()
}

const createUser = async (user, address) => {

    const [customer, created] =  await models.Customer.findOrCreate({
        where: { 
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            phone: user.phone,            
            gender: user.gender,
            username: user.username,
            password: user.password,      
        }
    })

   const addr = await customer.createAddress({
        street_name: address.street_name,
        street_nr: address.street_nr,
        postal_code: address.postal_code,
        bus_nr: address.bus_nr,
        city: address.city,
        country: address.country
    })

    return [customer, created]

    /* DO NOT REMOVE!!!
    
    const addr = await models.Address.findOrCreate({
        where: {
            customer_id: customer.customer_id
        },
        include: [models.Customer],
        defaults: {
            street_name: address.street_name,
            street_nr: address.street_nr,
            postal_code: address.postal_code,
            bus_nr: address.bus_nr,
            city: address.city,
            country: address.country
        }
    })
    */
}

const readUser = (email_address) => {
    return models.Customer.findOne({ where: { email_address: email_address } })
}

const readUserById = (id) => {
    return models.Customer.findOne({ 
        where: { customer_id: id },
        include: models.Address
    })
}

const readUserAddress = (id) => {
    return models.Address.findOne({ where: { customer_id: id } })
}

exports.readUsers = readUsers
exports.readUser = readUser
exports.createUser = createUser
exports.readUserById = readUserById
exports.readUserAddress = readUserAddress