module.exports = function(sequelize, Sequelize) {
    const Administrator = sequelize.define('administrator', {
        admin_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.CHAR(64),
            allowNull: false,
            is: /^[0-9a-f]{64}$/i
        }
    })
    return Administrator
}