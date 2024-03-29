const express = require('express')
const router = express.Router()
const { blogController } = require('../controllers')
const { authJwt } = require('../middleware')

router.get('/posts', blogController.getPosts)
router.get('/posts/:postId', blogController.getPost)

router.post('/posts/create', [authJwt.verifyToken, authJwt.isAdministrator], blogController.putPost)
router.post('/posts/edit/:postId', [authJwt.verifyToken, authJwt.isAdministrator], blogController.updatePost)
router.get('/posts/delete/:postId', [authJwt.verifyToken, authJwt.isAdministrator], blogController.removePost)

module.exports = router