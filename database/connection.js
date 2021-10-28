const mongoose = require('mongoose');
// require('dotenv').config();

mongoose
    .connect(process.env.ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Conectado a la base de datos'))
    .catch((err) => console.error('ERROR AL CONECTAR DB: ', err));

/* mongoose
  .connect('mongodb://localhost:27017/dbserver')
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('ERROR AL CONECTAR DB: ', err)); */