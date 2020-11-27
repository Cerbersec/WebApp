const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.verifyToken, userController.logout)

module.exports = router