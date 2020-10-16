module.exports = function(sequelize, Sequelize) {
    const Review = sequelize.define('review', {
        review_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(400),
            allowNull: true
        },
        review_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
        //TODO customer FK, product FK
    })
    return Review
}