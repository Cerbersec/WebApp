module.exports = function(sequelize, Sequelize) {
    const Review = sequelize.define('Review', {
        review_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            is: /^[0-9]{1}$/i
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        review_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    },
    {
        underscored: true
    })

    Review.associate = models => {
        Review.belongsTo(models.Product, {
            foreignKey: {
                name: 'product_id',
                allowNull: false
            }
        })

        Review.belongsTo(models.Customer, {
            foreignKey: {
                name: 'customer_id',
                allowNull: false
            }
        })
    }

    return Review
}