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

module.exports = {
  uploadAudio
};
