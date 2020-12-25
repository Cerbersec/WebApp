const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')
const { verifySignup, authJwt } = require('../middleware')

router.post('/register', [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted], authController.register)
router.post('/login', authController.login)
router.get('/logout', authJwt.verifyToken, authController.logout)

module.exports = router