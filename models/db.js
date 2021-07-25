const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('cz3ub8fy_rides', 'cz3ub8fy_rides', 'Ride$Finance', {
    host: 'lhcp3073.webapps.net',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Conexão com Banco de Dados realizada')
}).catch(function(err){
    console.log('Conexão não realizada')
})

module.exports = sequelize