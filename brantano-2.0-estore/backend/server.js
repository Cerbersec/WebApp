const express = require('express')
const compression = require('compression')
const createError = require('http-errors')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const port = process.env.PORT || 3000

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('../frontend/public'))
app.use(cors())

//req.checkBody()
/*
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
      root          = namespace.shift(),
      formParam     = root;
  
      while(namespace.lenght) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  */

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

// routers
const storeRouter = require('./routes/store.router')
const userRouter = require('./routes/user.router')

// set static dir
app.use(express.static(path.join(__dirname, 'public')))

//endpoints
app.use('/', storeRouter)
app.use('/account', userRouter)


//page not found
app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json(err);
})

//sync models with db before app start: force = true to drop tables at start up
const models = require('./models')
models.sequelize.sync({ force: true }).then(function() {
    app.listen(port, function() {
        console.log(`Server is running on port: ${port}`)
    })
})

