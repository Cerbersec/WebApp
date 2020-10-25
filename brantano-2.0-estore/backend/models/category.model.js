module.exports = function(sequelize, Sequelize) {
    const Category = sequelize.define('Category', {
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
            type: Sequelize.CHAR(1),
            allowNull: true
        },
        category_age: {
            type: Sequelize.STRING(8),
            allowNull: true
        }
    },
    {
        underscored: true
    })

    Category.associate = models => {
        Category.hasMany(models.Product, {
            onDelete: 'set null',
            foreignKey: {
                name: 'category_id'
            }
        })
    }

    return Category
}