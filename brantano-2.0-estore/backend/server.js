//heyhey
console.log("heyheoy");

const express = require('express')
const compression = require('compression')

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
//const connection_string = process.env.CONNECTION_STRING


// routers
const storeRouter = require('./routes/store.router')
const userRouter = require('./routes/user.router')

// main endpoint
app.use('/home', express.static('../frontend/public'))

//store endpoint
app.use('/', storeRouter)
app.use('/users', userRouter)

//test
app.get('/test', (req, res) => {
    res.send('test route')
})

//page not found
app.use((req, res) => {
    res.status(404).json({
        msg: 'Page could not be found on this server'
    })
})

app.listen(port, function() {
    console.log(`Server is running on port: ${port}`)
})

