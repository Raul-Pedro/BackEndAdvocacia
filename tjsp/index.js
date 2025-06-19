const express = require('express');
const bodyParser = require('body-parser');
const { buscarProcesso } = require('./scraper');
const { enviarEmail } = require('./emailService');

const app = express();
app.use(bodyParser.json());

app.post('/buscar-processo', async (req, res) => {
    const { numeroProcesso, email, quantidade } = req.body;

    if (!numeroProcesso || !email || !quantidade) {
        return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
    }

    try {
        const atualizacoes = await buscarProcesso(numeroProcesso, quantidade);
        await enviarEmail(email, numeroProcesso, atualizacoes);
        res.json({ mensagem: 'E-mail enviado com sucesso!', atualizacoes });
    } catch (erro) {
        console.error('Erro:', erro);
        res.status(500).json({ erro: 'Erro ao buscar processo ou enviar e-mail.' });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
