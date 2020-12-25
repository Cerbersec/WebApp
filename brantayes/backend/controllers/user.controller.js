//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')
const models = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/jwt-config')
const bcrypt = require('bcryptjs')
const TypedError = require('../modules/ErrorHandler')

const { promisify } = require('util');

const register = async(req, res, next) => {
    try {
        const { first_name, last_name, email_address, phone, gender, username, password, verify_password} = req.body
        const { street_name, postal_code, street_nr, bus_nr, city, country } = req.body

        req.checkBody('first_name', 'First name is required').notEmpty()
        req.checkBody('last_name', 'Last name is required').notEmpty()
        req.checkBody('email_address', 'Email address is required').notEmpty()
        req.checkBody('gender', 'Gender is required').notEmpty()
        req.checkBody('username', 'Username is required').notEmpty()
        req.checkBody('password', 'Password is required').notEmpty()
        req.checkBody('verify_password', 'Verify password is required').notEmpty()
        req.checkBody('bus_nr', 'Bus number is required is required').notEmpty()
        req.checkBody('phone', 'Phone is required').notEmpty()
        req.checkBody('street_name', 'Street name is required').notEmpty()
        req.checkBody('postal_code', 'Postal code is required').notEmpty()
        req.checkBody('street_nr', 'Street number is required').notEmpty()
        req.checkBody('city', 'City is required').notEmpty()
        req.checkBody('country', 'Country is required').notEmpty()

        let missingFieldErrors = req.validationErrors()
        if(missingFieldErrors) {
            let err = new TypedError('register error', 400, 'missing_field', {
                errors: missingFieldErrors,
            })
            return next(err)
        }

        req.checkBody('email_address', 'Email is not valid').isEmail()
        req.checkBody('password', 'Passwords have to match').equals(verify_password)

        let invalidFieldErrors = req.validationErrors()
        if(invalidFieldErrors) {
            let err = new TypedError('register error', 400, 'invalid_field', {
                errors: invalidFieldErrors,
            })
            return next(err)
        }        

        //hash password
        const hashedpassword = await bcrypt.hash(password, 10)

        var newUser = new models.User({
            first_name: first_name,
            last_name: last_name,
            email_address: email_address,
            phone: phone,
            gender: gender,
            username: username,
            password: hashedpassword
        })

        var newAddress = new models.Address({
            street_name: street_name,
            street_nr: street_nr,
            postal_code: postal_code,
            bus_nr: bus_nr,
            city: city,
            country: country
        })

        //create new user
        const [ userCreated, created ] = await userDb.createUser(newUser, newAddress)

        if(created) {
            res.status(200).send({
                message: "register successful"
            })
        }
        else {
            let err = new TypedError('register error', 409, 'invalid_field', {
                message: "user already exists"
            })
            return next(err)
        }

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const { email_address, password } = req.body;

        req.checkBody('email_address', 'Email address is required').notEmpty()
        req.checkBody('password', 'Password is required').notEmpty()

        let missingFieldErrors = req.validationErrors()
        if(missingFieldErrors) {
            let err = new TypedError('login error', 400, 'missing_field', {
                errors: missingFieldErrors,
            })
            return next(err)
        }

        req.checkBody('email_address', 'Email is not valid').isEmail()

        let invalidFieldErrors = req.validationErrors()
        if(invalidFieldErrors) {
            let err = new TypedError('login error', 400, 'invalid_field', {
                errors: invalidFieldErrors,
            })
            return next(err)
        }
   
        const result = await userDb.readUserByEmail(email_address) //result = Model, null

        if( !result || !(await bcrypt.compare(password, result.password)) ) {
            res.status(401).send({
            message: 'Email or Password is incorrect'
            })
        } else {
            const id = result.user_id;

            const token = jwt.sign({ id },
            config.jwt_secret,
            {
                expiresIn: config.jwt_expires_in
            });
   
            const cookieOptions = {
                expires: new Date(
                    Date.now() + config.jwt_cookie_expires
                ),
                httpOnly: true
            }
   
            res.cookie('jwt', token, cookieOptions );
            res.status(200).send({
                id: result.user_id,
                username: result.username,
                email: result.email_address,
            })
        }  
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message})
    }
}

const isLoggedIn = async (req, res, next) => {
    if(req.cookies.jwt) {
        try {
            //1) verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, config.jwt_secret);
   
            console.log(decoded);//debug
   
            //2) check if the user still exists
            const result = await userDb.readUserById(decoded.id) //result = Model, null
   
            //3) if exists then next()
            if(!result) {
                return next();
            }
   
            req.user = result.user_id;

            console.log("user is: " + req.user)//DEBUG

            return next();

      } catch (error) {
          console.log(error);
          return next();
      }
    } else {
        next();
    }
}
   
const logout = async (req, res) => {
    res.clearCookie('jwt')
    res.sendStatus(200)
}

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

exports.register = register
exports.login = login
exports.logout = logout
exports.getUserByID = getUserByID