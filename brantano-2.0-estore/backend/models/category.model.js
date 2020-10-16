module.exports = function(sequelize, Sequelize) {
    const Category = sequelize.define('category', {
        category_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        category_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING(1),
            allowNull: true
        },
        category_age: {
            type: Sequelize.STRING(8),
            allowNull: true
        }
    })
    return Category
}