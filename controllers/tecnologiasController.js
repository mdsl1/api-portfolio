const fetch = require('node-fetch');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

const headers = {
    'apikey': SUPABASE_API_KEY,
    'Authorization': `Bearer ${SUPABASE_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

exports.listarTecnologias = async (req, res) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/tecnologias?select=*`, {
            method: 'GET',
            headers
        });
        if(!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Erro Supabase GET: ${response.status} - ${errorBody}`);
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Erro ao listar tecnologias:', error);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
};
