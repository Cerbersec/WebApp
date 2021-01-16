//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')
const models = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/jwt-config')
const bcrypt = require('bcryptjs')
const { transporter, getPasswordResetURL, resetPasswordTemplate } = require('../modules/email')
const TypedError = require('../modules/ErrorHandler')
const { promisify } = require('util');
const { send } = require('process')

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
        req.checkBody('street_name', 'Street name is required').notEmpty()
        req.checkBody('postal_code', 'Postal code is required').notEmpty()
        req.checkBody('street_nr', 'Street number is required').notEmpty()
        req.checkBody('city', 'City is required').notEmpty()
        req.checkBody('country', 'Country is required').notEmpty()

        let missingFieldErrors = req.validationErrors()
        if(missingFieldErrors) {
            console.log(missingFieldErrors)
            res.status(400).send({
                message: 'Missing field. ' + missingFieldErrors.map(e => {return e.msg})
            })
        }

        req.checkBody('email_address', 'Email is not valid').isEmail()
        req.checkBody('password', 'Passwords have to match').equals(verify_password)

        let invalidFieldErrors = req.validationErrors()
        if(invalidFieldErrors) {
            res.status(400).send({
                message: 'Invalid field. ' + invalidFieldErrors.map(e => {return e.msg})
            })
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
                message: 'Register successful.'
            })
        }
        else {
            res.status(400).send({
                message: 'An account with this email address already exists.'
            })
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
            res.status(400).send({
                message: 'Missing field. ' + missingFieldErrors.map(e => {return e.msg})
            })
        }

        req.checkBody('email_address', 'Email is not valid').isEmail()

        let invalidFieldErrors = req.validationErrors()
        if(invalidFieldErrors) {
            res.status(400).send({
                message: 'Email address is not valid.'
            })
        }
   
        const user = await userDb.readUserByEmail(email_address) //result = Model, null

        if(!user) {
            res.status(400).send({
                message: 'Account does not exist.'
            })
        } else if(!(await bcrypt.compare(password, user.password))) {
            res.status(400).send({
                message: 'Incorrect password.'
            })
        } else {
            const id = user.user_id;

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

            let authorities = []
            const roles = await userDb.readUserRoles(user.user_id)
            for(let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
   
            res.cookie('jwt', token, cookieOptions );
            res.status(200).send({
                id: user.user_id,
                username: user.username,
                email: user.email_address,
                roles: authorities,
            })
        }  
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message})
    }
}
   
const logout = async (req, res) => {
    res.clearCookie('jwt')
    res.sendStatus(200)
}

// password reset functionality
const makeToken = ({password: passwordHash, user_id: user_id, createdAt}) => {
    const secret = passwordHash + "-" + createdAt
    const token = jwt.sign({ user_id }, secret, { expiresIn: 3600})

    return token
}

const sendPasswordResetEmail = async(req, res) => {
    try {
        const { email_address } = req.body
        
        const user = await userDb.readUserByEmail(email_address)

        if(user) {
            const token = Buffer.from(makeToken(user)).toString('base64')
            const url = getPasswordResetURL(user, token)
            const emailTemplate = resetPasswordTemplate(user, url)

            const sendEmail = () => {
                transporter.sendMail(emailTemplate, (err, info) => {
                    if(err) {
                        res.status(500).send({
                            message: "Email could not be sent"
                        })
                    }
                    console.log(`Email sent`, info.response)
                    console.log(`Email info`, info.messageId)
                    res.status(200).send({
                        message: "Email sent"
                    })
                })
            }
            sendEmail()
        }
        else {
            res.status(500).send({
                message: "Email could not be sent"
            })
        }
    } catch(error) {
        console.log(error)
        res.status(500).send({
            message: error.message
        })
    }
}



const receiveNewPassword = async(req, res) => {
    try {
    const user_id = req.params.user_id
    const token = Buffer.from(req.params.token, 'base64').toString('ascii')
    const { password } = req.body

    const user = await userDb.readUserById(user_id)

    if(user) {
        const secret = user.password + "-" + user.createdAt
        const payload = jwt.decode(token, secret)

        if(payload.user_id == user.user_id) {
            bcrypt.genSalt(10, function(err, salt) {
                //TODO: error handling
                if(err) return
                bcrypt.hash(password, salt, async function(err, hash) {
                    //TODO: error handling
                    if(err) return
                    console.log("updating")
                    user.password = hash
                    const result = await user.save({ fields: ['password'] })
                    if(result) {
                        res.status(202).send({
                            message: "Password successfully changed"
                        })
                    }
                    else {
                        res.status(500).send({
                            message: "Something went wrong"
                        })
                    }
                })
            })
        }
        else {
            res.status(404).send({
                message: "Invalid user"
            })
        }
    }
    } catch(error) {
        console.log(error)
        res.status(500).send({
            message: error.message
        })
    }
}

exports.register = register
exports.login = login
exports.logout = logout
exports.sendPasswordResetEmail = sendPasswordResetEmail
exports.receiveNewPassword = receiveNewPassword