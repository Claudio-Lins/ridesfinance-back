const express = require('express');
const { Op } = require('sequelize')

const cors = require('cors')
const app = express();

// const db = require('./models/db')
const Ride = require('./models/Rides')

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    app.use(cors())
    next()
})


app.get('/listar/:dia/:mes/:ano', async (req, res) => {
    let dia = new Number(req.params.dia)
    let mes = new Number(req.params.mes)
    let ano = new Number(req.params.ano)
    // console.log("Dia: " + dia + " mês: " + mes)
    const date = new Date(ano + '/' + mes + '/' + dia)
    let primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1)
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    // console.log('Primeiro dia do mês ' + primeiroDia)
    // console.log('Último dia do mês ' + ultimoDia)

    const rides = await Ride.findAll({
        order: [['dateRide', 'ASC']],
        where: {
            "dateRide": {
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    })

    const amountMonth = await Ride.sum("amount", {
        where: {
            "dateRide": {
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    })
    return res.json({
        erro: false,
        rides,
        amountMonth
    })
})

app.post('/income', async (req, res) => {
    await Ride.create(req.body).then(function () {
        return res.json({
            error: false,
            mensagem: "Ride cadastrado com SUCESSO!"
        })
    }).catch(function () {
        return res.status(400).json({
            error: true,
            mensagem: "ERROR: Ride não cadastrado com SUCESSO!"
        })
    })
})

app.listen(8080, function () {
    console.log('Servidor rodando!!')
})