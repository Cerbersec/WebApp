const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const { authJwt } = require('../middleware')

router.get('/details', authJwt.verifyToken, userController.getUserByID)

module.exports = router