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
    },
    dateRide: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fee: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

// Verifica se existe a tabela, não exitindo a tabela é criado a mesma
// Ride.sync()

// Verifica as alterações da tabela e realiza a mesma
// Ride.sync({ alter: true })

module.exports = Ride