const db = require('../db');


exports.inserirProjeto = async (req, res) => {
    const {
        titulo,
        tipo,
        img,
        descricao,
        tecnologia_ids,
        adaptacao_ids,
        github_url,
        site_url
    } = req.body;

    try {
        await db.query(
            `SELECT inserir_projeto($1, $2, $3, $4, $5, $6, $7, $8)`,
            [titulo, tipo, img, descricao, tecnologia_ids, adaptacao_ids, github_url, site_url]
        );

        res.status(201).json({ mensagem: 'Projeto inserido com sucesso!' });
    } catch (error) {
        console.error('Erro ao inserir projeto:', error);
        res.status(500).json({ erro: 'Erro ao inserir projeto' });
    }
    };


exports.listarProjetos = async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM view_projetos_completos ORDER BY id DESC`);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar projetos:', error);
        res.status(500).json({ erro: 'Erro ao buscar projetos' });
    }
};
