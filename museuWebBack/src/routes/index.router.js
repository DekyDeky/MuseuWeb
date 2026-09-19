const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Huh?');
});

router.get('/home', (req, res) => {
  res.send('Home? Huh?');
});

router.get('/arquivo', (req, res) => {

  const filePath = path.join(__dirname, '../storage/source', 'MushyBuddywithTex.fbx');

  res.download(filePath, 'bagulho.fbx', (err) => {
    if (err) {
      console.error('Erro ao baixar:', err);
      if (!res.headersSent) {
        res.status(500).send('Erro ao tentar baixar o arquivo. ' + filePath);
      }
    }
  }); 
})

module.exports = router;