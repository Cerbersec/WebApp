const express = require('express')
const router = express.Router()
//const jwt = require('jsonwebtoken')
//const config = require('../config/jwt-config')
//const ensureAuthenticated = require('../modules/ensureAuthenticated')
const { userController } = require('../controllers')

//router.post('/signin', userController.signIn)
//router.post('/login', userController.login)
//router.get('/:userId/cart', ensureAuthenticated, userController.getCart)
//router.post('/:userId/cart', ensureAuthenticated, userController.postCart)
//router.post('/:userId/cart', ensureAuthenticated, userController.putCart)

router.get('/', userController.getUsers)

module.exports = router