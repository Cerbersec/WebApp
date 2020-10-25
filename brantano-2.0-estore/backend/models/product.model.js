module.exports = function(sequelize, Sequelize) {
    const Product = sequelize.define('Product', {
        product_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        brand: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        size: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        release_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        retail_price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        underscored: true
    })

    Product.associate = models => {
        Product.hasMany(models.Review, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'product_id'
            }
        })

        Product.hasMany(models.Orderline, {
            onDelete: 'set null',
            foreignKey: {
                name: 'product_id'
            }
        })

        Product.belongsTo(models.Category, {
            foreignKey: {
                name: 'category_id',
                allowNull: false
            }
        })
    }

    return Product
}