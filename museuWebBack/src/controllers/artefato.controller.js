const connect = require('../config/connect');

const uploadArtefato = (req, res) => {
  //Comentei pra ver se tava recebendo certo.
  //A estrutura do req do artefato é a seguinte
  /*
  
    nome : "nome",
    descricao : "descricao",
    x: 0,
    y: 0,
    z: 0,
    modelo_id : 0,
    texturas_id : [0, 1] (array de ids de texturas),
    sons_id : [0, 1] (array de ids de sons)
  
  */

  // todos os atributos são obrigatórios, menos os sons.

  const nome = req.body.nome || '';
  const descricao = req.body.descricao || '';
  const modelo_id = req.body.modelo_id || null;
  const dimensao_x = req.body.x !== undefined ? parseFloat(req.body.x) : 0;
  const dimensao_y = req.body.y !== undefined ? parseFloat(req.body.y) : 0;
  const dimensao_z = req.body.z !== undefined ? parseFloat(req.body.z) : 0;
  const texturas_id = JSON.parse(req.body.texturas_id);
  const sons_id = JSON.parse(req.body.sons_id);

  console.log(req.body.x);

  if(!modelo_id){
    console.log('Erro ao receber valores. ID do modelo não existe!')
    return res.status(400).json({error: 'Erro ao receber valores. ID do modelo não existe!'})
  }

  connect.beginTransaction((err) => {
    if(err){
      console.log('Erro ao iniciar transação.' )
      return res.status(500).json({ erro: 'Erro ao iniciar transação.' });
    }

    const query = `
      INSERT INTO artefatos (nome, descricao, modelo_id, dimensao_x, dimensao_y, dimensao_z, data_criacao, data_atualizacao)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    connect.query(query, [nome, descricao, modelo_id, dimensao_x, dimensao_y, dimensao_z], (err, result) => {
      if(err) {
        return connect.rollback(() => {
          console.log("Erro ao inserir artefato no banco de dados! ", err)
          res.status(500).json({erro: err});
        })
      }

      const idArtefato = result.insertId;

      if(texturas_id && texturas_id.length !== 0){
        const query = `INSERT INTO obj_texturas (artefato_id, textura_id) VALUES ?`;

        const valores = texturas_id.map(id => [idArtefato, parseInt(id)]);

        console.log(valores);
       
        connect.query(query, [valores], (err, result) => {
          if (err) {
              console.error('Erro ao inserir texturas:', err);
              return res.status(500).json({ erro: 'Erro ao salvar texturas' });
          }
          
          console.log('Todas as texturas foram salvas de uma vez!');

          if(sons_id && sons_id.length !== 0){
            const query = `INSERT INTO obj_audios (artefato_id, audio_id) VALUES ?`;

            const valores = sons_id.map(id => [idArtefato, parseInt(id)]);
          
            connect.query(query, [valores], (err, result) => {
              if (err) {
                  console.error('Erro ao inserir sons:', err);
                  return res.status(500).json({ erro: 'Erro ao salvar sons' });
              }
              
              console.log('Todos os sons foram salvos de uma vez!');
            });

            connect.commit((err) => {
              if (err) {
                return connect.rollback(() => {
                  console.error("Erro ao commitar alterações")
                  res.status(500).json({erro: 'Erro ao commitar alterações'})
                })
              }

              res.status(201).json({
                mensagem: 'Artefato criado com sucesso!',
                artefatoId : idArtefato
              })
            })
          }
        });
      }

      
    })

  })



  /*connect.query(query, [nome, descricao, modelo_id, dimensao_x, dimensao_y, dimensao_z], (err, result) => {
    if (err) {
      console.error('Erro ao salvar modelo 3D no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao salvar no banco de dados.', details: err });
    }*

    return res.status(201).json({
      message: 'Modelo 3D salvo com sucesso!',
      modelo_id: result.insertId,
      diretorio,
      descricao,
      dimensao_x,
      dimensao_y,
      dimensao_z
    });
  });*/
};

const getArtefatos = (req, res) => {
  const query = 'SELECT art.artefato_id, art.nome as artefato_nome, art.descricao AS artefato_descricao, art.dimensao_x, art.dimensao_y, art.dimensao_z, art.data_criacao AS artefato_criacao, art.data_atualizacao AS artefato_atualizacao, modl.modelo_id, modl.diretorio AS modelo_diretorio, modl.descricao AS modelo_descricao, modl.data_criacao AS modelo_criacao, modl.data_atualizacao AS modelo_atualizacao, tex.textura_id, tex.diretorio AS textura_diretorio, tex.descricao AS textura_descricao, tex.data_criacao AS textura_criacao, tex.data_atualizacao AS textura_atualizacao, sons.audio_id, sons.diretorio AS audio_diretorio, sons.descricao AS audio_descricao, sons.data_criacao AS audio_criacao, sons.data_atualizacao AS audio_atualizacao FROM artefatos art INNER JOIN obj_texturas objt ON objt.artefato_id = art.artefato_id INNER JOIN texturas tex ON objt.textura_id = tex.textura_id INNER JOIN obj_audios obja ON obja.artefato_id = art.artefato_id INNER JOIN audios sons ON obja.audio_id = sons.audio_id INNER JOIN modelos modl ON art.modelo_id = modl.modelo_id';

  connect.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar modelos 3D no banco de dados:', err);
      return res.status(500).json({ error: 'Erro ao buscar no banco de dados.', details: err });
    }

    const artefatos = {};

    results.forEach(row => {
    const id = row.artefato_id;

    if (!artefatos[id]) {
      artefatos[id] = {
        artefato_id: row.artefato_id,
        // coloque aqui os campos do artefato
        nome: row.artefato_nome,
        descricao: row.artefato_descricao,
        x: row.dimensao_x,
        y: row.dimensao_y,
        z: row.dimensao_z,
        criacao: row.artefato_criacao,
        atualizacao: row.artefato_atualizacao,

        // modelo
        modelo: {
          modelo_id: row.modelo_id,
          diretorio: row.modelo_diretorio,
          descricao: row.modelo_descricao,
          data_criacao: row.modelo_criacao,
          data_atualizacao: row.modelo_atualizacao
        },

        texturas: [],
        audios: []
      };
    }

    // adiciona textura somente se ainda não existir
    if (
      row.textura_id &&
      !artefatos[id].texturas.some(
        textura => textura.textura_id === row.textura_id
      )
    ) {
      artefatos[id].texturas.push({
        textura_id: row.textura_id,
        diretorio: row.textura_diretorio,
        descricao: row.textura_descricao,
        data_criacao: row.textura_criacao,
        data_atualizacao: row.textura_atualizacao
      });
    }

    // adiciona áudio somente se ainda não existir
    if (
      row.audio_id &&
      !artefatos[id].audios.some(
        audio => audio.audio_id === row.audio_id
      )
    ) {
      artefatos[id].audios.push({
        audio_id: row.audio_id,
        diretorio: row.audio_diretorio,
        descricao: row.audio_descricao,
        data_criacao: row.audio_criacao,
        data_atualizacao: row.audio_atualizacao
      });
    }
  });

    return res.status(200).json(artefatos);
  });
};



const getArtefatoById = (req, res) => {
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
  uploadArtefato,
  getArtefatos,
  getArtefatoById
};
