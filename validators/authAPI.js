require('dotenv').config();

module.exports = (req, res, next) => {
    const clientSecret = req.headers['api-secret']; // você define esse nome
    const serverSecret = process.env.API_SECRET; // chave definida no .env

    if (!clientSecret || clientSecret !== serverSecret) {
        return res.status(403).json({ erro: 'Acesso negado. Chave inválida.' });
    }

    next(); // Permite continuar para o controller
};
