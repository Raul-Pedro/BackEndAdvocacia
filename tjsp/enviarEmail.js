const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'matheusfss2938@gmail.com',
        pass: 'xuen aaxc ktic yhaq'
    }
});

async function enviarEmail(destinatario, numero, atualizacoes) {
    const corpo = `
        <h2>Atualizações do Processo ${numero}</h2>
        <ul>
            ${atualizacoes.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <p>Este é um serviço automático. Não responda a este e-mail.</p>
    `;

    const mailOptions = {
        from: 'matheusfss2938@gmail.com',
        to: destinatario,
        subject: `Atualizações do Processo ${numero}`,
        html: corpo
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { enviarEmail };
