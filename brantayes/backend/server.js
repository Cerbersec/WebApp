const express = require('express')

const compression = require('compression')
const createError = require('http-errors')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const https = require('https')
const fs = require('fs')
const csurf = require('csurf')
const stripe = require("stripe")("sk_test_51HsWiuEGWfldFJu6UkDgdRQSxHuK48Oif08qkzSphVLY9221ABALif0CkgmZkxv4xTfwAilmEqadNIZkO7c6KidM00jnFy4KWc");

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const credentials = {
    key: fs.readFileSync(__dirname + '/certs/privkey.pem'),
    cert: fs.readFileSync(__dirname + '/certs/fullchain.pem')
}

const app = express()
const port = process.env.PORT || 80

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use(expressValidator())

// setup database connection
const db = require('./config/database')

// test database connection
db.authenticate().then(() => {
    console.log('Connection has been established successfully')
})
.catch(error => {
    console.log('Unable to connect to the database', error)
})

//csrf protection
app.use(csurf({ cookie: true }))
app.get('/csrf-token', (req, res, next) => {
    const token =  req.csrfToken()
    res.cookie("XSRF-TOKEN", token)
    res.json({ csrfToken: token })
    return next()
})

// routers
const storeRouter = require('./routes/store.router')
const userRouter = require('./routes/user.router')
const blogRouter = require('./routes/blog.router')
const authRouter = require('./routes/auth.router')

// set static dir
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')))

//endpoints
const prefix = "/api/v1"
app.use(prefix + '/store', storeRouter)
app.use(prefix + '/account', userRouter)
app.use(prefix + '/blog', blogRouter)
app.use(prefix + "/auth", authRouter)

//react routing
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'))
})

//page not found
// app.use((req, res, next) => {
//     next(createError(404))
// })

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
})

//init server objects
var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)

//sync models with db before app start: force = true to drop tables at start up
const models = require('./models')
models.sequelize.sync({ force: false }).then(function() {  
    httpServer.listen(port, function() {
        console.log(`HTTP Server is running on port: ${port}`)
    })
    httpsServer.listen(443, function() {
        console.log('HTTPS Server is running on port: 443')
    })
})
