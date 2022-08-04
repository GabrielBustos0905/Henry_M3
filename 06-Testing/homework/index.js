const express = require('express');
const app = express();
const {sumArray} = require('./utils')

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.json({
    message: 'test'
  })
})

app.post('/sum', (req, res) => {
  const {a, b} = req.body
  return res.json({
    result: a+b
  })
})

app.post('/product', (req, res) => {
  const {a, b} = req.body;
  // if(!a || !b){
  //   return res.sendStatus(400)
  // }
  if(typeof a !== "number" || typeof b !== "number"){
    return res.sendStatus(400)
  }
  res.send({
    result: a*b
  })
})

app.post('/sumArray', (req, res) => {
  const { array, num} = req.body;

  if (!array || !num && num !== 0) res.sendStatus(400)
  return res.json({result: sumArray(array, num)})

})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
