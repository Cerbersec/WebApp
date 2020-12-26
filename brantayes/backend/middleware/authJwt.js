//PGUR: Put, Get, Update, Remove
const userDb = require('../db/userDb')
const models = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/jwt-config')



const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt

    if(!token) {
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    try {
        jwt.verify(token, config.jwt_secret, (err, decoded) => {
            if(err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                })
            }
            req.user_id = decoded.id
            next()
        })
    }
    catch(error) {
        console.log(error)
        res.status(500).send({
            message: "Something went wrong!"
        })
    }
}

const isAdministrator = async(req, res, next) => {
    models.User.findByPk(req.user_id).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "administrator") {
                    next();
                    return;
                }
            }
  
            res.status(403).send({
                message: "Requires administrator role"
            });
            return;
        });
    });
};
  
const isModerator = async(req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
  
            res.status(403).send({
                message: "Requires moderator role"
            });
        });
    });
};
  
const isModeratorOrAdministrator = async(req, res, next) => {
    User.findByPk(req.user_id).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
  
                if (roles[i].name === "administrator") {
                    next();
                    return;
                }
            }
  
            res.status(403).send({
                message: "Requires moderator or administrator role"
            });
        });
    });
};

exports.verifyToken = verifyToken
exports.isAdministrator = isAdministrator
exports.isModerator = isModerator
exports.isModeratorOrAdministrator = isModeratorOrAdministrator