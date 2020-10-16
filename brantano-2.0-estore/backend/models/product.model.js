module.exports = function(sequelize, Sequelize) {
    const Product = sequelize.define('product', {
        product_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        brand: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        size: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        release_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        retail_price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        stock_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        //TODO category FK
    })
    return Product
}