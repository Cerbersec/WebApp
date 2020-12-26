const express = require('express')
const router = express.Router()
const { adminController } = require('../controllers')
const { authJwt } = require('../middleware')

router.get('/', [authJwt.verifyToken, authJwt.isAdministrator], adminController.test)

module.exports = router