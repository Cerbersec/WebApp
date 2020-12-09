module.exports = function(sequelize, Sequelize) {
    const Orderline = sequelize.define('Orderline', {
        orderline_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subtotal_price: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        discount: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        color: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        size: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        underscored: true
    })

    Orderline.associate = models => {
        Orderline.belongsTo(models.Product, {
            foreignKey: {
                name: 'product_id',
                allowNull: false 
            }
        })

        Orderline.belongsTo(models.Order, {
            foreignKey: {
                name: 'order_id',
                allowNull: false
            }
        })
    }

    return Orderline
}