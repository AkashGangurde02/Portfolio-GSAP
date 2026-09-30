const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const htmlFile = path.resolve(__dirname, 'og-preview-builder/og-landscape.html');
  const outFile  = path.resolve(__dirname, 'public/og/og-default.png');

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set exact OG image viewport
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');
  console.log('Loading:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.waitForFunction(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: outFile,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
    type: 'png'
  });

  await browser.close();

  const stat = fs.statSync(outFile);
  console.log(`✅ OG image saved: ${outFile}`);
  console.log(`   Size: ${(stat.size / 1024).toFixed(1)} KB`);
})();
