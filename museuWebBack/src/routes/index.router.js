const express = require('express');
const path = require('path');
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

  //Alterei o nome das rotas e adicionei uns gets pro formulário funcionar
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
router.post('/criar/artefato', upload.none(), uploadArtefatoController); //o artefato não recebe arquivo, então coloquei o upload.none

router.use(
  '/storage/textura',
  express.static(path.join(__dirname, 'storage/textura'))
);

router.use(
  '/storage/audio',
  express.static(path.join(__dirname, 'storage/audio'))
);

router.use(
  '/storage/modelo',
  express.static(path.join(__dirname, 'storage/modelo'))
);

module.exports = router;

