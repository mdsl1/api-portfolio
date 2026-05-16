const express = require('express');
const router = express.Router();
const { validarLogin } = require('../controllers/authController');
const authAPI = require('../validators/authAPI');

router.post('/login', validarLogin);

module.exports = router;