const express = require('express');
const app = express();

// const db = require('./models/db')
const Ride = require('./models/Rides')

app.get('/listar', (req, res) => {
    res.send('Extrato Financeiro')
})

app.listen(8080, function(){
    console.log('Servidor rodando!!')
})