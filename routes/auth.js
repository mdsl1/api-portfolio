const express = require('express');
const router = express.Router();
const { validarLogin } = require('../controllers/authController');

router.post('/login', validarLogin);

module.exports = router;