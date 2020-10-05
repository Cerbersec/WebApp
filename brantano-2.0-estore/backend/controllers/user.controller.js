//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')

const getUsers = async(req, res, next) => {
    try {
        const users = await userDb.readUsers()
        
        if (users.length < 1) {
            return res.status(404).json({
                message: 'users not found'
            })
        }
        res.status(200).json({
            users: users
        })
        //next()
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

exports.getUsers = getUsers