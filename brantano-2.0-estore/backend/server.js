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
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
        encrypt: true
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// test database connection
sequelize.authenticate().then(() => {
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

app.listen(port, function() {
    console.log(`Server is running on port: ${port}`)
})

