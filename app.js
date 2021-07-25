const express = require("express");
const { Op } = require("sequelize");

const cors = require("cors");
const app = express();

// const db = require('./models/db')
const Lancamentos = require("./models/Lancamentos");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER, Content-Type, Authorization"
  );
  app.use(cors());
  next();
});

app.get("/listar/:mes/:ano", async (req, res) => {
  let mes = new Number(req.params.mes);
  let ano = new Number(req.params.ano);
  // console.log("Dia: " + dia + " mês: " + mes)
  const date = new Date(ano + "/" + mes);
  let primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
  let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // console.log('Primeiro dia do mês ' + primeiroDia)
  // console.log('Último dia do mês ' + ultimoDia)

  const lancamentos = await Lancamentos.findAll({
    order: [["dataPagamento", "ASC"]],
    where: {
      dataPagamento: {
        [Op.between]: [primeiroDia, ultimoDia],
      },
    },
  });

  const valorPagamento = await Lancamentos.sum("valor", {
    where: {
      tipo: "1",
      dataPagamento: {
        [Op.between]: [primeiroDia, ultimoDia],
      },
    },
  });
  const valorRecebido = await Lancamentos.sum("valor", {
    where: {
      tipo: "2",
      dataPagamento: {
        [Op.between]: [primeiroDia, ultimoDia],
      },
    },
  });

  const saldo = new Number(valorRecebido) - new Number(valorPagamento);

  return res.json({
    erro: false,
    lancamentos,
    valorPagamento,
    valorRecebido,
    saldo,
  });
});

app.post("/cadastrar", async (req, res) => {
  await Lancamentos.create(req.body)
    .then(function () {
      return res.json({
        error: false,
        mensagem: "Lançamento cadastrado com SUCESSO!",
      });
    })
    .catch(function () {
      return res.status(400).json({
        error: true,
        mensagem: "ERROR: Lançamento não cadastrado com SUCESSO!",
      });
    });
});

app.listen(8080, function () {
  console.log("Servidor rodando!!");
});
