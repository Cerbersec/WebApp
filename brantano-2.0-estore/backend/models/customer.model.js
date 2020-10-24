module.exports = function(sequelize, Sequelize) {
    const Customer = sequelize.define('customer', {
        customer_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        gender: {
            type: Sequelize.CHAR(1),
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING(13),
            allowNull: true
        },
        email_address: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        password: {
            type: Sequelize.CHAR(64),
            allowNull: false,
            is: /^[0-9a-f]{64}$/i
        }
    })
    return Customer
}