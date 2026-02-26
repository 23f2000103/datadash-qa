const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=66',
   'https://sanand0.github.io/tdsdata/js_table/?seed=67',
   'https://sanand0.github.io/tdsdata/js_table/?seed=68',
   'https://sanand0.github.io/tdsdata/js_table/?seed=69',
   'https://sanand0.github.io/tdsdata/js_table/?seed=70',
   'https://sanand0.github.io/tdsdata/js_table/?seed=71',
   'https://sanand0.github.io/tdsdata/js_table/?seed=72',
   'https://sanand0.github.io/tdsdata/js_table/?seed=73',
   'https://sanand0.github.io/tdsdata/js_table/?seed=74',
   'https://sanand0.github.io/tdsdata/js_table/?seed=75',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    try {
      console.log(`Visiting: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Debug: print page title and raw table content
      const title = await page.title();
      console.log(`  Page title: ${title}`);

      const tableCount = await page.$$eval('table', t => t.length);
      console.log(`  Tables found: ${tableCount}`);

      const allCellText = await page.$$eval('table td, table th', cells =>
        cells.map(c => c.innerText.trim())
      );
      console.log(`  All cell text: ${JSON.stringify(allCellText.slice(0, 20))}`);

      const numbers = allCellText
        .filter(t => /^-?\d+(\.\d+)?$/.test(t))
        .map(Number);

      const pageSum = numbers.reduce((a, b) => a + b, 0);
      console.log(`  Numbers found: ${numbers.length}, Page sum: ${pageSum}`);
      grandTotal += pageSum;

    } catch (err) {
      console.log(`  ERROR on ${url}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`GRAND TOTAL: ${grandTotal}`);
})();
