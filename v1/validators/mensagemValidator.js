const { body } = require('express-validator');

exports.validarMensagem = [
    body('nome')
        .trim()
        .notEmpty().withMessage('O nome é obrigatório.'),
    body('email')
        .trim()
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('E-mail inválido.'),
    body('assunto')
        .trim()
        .notEmpty().withMessage('Assunto é obrigatório.'),
    body('mensagem')
        .trim()
        .notEmpty().withMessage('Descrição é obrigatória.')
];