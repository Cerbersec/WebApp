module.exports = function(sequelize, Sequelize) {
    const Role = sequelize.define('Role', {
        role_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
    },
    {
        underscored: true
    })

    Role.associate = models => {
        Role.belongsToMany(models.User, {
            through: "user_roles",
            foreignKey: "role_id",
            otherKey: "user_id",
        })
    }

    return Role
}