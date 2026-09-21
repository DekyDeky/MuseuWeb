  const express = require('express');
  const cors = require('cors');
  const path = require('path');
  const router = require('./routes/index.router');
  const connect = require('./config/connect');

  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json());

  app.use('/storage', express.static(path.join(__dirname, '../storage')));
  app.use("/", router);

  connect.connect((err) => {
      if(err){
          console.log("Falha ao se conectar com o banco! ", err);
      } else {
          console.log("Conexão ao banco realizada!");
      }
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
  });