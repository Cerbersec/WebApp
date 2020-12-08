const express = require('express')
const router = express.Router()
const { blogController } = require('../controllers')
const { userController } = require('../controllers')

router.get('/', blogController.getPosts)
router.get('/:postId', blogController.getPost)

router.post('/create', userController.verifyToken, blogController.putPost)
router.get('/delete/:postId',userController.verifyToken, blogController.removePost)

module.exports = router