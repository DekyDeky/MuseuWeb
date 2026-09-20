const express = require('express');
const upload = require('../middlewares/upload.middleware');
const { uploadAudio } = require('../controllers/audio.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Huh?');
});

router.get('/home', (req, res) => {
  res.send('Home? Huh?');
});

router.post('/upload/audio', upload.single('arquivo'), uploadAudio);

module.exports = router;