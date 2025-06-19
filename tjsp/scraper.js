const puppeteer = require('puppeteer');

async function buscarProcesso(numero, limite = 5) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://esaj.tjsp.jus.br/cpopg/open.do', { waitUntil: 'domcontentloaded' });

        await page.click('#cbPesquisaNacional');
        await page.click('#radioNumeroAntigo');
        await page.type('#nuProcessoAntigoFormatado', numero);
        await page.click("input[value='Consultar']");

        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        // Esperar pela tabela de movimentações
        await page.waitForSelector('.tabelaMovimentacao');

        const movimentacoes = await page.$$eval('.tabelaMovimentacao tr', (rows) => {
            return rows.slice(0, 15).map(row => {
                const cols = row.querySelectorAll('td');
                return cols.length >= 2 ? `${cols[0].innerText.trim()} - ${cols[1].innerText.trim()}` : null;
            }).filter(Boolean);
        });

        await browser.close();
        return movimentacoes.slice(0, limite);
    } catch (error) {
        await browser.close();
        throw error;
    }
}

module.exports = { buscarProcesso };
