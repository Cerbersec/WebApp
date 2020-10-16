const express = require('express')
const compression = require('compression')
const createError = require('http-errors')
const path = require('path')

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const port = process.env.PORT || 3000

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../frontend/public'))

// setup database connection
const db = require('./config/database')

// test database connection
db.authenticate().then(() => {
    console.log('Connection has been established successfully')
})
.catch(error => {
    console.log('Unable to connect to the database', error)
})

// routers
const storeRouter = require('./routes/store.router')
const userRouter = require('./routes/user.router')

// set static dir
app.use(express.static(path.join(__dirname, 'public')))

//endpoints
app.use('/', storeRouter)
app.use('/users', userRouter)


//page not found
app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
})

//sync models with db before app start
const models = require('./models')
models.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log(`Server is running on port: ${port}`)
    })
})

