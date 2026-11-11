// Prueba 1: abre la app en un Chrome sin pantalla (tamaño celular) y revisa que:
//  - no truene ningún JavaScript,
//  - todos los archivos de la app se encuentren (sin 404),
//  - aparezca la pantalla de carga y luego la invitación a entrar con Google.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.md': 'text/plain' };

// servidor local mínimo con los archivos del repo
const srv = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = normalize(join(RAIZ, p));
  try {
    if (!f.startsWith(normalize(RAIZ))) throw 0;
    const d = await readFile(f);
    res.writeHead(200, { 'Content-Type': TIPOS[extname(f)] || 'application/octet-stream' }).end(d);
  } catch { res.writeHead(404).end('no existe'); }
});
await new Promise(r => srv.listen(0, '127.0.0.1', r));
const url = `http://localhost:${srv.address().port}/`;

const errores = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
page.on('pageerror', e => errores.push('JavaScript: ' + e.message));
page.on('console', m => {
  // los avisos del botón de Google por correr en localhost no cuentan
  if (m.type() === 'error' && !/GSI_LOGGER|accounts\.google\.com|origin is not allowed/i.test(m.text())) errores.push('Consola: ' + m.text());
});
page.on('response', r => { if (r.url().startsWith(url) && r.status() >= 400) errores.push(`Falta archivo (${r.status()}): ${r.url().slice(url.length)}`); });

let ok = true;
const paso = (bien, txt) => { console.log((bien ? '✓ ' : '✗ ') + txt); if (!bien) ok = false; };

try {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  paso(await page.locator('#loader').isVisible(), 'Se ve la pantalla de carga');
  await page.waitForFunction(() => /Entra con tu cuenta/.test(document.querySelector('#welcomeMsg')?.textContent || ''), null, { timeout: 30000 });
  paso(true, 'Llega a "Entra con tu cuenta de Google"');
  paso(await page.locator('#loader').isHidden(), 'La pantalla de carga se quita');
  await page.waitForTimeout(1500);   // deja que termine de cargar el botón de Google
} catch (e) {
  paso(false, 'No llegó a la pantalla de entrar: ' + e.message.split('\n')[0]);
  console.log('  Mensaje en pantalla: ' + await page.locator('#welcomeMsg').textContent().catch(() => '(nada)'));
}
// los archivos que sw.js guarda en el celular deben existir todos
const sw = await readFile(join(RAIZ, 'sw.js'), 'utf8');
const shell = JSON.parse((sw.match(/const\s+SHELL\s*=\s*(\[[^\]]*\])/) || [, '[]'])[1].replace(/'/g, '"'));
for (const f of shell) {
  const r = await page.request.get(url + f.replace(/^\.\//, ''));
  if (!r.ok()) errores.push(`Falta archivo (${r.status()}): ${f}`);
}
paso(shell.length > 0, `sw.js lista ${shell.length} archivos`);
paso(errores.length === 0, 'Sin errores' + (errores.length ? ':\n   ' + errores.join('\n   ') : ''));

await browser.close();
srv.close();
process.exit(ok ? 0 : 1);
