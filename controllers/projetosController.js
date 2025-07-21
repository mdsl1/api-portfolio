const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

const headers = {
    'apikey': SUPABASE_API_KEY,
    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

exports.inserirProjeto = async (req, res) => {

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }

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

    const dadosValidados = {
        titulo: sanitizeHtml(titulo),
        tipo: sanitizeHtml(tipo),
        img: sanitizeHtml(img || ''),
        descricao: sanitizeHtml(descricao),
        tecnologia_ids,
        adaptacao_ids,
        github_url: sanitizeHtml(github_url || ''),
        site_url: sanitizeHtml(site_url || '')
    };


    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/inserir_projeto`, {
            method: 'POST',
            headers,
            body: JSON.stringify(dadosValidados)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Erro Supabase RPC: ${response.status} - ${errorBody}`);
        }

        let result = null;
        try {
            result = await response.json();
        } catch {
            // Se a resposta for vazia ou não JSON, apenas retorna mensagem genérica
            result = { message: 'Projeto inserido com sucesso' };
        }

        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir projeto:', error);
        res.status(500).json({ erro: error.message });
    }
};

exports.listarProjetos = async (req, res) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/view_projetos_completos?select=*`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Erro Supabase GET: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erro ao listar projetos:', error);
        res.status(500).json({ erro: error.message });
    }
};
