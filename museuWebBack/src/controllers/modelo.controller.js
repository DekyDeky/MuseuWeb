const connect = require('../config/connect');

const uploadModelo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo de modelo 3D enviado.' });
  }

  const descricao = req.body.descricao || '';
  const dimensao_x = req.body.dimensao_x !== undefined ? parseFloat(req.body.dimensao_x) : 0;
  const dimensao_y = req.body.dimensao_y !== undefined ? parseFloat(req.body.dimensao_y) : 0;
  const dimensao_z = req.body.dimensao_z !== undefined ? parseFloat(req.body.dimensao_z) : 0;

  const diretorio = `storage/modelos/${req.file.filename}`;

  const query = `
    INSERT INTO modelos (diretorio, descricao, dimensao_x, dimensao_y, dimensao_z, data_criacao, data_atualizacao)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;

  connect.query(query, [diretorio, descricao, dimensao_x, dimensao_y, dimensao_z], (err, result) => {
    if (err) {
      console.error('Erro ao salvar modelo 3D no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao salvar no banco de dados.', details: err });
    }

    return res.status(201).json({
      message: 'Modelo 3D salvo com sucesso!',
      modelo_id: result.insertId,
      diretorio,
      descricao,
      dimensao_x,
      dimensao_y,
      dimensao_z
    });
  });
};

const getModelos = (req, res) => {
  const query = 'SELECT * FROM modelos ORDER BY modelo_id DESC';

  connect.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar modelos 3D no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao buscar no banco de dados.', details: err });
    }

    return res.status(200).json(results);
  });
};

const getModeloById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM modelos WHERE modelo_id = ?';

  connect.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar modelo 3D no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao buscar no banco de dados.', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Modelo 3D não encontrado.' });
    }

    return res.status(200).json(results[0]);
  });
};

module.exports = {
  uploadModelo,
  getModelos,
  getModeloById
};
