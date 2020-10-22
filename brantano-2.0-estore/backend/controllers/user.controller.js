//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')
const models = require('../models')

const jwt = require('jsonwebtoken')
const config = require('../config/jwt-config')
const ensureAuthenticated = require('../modules/ensureAuthenticated')
const bcrypt = require('bcrypt')
const TypedError = require('../modules/ErrorHandler')

//showcase method
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


const register = async(req, res, next) => {
    try {
        const { first_name, last_name, email_address, phone, gender, username, password, verify_password} = req.body
        console.log('got data')

        req.checkBody('first_name', 'First name is required').notEmpty()
        req.checkBody('last_name', 'Last name is required').notEmpty()
        req.checkBody('email_address', 'Email address is required').notEmpty()
        req.checkBody('gender', 'Gender is required').notEmpty()
        req.checkBody('username', 'Username is required').notEmpty()
        req.checkBody('password', 'Password is required').notEmpty()
        req.checkBody('verify_password', 'Verify password is required').notEmpty()

        console.log('performed checks')

        let missingFieldErrors = req.validationErrors()
        if(missingFieldErrors) {
            let err = new TypedError('register error', 400, 'missing_field', {
                errors: missingFieldErrors,
            })
            return next(err)
        }

        console.log('checked for missing fields')

        req.checkBody('email_address', 'Email is not valid').isEmail()
        req.checkBody('password', 'Passwords have to match').equals(verify_password)

        console.log('performed validation')

        let invalidFieldErrors = req.validationErrors()
        if(invalidFieldErrors) {
            let err = new TypedError('register error', 400, 'invalid_field', {
                errors: invalidFieldErrors,
            })
            return next(err)
        }        

        console.log("validated")
        //hash password
        const hashedpassword = await bcrypt.hash(req.body.password, 10)

        console.log('hashed password')

        var newCustomer = new models.customer({
            first_name: first_name,
            last_name: last_name,
            email_address: email_address,
            phone: phone,
            gender: gender,
            username: username,
            password: hashedpassword
        })

        console.log('created customer model')

        //create new user
        const [ user, created ] = await userDb.createUser(newCustomer)
        console.log(created)
        console.log(user)

        if(created) {
            res.json({
                message: "user created"
            })
        }
        else {
            let err = new TypedError('register error', 409, 'invalid_field', {
                message: "user already exists"
            })
            return next(err)
        }

    } catch(e) {

    }
}


const login = async(req, res, next) => {
    //placeholder
}

exports.getUsers = getUsers
exports.register = register
exports.login = login