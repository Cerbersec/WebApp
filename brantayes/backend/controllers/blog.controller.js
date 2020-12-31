//PGUR: Put, Get, Update, Remove
const blogDb = require('../db/blogDb')
const models = require('../models')
const TypedError = require('../modules/ErrorHandler')

const getPosts = async (req, res, next) => {
    try {
        const posts = await blogDb.readPosts()

        if(posts) {
            res.json({
                posts: posts,
            })
        }
        else {
            res.send({
                message: "no posts found"
            })
        }

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getPost = async (req, res, next) => {
    const post_id = req.params.postId
    try {
        const post = await blogDb.readPost(post_id)
        res.send(JSON.stringify(post, null, 2))

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

//TODO assign administrator to blogpost
const putPost = async (req, res, next) => {
    try {
        const { title, content} = req.body

        const newPost = new models.Blogpost({
            title: title,
            content: content,
            post_date: new Date(),
            user_id: req.user_id
        })

        const post = await blogDb.createPost(newPost)
        if(post) {
            res.status(200).send({
                message: 'post created'
            })
        }
        else {
            res.status(500).send({
                message: 'something went wrong'
            })
        }

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const removePost = async (req, res, next) => {
    const post_id = req.params.postId
    try {
        const post = await blogDb.deletePost(post_id)
        res.send({
            message: 'post removed'
        })

    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}


exports.getPosts = getPosts
exports.getPost = getPost
exports.putPost = putPost
exports.removePost = removePost