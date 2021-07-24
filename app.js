const express = require('express');
const app = express();

// const db = require('./models/db')
const Ride = require('./models/Rides')

app.use(express.json())

app.get('/listar', async (req, res) => {
    await Ride.findAll({order: [['id', 'DESC']]}).then(function(rides){
        return res.json({
            error: false,
            rides
        })
    }).catch(function(){
        return res.json({
            error: true,
            mensagem: "ERROR: Nenhum 
        })
    })
})

app.post('/income', async (req, res) => {
    await Ride.create(req.body).then(function(){
        return res.json({
            error: false,
            mensagem: "Lançamento cadastrado com SUCESSO!"
        })
    }).catch(function(){
        return res.status(400).json({
            error: true,
            mensagem: "ERROR: Lançamento não cadastrado com SUCESSO!"
        })
    })
})

app.listen(8080, function(){
    console.log('Servidor rodando!!')
})