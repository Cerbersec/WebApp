//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')
const blogDb = require('../db/blogDb')
const models = require('../models')

const jwt = require('jsonwebtoken')
const config = require('../config/jwt-config')
const ensureAuthenticated = require('../modules/ensureAuthenticated')
const bcrypt = require('bcrypt')
const TypedError = require('../modules/ErrorHandler')

const { promisify } = require('util');

const getPosts = async (req, res, next) => {
    try {
        const posts = await blogDb.readPosts()
        res.send(JSON.stringify(posts, null, 2))

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
            post_date: new Date()
        })

        const post = await blogDb.createPost(newPost)
        res.send({
            message: 'post created'
        })

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