// Prueba 2: si index.html cambió respecto a lo que está publicado, sw.js debe traer otra versión (CACHE).
// Sin esto el celular puede seguir mostrando la versión vieja.
import { readFileSync } from 'node:fs';

const SITIO = 'https://erickedrm.github.io/presupuesto_firebase/';
const raiz = new URL('..', import.meta.url);
const version = txt => (txt.match(/const\s+CACHE\s*=\s*['"]([^'"]+)['"]/) || [])[1];

const index = readFileSync(new URL('index.html', raiz), 'utf8');
const sw = readFileSync(new URL('sw.js', raiz), 'utf8');
const vNueva = version(sw);
if (!vNueva) { console.error('✗ No encontré "const CACHE = ..." en sw.js'); process.exit(1); }

let pubIndex, pubSw;
try {
  const baja = async f => { const r = await fetch(SITIO + f + '?t=' + Date.now()); if (!r.ok) throw new Error(f + ' ' + r.status); return r.text(); };
  [pubIndex, pubSw] = await Promise.all([baja('index.html'), baja('sw.js')]);
} catch (e) {
  console.log('⚠ No pude bajar la versión publicada (' + e.message + '). Me salto esta prueba.');
  process.exit(0);
}
const vPub = version(pubSw);
const cambio = pubIndex !== index;
console.log(`Publicada: ${vPub} · Nueva: ${vNueva} · index.html ${cambio ? 'cambió' : 'igual'}`);

if (cambio && vNueva === vPub) {
  console.error(`✗ index.html cambió pero sw.js sigue en "${vPub}". Sube la versión de CACHE en sw.js (ej. v13) y súbelo junto con index.html.`);
  process.exit(1);
}
console.log('✓ Versión correcta');
