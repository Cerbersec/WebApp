const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const { authJwt } = require('../middleware')
const { verifyToken } = require('../middleware/authJwt')

router.get('/details', authJwt.verifyToken, userController.getUserByID)
router.post('/update', authJwt.verifyToken, userController.updateUser)
router.get('/delete', authJwt.verifyToken, userController.removeUser)
router.post('/address/add', authJwt.verifyToken, userController.addUserAddress)
router.post('/address/update', authJwt.verifyToken, userController.updateUserAddress)
router.get('/address/delete', authJwt.verifyToken, userController.removeUserAddress)

module.exports = router