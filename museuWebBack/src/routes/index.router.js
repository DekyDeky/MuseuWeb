const express = require('express');
const upload = require('../middlewares/upload.middleware');
const uploadModelo = require('../middlewares/uploadModelo.middleware');
const { uploadAudio, getAudios, getModelos, getTexturas, getAudioById } = require('../controllers/audio.controller');
const { uploadArtefato: uploadArtefatoController, getArtefatos, getArtefatoById } = require('../controllers/artefato.controller');

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

//Rotas de Modelos
router.get('/modelos', getModelos);

// Rotas de Texturas
router.get('/texturas', getTexturas);

// Rotas de Modelos 3D
router.get('/artefatos', getArtefatos);
router.get('/artefatos/:id', getArtefatoById);
router.post('/criar/artefato', upload.none(), uploadArtefatoController);

module.exports = router;

