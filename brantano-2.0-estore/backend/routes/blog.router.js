const express = require('express')
const router = express.Router()
const { blogController } = require('../controllers')
const ensureAuthenticated = require('../modules/ensureAuthenticated')

router.get('/', blogController.getPosts)
router.get('/:postId', blogController.getPost)

//TODO ensureAuthenticated
router.post('/create', blogController.putPost)
router.get('/delete/:postId', blogController.removePost)

module.exports = router