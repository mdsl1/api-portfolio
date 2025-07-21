const { body } = require('express-validator');

exports.validarProjeto = [
    body('titulo')
        .trim()
        .notEmpty().withMessage('O título é obrigatório.')
        .isLength({ max: 100 }).withMessage('Título muito longo.'),
    body('tipo')
        .trim()
        .notEmpty().withMessage('O tipo é obrigatório.')
        .isIn(['backend', 'frontend', 'logica', 'automacao', 'desktop', 'mobile']).withMessage('Tipo inválido.'),
    body('img')
        .optional()
        .trim()
        .notEmpty().withMessage('URL da imagem inválida.'),
    body('descricao')
        .trim()
        .notEmpty().withMessage('Descrição é obrigatória.')
        .isLength({ max: 1000 }).withMessage('Descrição muito longa.'),
    body('tecnologia_ids')
        .isArray().withMessage('Tecnologias devem ser um array.'),
    body('adaptacao_ids')
        .optional()
        .isArray().withMessage('Adaptações devem ser um array.'),
    body('github_url')
        .optional()
        .trim()
        .isURL().withMessage('URL do GitHub inválida.'),
    body('site_url')
        .optional()
        .trim()
        .isURL().withMessage('URL do site inválida.')
];
