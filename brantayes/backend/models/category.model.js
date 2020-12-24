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
        product_group: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
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