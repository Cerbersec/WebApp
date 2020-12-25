const models = require('../models')

module.exports = function(sequelize, Sequelize) {
    const Blogpost = sequelize.define('Blogpost', {
        post_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        post_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    },
    {
        underscored: true
    })

    Blogpost.associate = models => {
        Blogpost.belongsTo(models.User, {
            foreignKey: {
                name: 'user_Id',
                allowNull: false
            }
        })
    }

    return Blogpost
}