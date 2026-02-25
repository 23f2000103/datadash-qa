const { chromium } = require('playwright');

const urls = [
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/66',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/67',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/68',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/69',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/70',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/71',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/72',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/73',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/74',
  'https://exam.sanand.workers.dev/tds2025/ga4/seed/75',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });

    const numbers = await page.$$eval('table td, table th', cells =>
      cells
        .map(c => c.innerText.trim())
        .filter(t => /^-?\d+(\.\d+)?$/.test(t))
        .map(Number)
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`${url} → ${numbers.length} numbers, sum = ${pageSum}`);
    grandTotal += pageSum;
  }

  await browser.close();
  console.log(`\nGRAND TOTAL: ${grandTotal}`);
})();
