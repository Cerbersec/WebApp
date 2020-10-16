module.exports = function(sequelize, Sequelize) {
    const Order = sequelize.define('order', {
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
        }
        //TODO customer FK
    })
    return Order
}