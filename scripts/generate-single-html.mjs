import fs from 'fs';
import path from 'path';

export function bundleSingleHtml() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const publicDir = path.resolve(process.cwd(), 'public');
  const htmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(htmlPath)) {
    console.warn('dist/index.html not found, skipping standalone bundle generation.');
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf8');
  const assetsDir = path.join(distDir, 'assets');

  if (!fs.existsSync(assetsDir)) {
    console.warn('dist/assets not found, skipping standalone bundle generation.');
    return;
  }

  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find(f => f.endsWith('.js'));
  const cssFile = files.find(f => f.endsWith('.css'));

  if (cssFile) {
    const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
    html = html.replace(/<link rel="stylesheet"[^>]+href="[^"]+\.css"[^>]*>/i, `<style>\n${cssContent}\n</style>`);
  }

  if (jsFile) {
    const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
    const safeJs = jsContent.replace(/<\/script>/gi, '<\\/script>');
    html = html.replace(/<script type="module"[^>]+src="[^"]+\.js"[^>]*><\/script>/i, `<script type="module">\n${safeJs}\n</script>`);
  }

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'evaluacion-inventarios-offline.html');
  fs.writeFileSync(outputPath, html, 'utf8');

  // Also write to dist so the production build and Vercel serve it directly
  const distOutputPath = path.join(distDir, 'evaluacion-inventarios-offline.html');
  fs.writeFileSync(distOutputPath, html, 'utf8');

  console.log(`[SingleFileBundle] Successfully generated standalone HTML at: ${outputPath} and ${distOutputPath} (${(html.length / 1024).toFixed(1)} KB)`);
}

bundleSingleHtml();
