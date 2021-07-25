const Sequelize = require('sequelize')
const db = require('./db')

const Lancamento = db.define('lancamentos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },//Tipo 1: Despesa Tipo 2: Recebendo
    situacao: {
        type: Sequelize.INTEGER,
        allowNull: true
    },//Tipo 1: Pago Tipo 2: Pendente
    dataPagamento: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

// Verifica se existe a tabela, não exitindo a tabela é criado a mesma
// Lancamento.sync()

// Verifica as alterações da tabela e realiza a mesma
// Lancamento.sync({ alter: true })

module.exports = Lancamento