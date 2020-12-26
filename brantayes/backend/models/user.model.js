module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('User', {
        user_id: {
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
            type: Sequelize.CHAR(60),
            allowNull: false
        }
    },
    {
        underscored: true
    })

    User.associate = models => {
        User.hasMany(models.Address, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'user_id'
            }
        })

        User.hasMany(models.Review, {
            onDelete: 'set null',
            foreignKey: {
                name: 'user_id'
            }
        })

        User.hasMany(models.Order, {
            onDelete: 'set null',
            foreignKey: {
                name: 'user_id'
            }
        })

        User.hasMany(models.Blogpost, {
            onDelete: 'cascade',
            foreignKey: {
                name: 'user_id'
            }
        })

        User.belongsToMany(models.Role, {
            through: "user_roles",
            foreignKey: "user_id",
            otherKey: "role_id"
        })
    }

    return User
}