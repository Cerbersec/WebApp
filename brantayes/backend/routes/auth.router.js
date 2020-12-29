const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')
const { verifySignup, authJwt } = require('../middleware')

router.post('/register', [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted], authController.register)
router.post('/login', authController.login)
router.get('/logout', authJwt.verifyToken, authController.logout)
router.post('/password-reset', authController.sendPasswordResetEmail)
router.post('/receive-new-password/:user_id/:token', authController.receiveNewPassword)

module.exports = router