const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const projetosRouter = require('./routes/projetos');
const authRouter = require('./routes/auth');
const tecnologiasRouter = require('./routes/tecnologias');

app.use(cors());
app.use(express.json());

// Rota para autenticação
app.use('/auth', authRouter);
// Rota para projetos
app.use('/projetos', projetosRouter);
// Rota para listar tecnologias
app.use('/tecnologias', tecnologiasRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
