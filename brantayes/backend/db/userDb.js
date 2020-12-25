// CRUD: create, read, update, delete
const models = require('../models')

const readUsers = () => {
    return models.User.findAll()
}

const createUser = async (user, address) => {

    const [userCreated, created] =  await models.User.findOrCreate({
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

   const addr = await userCreated.createAddress({
        street_name: address.street_name,
        street_nr: address.street_nr,
        postal_code: address.postal_code,
        bus_nr: address.bus_nr,
        city: address.city,
        country: address.country
    })

    return [userCreated, created]
}

const readUserByEmail = (email_address) => {
    return models.User.findOne({ where: { email_address: email_address } })
}

const readUserById = (id) => {
    return models.User.FindByPk(id, {
        include: models.Address
    })
}

const readUserAddress = (id) => {
    return models.Address.findOne({ where: { user_id: id } })
}

exports.readUsers = readUsers
exports.readUserByEmail = readUserByEmail
exports.createUser = createUser
exports.readUserById = readUserById
exports.readUserAddress = readUserAddress