const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')

//optionals
//const jwt = require('jsonwebtoken')
//const config = require('../config/jwt-config')
//const ensureAuthenticated = require('../modules/ensureAuthenticated')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.isLoggedIn, userController.logout)

//router.get('/:userId/cart', ensureAuthenticated, userController.getCart)
//router.post('/:userId/cart', ensureAuthenticated, userController.postCart)
//router.post('/:userId/cart', ensureAuthenticated, userController.putCart)

router.get('/', userController.isLoggedIn, userController.getUsers)

module.exports = router