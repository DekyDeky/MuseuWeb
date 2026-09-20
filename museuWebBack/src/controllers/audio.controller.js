const connect = require('../config/connect');

const uploadAudio = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo de áudio enviado.' });
  }

  const descricao = req.body.descricao || '';
  const diretorio = `storage/audios/${req.file.filename}`;

  const query = `
    INSERT INTO audios (diretorio, descricao, data_criacao, data_atualizacao)
    VALUES (?, ?, NOW(), NOW())
  `;

  connect.query(query, [diretorio, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao salvar áudio no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao salvar no banco de dados.', details: err });
    }

    return res.status(201).json({
      message: 'Áudio salvo com sucesso!',
      audio_id: result.insertId,
      diretorio,
      descricao
    });
  });
};

const getAudios = (req, res) => {
  const query = 'SELECT * FROM audios ORDER BY audio_id DESC';

  connect.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar áudios no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao buscar no banco de dados.', details: err });
    }

    return res.status(200).json(results);
  });
};

const getAudioById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM audios WHERE audio_id = ?';

  connect.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar áudio no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao buscar no banco de dados.', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Áudio não encontrado.' });
    }

    return res.status(200).json(results[0]);
  });
};

module.exports = {
  uploadAudio,
  getAudios,
  getAudioById
};

