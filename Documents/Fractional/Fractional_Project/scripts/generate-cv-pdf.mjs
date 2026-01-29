import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    
    // Read the HTML file
    const htmlPath = join(process.cwd(), 'public', 'coen-horrevoets-cv.html');
    let htmlContent = readFileSync(htmlPath, 'utf-8');
    
    // Read logo and convert to base64 data URI
    const logoPath = join(process.cwd(), 'public', 'logo.png');
    const logoBuffer = readFileSync(logoPath);
    const logoBase64 = logoBuffer.toString('base64');
    const logoDataUri = `data:image/png;base64,${logoBase64}`;
    
    // Replace logo src with data URI
    htmlContent = htmlContent.replace(
      'src="/logo.png"',
      `src="${logoDataUri}"`
    );
    
    // Read SVG icons and convert to data URIs with red color
    const svgIcons = ['pr.svg', 'mail.svg', 'location.svg', 'phone.svg', 'www.svg'];
    for (const icon of svgIcons) {
      const iconPath = join(process.cwd(), 'public', icon);
      let svgContent = readFileSync(iconPath, 'utf-8');
      
      // Replace black (#000000, #000, black) with red (#ff0303)
      svgContent = svgContent.replace(/#000000/g, '#ff0303');
      svgContent = svgContent.replace(/#000(?![0-9a-fA-F])/g, '#ff0303');
      svgContent = svgContent.replace(/stroke="black"/gi, 'stroke="#ff0303"');
      svgContent = svgContent.replace(/fill="black"/gi, 'fill="#ff0303"');
      
      // Convert to base64 data URI
      const svgBase64 = Buffer.from(svgContent).toString('base64');
      const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`;
      
      // Replace in HTML
      htmlContent = htmlContent.replace(
        new RegExp(`src="/${icon}"`, 'g'),
        `src="${svgDataUri}"`
      );
    }
    
    // Debug: Check if replacement worked
    if (!htmlContent.includes('data:image/png;base64,')) {
      console.warn('⚠️  Warning: Logo replacement may have failed');
    } else {
      console.log('✅ Logo converted to data URI');
    }
    console.log('✅ SVG icons converted to data URIs with red color');
    
    // Set viewport to A4 size
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
    });

    // Read favicon and convert to base64 data URI
    const faviconPath = join(process.cwd(), 'public', 'Favicon_Coen.webp');
    const faviconBuffer = readFileSync(faviconPath);
    const faviconBase64 = faviconBuffer.toString('base64');
    const faviconDataUri = `data:image/webp;base64,${faviconBase64}`;
    
    // Inject favicon into HTML content
    if (!htmlContent.includes('link rel="icon"')) {
      htmlContent = htmlContent.replace(
        '<head>',
        `<head>\n  <link rel="icon" href="${faviconDataUri}" type="image/webp">\n  <link rel="apple-touch-icon" href="${faviconDataUri}">`
      );
    } else {
      // Replace existing favicon links with data URI
      htmlContent = htmlContent.replace(
        /href="[^"]*Favicon_Coen\.webp"/g,
        `href="${faviconDataUri}"`
      );
    }

    // Emulate print media for proper CSS application
    await page.emulateMediaType('print');

    // Set content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });
    
    // Set favicon on the page (for browsers that support it)
    await page.evaluate((faviconDataUri) => {
      // Remove existing favicon links
      document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach(link => link.remove());
      
      // Add favicon links
      const faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      faviconLink.href = faviconDataUri;
      faviconLink.type = 'image/webp';
      document.head.appendChild(faviconLink);
      
      const appleIconLink = document.createElement('link');
      appleIconLink.rel = 'apple-touch-icon';
      appleIconLink.href = faviconDataUri;
      document.head.appendChild(appleIconLink);
    }, faviconDataUri);

    // Wait for fonts to load
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Wait a bit more to ensure Playfair Display is loaded
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    // Wait for images to load
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            setTimeout(reject, 5000); // 5 second timeout
          });
        })
      );
    }).catch((err) => {
      console.warn('Warning: Some images may not have loaded:', err.message);
    });
    
    // Verify font is loaded
    const fontInfo = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return { found: false };
      const styles = window.getComputedStyle(h1);
      return {
        fontFamily: styles.fontFamily,
        fontWeight: styles.fontWeight,
        fontSize: styles.fontSize,
      };
    });
    console.log('H1 font info:', fontInfo);

    // Verify logo is present and positioned (after print media is applied)
    const logoInfo = await page.evaluate(() => {
      const logo = document.querySelector('.cv-logo');
      if (!logo) return { found: false };
      const rect = logo.getBoundingClientRect();
      const styles = window.getComputedStyle(logo);
      return {
        found: true,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        display: styles.display,
        position: styles.position,
        zIndex: styles.zIndex,
        topStyle: styles.top,
        leftStyle: styles.left,
      };
    });
    console.log('Logo info (print media):', logoInfo);

    // Generate date-based filename
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    const cvDir = join(process.cwd(), 'public', 'CV');
    
    // Ensure CV directory exists
    if (!existsSync(cvDir)) {
      mkdirSync(cvDir, { recursive: true });
    }
    
    // Generate PDF with date-based filename
    const pdfFilename = `Coen-Horrevoets-${dateStr}.pdf`;
    const pdfPath = join(cvDir, pdfFilename);
    const latestPath = join(cvDir, 'latest.pdf');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '0', // Top margin 0 so logo can be flush to edge
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm',
      },
      printBackground: true,
      preferCSSPageSize: false, // Use format size instead of CSS @page size
      displayHeaderFooter: false, // Don't add header/footer that might interfere
    });

    // Add custom thumbnail icon to PDF
    try {
      console.log('📸 Adding custom thumbnail icon to PDF...');
      const pdfBytes = readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      
      // Try to use logo.png first (better for thumbnails), fallback to favicon
      let thumbnailImage;
      const logoPath = join(process.cwd(), 'public', 'logo.png');
      const faviconPath = join(process.cwd(), 'public', 'Favicon_Coen.webp');
      
      if (existsSync(logoPath)) {
        try {
          const logoBytes = readFileSync(logoPath);
          thumbnailImage = await pdfDoc.embedPng(logoBytes);
          console.log('✅ Using logo.png as thumbnail');
        } catch (e) {
          console.warn('⚠️  Could not embed logo.png, trying favicon...');
        }
      }
      
      // If logo didn't work, try favicon (convert webp to png)
      if (!thumbnailImage && existsSync(faviconPath)) {
        try {
          // Convert webp to png using sharp
          const faviconBytes = readFileSync(faviconPath);
          const pngBuffer = await sharp(faviconBytes)
            .resize(256, 256, { fit: 'inside', withoutEnlargement: true })
            .png()
            .toBuffer();
          thumbnailImage = await pdfDoc.embedPng(pngBuffer);
          console.log('✅ Converted and embedded favicon as PNG thumbnail');
        } catch (e) {
          console.warn('⚠️  Could not convert/embed favicon as thumbnail:', e.message);
        }
      }
      
      // Set thumbnail if we successfully embedded an image
      if (thumbnailImage) {
        // Set PDF metadata
        pdfDoc.setTitle('Coen Horrevoets - CV');
        pdfDoc.setAuthor('Coen Horrevoets');
        pdfDoc.setSubject('Curriculum Vitae');
        pdfDoc.setCreator('Product Clarity');
        
        // Try to set thumbnail in PDF catalog
        // Note: pdf-lib doesn't have direct thumbnail support, but we can try
        // to set it using the internal context API
        try {
          const rootRef = pdfDoc.context.trailerInfo.Root;
          const catalog = pdfDoc.context.lookup(rootRef);
          
          if (catalog && thumbnailImage) {
            // Create an XObject for the thumbnail image
            // The thumbnail needs to be referenced properly in the PDF structure
            const imageRef = thumbnailImage.ref;
            
            // Set thumbnail in catalog (this is the PDF spec way)
            catalog.set(pdfDoc.context.obj('Thumb'), imageRef);
            console.log('✅ Thumbnail reference set in PDF catalog');
          }
        } catch (e) {
          // If direct catalog manipulation fails, the image is still embedded
          // Some PDF viewers may pick it up from metadata or embedded images
          console.warn('⚠️  Could not set thumbnail in catalog (image still embedded):', e.message);
          console.warn('   The PDF will still work, but thumbnail may not appear in all viewers');
        }
        
        // Save the modified PDF
        const modifiedPdfBytes = await pdfDoc.save();
        writeFileSync(pdfPath, modifiedPdfBytes);
        console.log('✅ PDF with thumbnail saved');
      } else {
        console.warn('⚠️  No thumbnail image available to embed');
      }
    } catch (error) {
      console.warn('⚠️  Error adding thumbnail to PDF:', error.message);
      console.warn('   PDF generated successfully, but thumbnail could not be added');
    }

    // Create/update latest.pdf as a copy for easy access
    copyFileSync(pdfPath, latestPath);
    
    // Write JSON file with latest CV info for API route
    const cvInfoPath = join(cvDir, 'latest-cv-info.json');
    const cvInfo = {
      filename: pdfFilename,
      url: `/CV/${pdfFilename}`,
      generatedAt: now.toISOString(),
      date: dateStr
    };
    writeFileSync(cvInfoPath, JSON.stringify(cvInfo, null, 2));
    
    console.log(`✅ PDF generated successfully at: ${pdfPath}`);
    console.log(`✅ Latest PDF copied to: ${latestPath}`);
    console.log(`✅ CV info written to: ${cvInfoPath}`);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePDF();
