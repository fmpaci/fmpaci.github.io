const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Load your local development server URL
  await page.goto('http://localhost:4000', {
    waitUntil: 'networkidle0'
  });

  // Generate PDF
  await page.pdf({
    path: path.join(__dirname, '../files/resume.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });

  await browser.close();
  console.log('PDF generated successfully!');
}

generatePDF().catch(console.error); 