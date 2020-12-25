//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')

const getUserByID = async(req, res, next) => {
    const user_id = req.user_id
    try {
        const user = await userDb.readUserById(user_id)

        if(user == null) {
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

exports.getUserByID = getUserByID