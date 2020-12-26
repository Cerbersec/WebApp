//PGUR: Put, Get, Update, Remove

const test = async (req, res, next) => {
    try {
        res.status(200).send({
            message: "welcome, administrator"
        })
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}



exports.test = test