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

exports.inserirMensagem = async (req, res) => {

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }

    const {
        nome,
        email,
        assunto,
        mensagem
    } = req.body;

    const dadosValidados = {
        nome: sanitizeHtml(nome),
        email: sanitizeHtml(email),
        assunto: sanitizeHtml(assunto),
        mensagem: sanitizeHtml(mensagem)
    };[]

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/inserir_msg_form`, {
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
            result = { message: 'Mensagem enviada com sucesso' };
        }

        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir projeto:', error);
        res.status(500).json({ erro: error.message });
    }
};

exports.listarMensagens = async (req, res) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/msgs_contato`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Erro ao buscar mensagens: ${response.status} - ${errorBody}`);
        }

        const mensagens = await response.json();
        res.status(200).json(mensagens);
    } catch (error) {
        console.error('Erro ao listar mensagens:', error);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
}