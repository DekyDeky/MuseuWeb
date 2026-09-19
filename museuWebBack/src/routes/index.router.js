const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Huh?');
});

router.get('/home', (req, res) => {
  res.send('Home? Huh?');
});

router.post('/upload/audio', (req, res) => {
  console.log(req.body.nome);
  res.send(req.body);
});

module.exports = router;