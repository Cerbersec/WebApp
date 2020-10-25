module.exports = function(sequelize, Sequelize) {
    const Administrator = sequelize.define('Administrator', {
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
            type: Sequelize.CHAR(60),
            allowNull: false
        }
    },
    {
        underscored: true
    })

    Administrator.associate = models => {
        Administrator.hasMany(models.Blogpost, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'admin_id'
            }
        })
    }

    return Administrator
}