const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const { authJwt } = require('../middleware/authJwt')

router.get('/details', authJwt.verifyToken, userController.getCustomerByID)

module.exports = router