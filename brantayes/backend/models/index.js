const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = require('../config/database')

let db = {};

fs
   .readdirSync(__dirname)
   .filter(file => (file.indexOf(".") !== 0) && (file !== 'index.js'))
   .forEach(file => {
       let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
       db[model.name] = model;
   });

Object.keys(db).forEach(modelName => {
   if("associate" in db[modelName]) {
       db[modelName].associate(db);
   }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ROLES = ["user", "administrator", "moderator"]

module.exports = db;