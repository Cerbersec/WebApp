// CRUD: create, read, update, delete
const models = require('../models')

const readPosts = () => {
    return models.Blogpost.findAll()
}

const readPost = async (post_id) => {
    return models.Blogpost.findOne({ where: { post_id: post_id } })
}

const createPost = async (post) => {
    return models.Blogpost.create({
        title: post.title,
        content: post.content,
        post_date: post.post_date,
        user_id: post.user_id
    })
}

const deletePost = async (post_id) => {
    return models.Blogpost.destroy({
        where: {
            post_id: post_id
        }
    })
}


exports.readPosts = readPosts
exports.readPost = readPost
exports.createPost = createPost
exports.deletePost = deletePost