module.exports = function(sequelize, Sequelize) {
    const Order = sequelize.define('Order', {
        order_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        total_price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        shipping_costs: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        paid: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    },
    {
        underscored: true
    })

    Order.associate = models => {
        Order.hasMany(models.Orderline, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'order_id'
            }
        })

        Order.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })
    }

    return Order
}