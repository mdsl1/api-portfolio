const express = require('express');
const router = express.Router();
const authAPI = require('../validators/authAPI');

const { inserirProjeto, listarProjetos } = require('../controllers/projetosController');
const { validarProjeto } = require('../validators/projetosValidator');

router.post('/', authAPI, validarProjeto, inserirProjeto);
router.get('/',listarProjetos);

module.exports = router;
