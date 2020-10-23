//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')
const models = require('../models')

const jwt = require('jsonwebtoken')
const config = require('../config/jwt-config')
const ensureAuthenticated = require('../modules/ensureAuthenticated')
const bcrypt = require('bcrypt')
const TypedError = require('../modules/ErrorHandler')

const { promisify } = require('util');

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

        req.checkBody('first_name', 'First name is required').notEmpty()
        req.checkBody('last_name', 'Last name is required').notEmpty()
        req.checkBody('email_address', 'Email address is required').notEmpty()
        req.checkBody('gender', 'Gender is required').notEmpty()
        req.checkBody('username', 'Username is required').notEmpty()
        req.checkBody('password', 'Password is required').notEmpty()
        req.checkBody('verify_password', 'Verify password is required').notEmpty()

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
        const hashedpassword = await bcrypt.hash(req.body.password, 10)

        var newCustomer = new models.customer({
            first_name: first_name,
            last_name: last_name,
            email_address: email_address,
            phone: phone,
            gender: gender,
            username: username,
            password: hashedpassword
        })

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
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
   
      //TODO validate
      if( !email || !password ) {
        return res.status(400).render('login', {
          message: 'Please provide an email and password'
        })
      }
   
      //verplaatsen naar userDb.js
      //veranderen naar Sequelize
      db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        console.log(results);

        if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
          res.status(401).render('login', {
            message: 'Email or Password is incorrect'
          })
        } else {
          const id = results[0].id;
   
          //veranderen naar config/jwt-config.js
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          });
   
          console.log("The token is: " + token);
   
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
          }
   
          res.cookie('jwt', token, cookieOptions );
          res.status(200).redirect("/");
        }
   
      })
   
    } catch (error) {
      console.log(error);
    }
  }

  const isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if( req.cookies.jwt) {
      try {
        //1) verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
   
        console.log(decoded);
   
        //2) Check if the user still exists
        //verplaatsen naar userDb.js
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
          console.log(result);
   
          if(!result) {
            return next();
          }
   
          req.user = result[0];
          console.log("user is")
          console.log(req.user);
          return next();
   
        });
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
  }
   
const logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2*1000),
      httpOnly: true
    });
   
    res.status(200).redirect('/');
}

exports.getUsers = getUsers
exports.register = register
exports.login = login
exports.logout = logout
exports.isLoggedIn = isLoggedIn