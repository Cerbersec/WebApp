module.exports = function(sequelize, Sequelize) {
    const Orderline = sequelize.define('orderline', {
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
            allowNull: false
        },
        discount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        //TODO order FK, product FK
    })
    return Orderline
}