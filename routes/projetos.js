const express = require('express');
const router = express.Router();
const { inserirProjeto, listarProjetos } = require('../controllers/projetosController');

router.post('/', inserirProjeto);
router.get('/', listarProjetos);

module.exports = router;
