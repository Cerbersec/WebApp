//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')

const getUsers = async(req, res, next) => {
    try {
        const users = await userDb.readUsers()
        console.log(users)
        res.send(JSON.stringify(users, null, 2))

        
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}


const registerUser = async(req, res, next) => {
    try {
        const users = await userDb.registerUser()
        console.log(users)
        res.send(JSON.stringify())
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}


function Login () {

}

exports.getUsers = getUsers