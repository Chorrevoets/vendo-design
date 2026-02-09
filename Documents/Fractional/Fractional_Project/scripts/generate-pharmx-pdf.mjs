import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePharmXPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const svgIcons = ['pr.svg', 'mail.svg', 'location.svg', 'phone.svg', 'www.svg'];

    const logoPath = join(process.cwd(), 'public', 'logo.png');
    const logoBuffer = readFileSync(logoPath);
    const logoDataUri = `data:image/png;base64,${logoBuffer.toString('base64')}`;

    const faviconPath = join(process.cwd(), 'public', 'Favicon_Coen.webp');
    const faviconDataUri = `data:image/webp;base64,${readFileSync(faviconPath).toString('base64')}`;

    let pharmxHtmlContent = readFileSync(join(process.cwd(), 'public', 'coen-horrevoets-cv-pharmx.html'), 'utf-8');
    pharmxHtmlContent = pharmxHtmlContent.replace('src="/logo.png"', `src="${logoDataUri}"`);
    for (const icon of svgIcons) {
      let svgContent = readFileSync(join(process.cwd(), 'public', icon), 'utf-8');
      svgContent = svgContent.replace(/#000000/g, '#ff0303').replace(/#000(?![0-9a-fA-F])/g, '#ff0303');
      svgContent = svgContent.replace(/stroke="black"/gi, 'stroke="#ff0303"').replace(/fill="black"/gi, 'fill="#ff0303"');
      const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
      pharmxHtmlContent = pharmxHtmlContent.replace(new RegExp(`src="/${icon}"`, 'g'), `src="${svgDataUri}"`);
    }
    pharmxHtmlContent = pharmxHtmlContent.replace(/href="[^"]*Favicon_Coen\.webp"/g, `href="${faviconDataUri}"`);

    await page.setViewport({ width: 794, height: 1123 });
    await page.emulateMediaType('print');
    await page.setContent(pharmxHtmlContent, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 500));
    });

    const cvDir = join(process.cwd(), 'public', 'CV');
    const pharmxPath = join(cvDir, 'Coen-Horrevoets-PharmX.pdf');
    await page.pdf({
      path: pharmxPath,
      format: 'A4',
      margin: { top: '0', right: '1.5cm', bottom: '1.5cm', left: '1.5cm' },
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    try {
      const pdfDoc = await PDFDocument.load(readFileSync(pharmxPath));
      if (existsSync(logoPath)) {
        const thumbImg = await pdfDoc.embedPng(readFileSync(logoPath));
        pdfDoc.setTitle('Coen Horrevoets - CV (PharmX)');
        pdfDoc.setAuthor('Coen Horrevoets');
        pdfDoc.setSubject('Curriculum Vitae - PharmX Role Optimised');
        pdfDoc.setCreator('Product Clarity');
        try {
          const catalog = pdfDoc.context.lookup(pdfDoc.context.trailerInfo.Root);
          if (catalog && thumbImg) catalog.set(pdfDoc.context.obj('Thumb'), thumbImg.ref);
        } catch (e) {}
        writeFileSync(pharmxPath, await pdfDoc.save());
      }
    } catch (e) {
      console.warn('⚠️  Thumbnail could not be added:', e.message);
    }

    console.log(`✅ PharmX PDF generated at: ${pharmxPath}`);
  } finally {
    await browser.close();
  }
}

generatePharmXPDF();
