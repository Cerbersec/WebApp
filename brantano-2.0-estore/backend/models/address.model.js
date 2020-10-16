module.exports = function(sequelize, Sequelize) {
    const Address = sequelize.define('address', {
        address_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        street_name: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        postal_code: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        street_nr: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        bus_nr: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        country: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
        //TODO customer FK
    })
    return Address
}