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

    //user role = 1
    const role = await userCreated.setRoles([1])

    return [userCreated, created]
}

const readUserByEmail = (email_address) => {
    return models.User.findOne({ where: { email_address: email_address } })
}

const readUserById = (user_id) => {
    return models.User.findByPk(user_id, {
        include: models.Address
    })
}

const readUserAddress = (user_id) => {
    return models.Address.findOne({ where: { user_id: user_id } })
}

const readUserRoles = (user_id) => {
    return models.User.findByPk(user_id).then(user => {
        return user.getRoles()
    })
}

//TODO: implement
const updateUserById = async(user_id, fields) => {

}

const deleteUserById = async(user_id) => {
    return await models.User.destroy(user_id);
}

const createUserAddressById = async(user_id) => {

}

const updateUserAddressById = async(user_id, address_id) => {

}

const deleteUserAddressById = async(address_id) => {
    return await models.Address.destroy(address_id)
}

exports.readUsers = readUsers
exports.readUserByEmail = readUserByEmail
exports.createUser = createUser
exports.readUserById = readUserById
exports.readUserAddress = readUserAddress
exports.readUserRoles = readUserRoles
exports.updateUserById = updateUserById
exports.deleteUserById = deleteUserById
exports.createUserAddressById = createUserAddressById
exports.updateUserAddressById = updateUserAddressById
exports.deleteUserAddressById = deleteUserAddressById