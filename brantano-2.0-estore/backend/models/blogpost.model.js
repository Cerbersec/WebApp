module.exports = function(sequelize, Sequelize) {
    const Blogpost = sequelize.define('blogpost', {
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
        //TODO admin FK
    })
    return Blogpost
}