import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    console.log('Navigating to Home...');
    await page.goto('http://localhost:5173');
    await new Promise(r => setTimeout(r, 2000));
    
    console.log('Clicking Case Study link...');
    await page.click('a[href="/case-study/spotify"]');
    
    await new Promise(r => setTimeout(r, 2000));
    console.log('Done.');
    await browser.close();
  } catch(e) {
    console.error('SCRIPT ERROR:', e);
  }
})();
