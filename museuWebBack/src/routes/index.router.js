const express = require('express');
const upload = require('../middlewares/upload.middleware');
const uploadModelo = require('../middlewares/uploadModelo.middleware');
const { uploadAudio, getAudios, getAudioById } = require('../controllers/audio.controller');
const { uploadModelo: uploadModeloController, getModelos, getModeloById } = require('../controllers/modelo.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Huh?');
});

router.get('/home', (req, res) => {
  res.send('Home? Huh?');
});

// Rotas de Áudio
router.get('/audios', getAudios);
router.get('/audios/:id', getAudioById);
router.post('/upload/audio', upload.single('arquivo'), uploadAudio);

// Rotas de Modelos 3D
router.get('/modelos', getModelos);
router.get('/modelos/:id', getModeloById);
router.post('/upload/modelo', uploadModelo.single('arquivo'), uploadModeloController);

module.exports = router;
