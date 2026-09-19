const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Huh?');
});

router.get('/home', (req, res) => {
  res.send('Home? Huh?');
});



module.exports = router;