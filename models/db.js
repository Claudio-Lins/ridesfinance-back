const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ridesfinance', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Conexão com Banco de Dados realizada')
}).catch(function(err){
    console.log('Conexão não realizada')
})

module.exports = sequelize