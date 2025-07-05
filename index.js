const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const projetosRouter = require('./routes/projetos');

app.use(cors());
app.use(express.json());

app.use('/projetos', projetosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
