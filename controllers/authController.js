// Módulos usados nessa rota da API
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
require('dotenv').config();

// Variáveis de ambiente para Supabase puxadas do arquivo .env
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

// Informações do cabeçalho da requisição
const headers = {
    'apikey': SUPABASE_API_KEY,
    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
    'Content-Type': 'application/json'
};

// Cria a função que será exportada para o index.js
exports.login = async (req, res) => {
    const { login, senha } = req.body;

    try {
        // Busca o usuário por login usando filtro do Supabase REST
        const response = await fetch(`${SUPABASE_URL}/rest/v1/usuario?login=eq.${login}`, {
            method: 'GET',
            headers
        });

        const data = await response.json();

        if (!response.ok || data.length === 0) {
            return res.status(401).json({ erro: 'Usuário não encontrado' });
        }

        const usuario = data[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        // Autenticação válida
        res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            usuario: {
                id: usuario.id,
                login: usuario.login
            }
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};
