module.exports = function(sequelize, Sequelize) {
    const Address = sequelize.define('Address', {
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
            type: Sequelize.STRING(10),
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
    },
    {
        underscored: true
    })

    Address.associate = models => {
        Address.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        })
    }

    return Address
}