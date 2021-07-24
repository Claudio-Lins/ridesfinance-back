const Sequelize = require('sequelize')
const db = require('./db')

const Ride = db.define('rides', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

// Ride.sync()

module.exports = Ride