const express = require('express');
const router = express.Router();
const authAPI = require('../validators/authAPI');

const { inserirMensagem, listarMensagens } = require('../controllers/mensagemController');
const { validarMensagem } = require('../validators/mensagemValidator');

router.post('/', validarMensagem, inserirMensagem);
router.get('/', listarMensagens);

module.exports = router;