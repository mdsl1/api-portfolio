const express = require('express');
const router = express.Router();
const { listarTecnologias } = require('../controllers/tecnologiasController');

router.get('/show', listarTecnologias);

module.exports = router;