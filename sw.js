// Mi Presupuesto (Firebase) - service worker: guarda la app en el celular para que abra rápido y Chrome la pueda instalar.
// La app siempre intenta bajar la versión más nueva; si no hay internet usa la guardada. Las librerías de Firebase
// (versión fija) se guardan una vez. Los datos (Firestore) y la IA (Gemini) no pasan por aquí.
const CACHE = 'presupuesto-fb-v5';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.origin === 'https://www.gstatic.com' && u.pathname.startsWith('/firebasejs/')) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(r2 => {
      const c = r2.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); return r2; })));
    return;
  }
  if (u.origin !== location.origin) return;
  // "no-cache": siempre pregunta a GitHub si hay versión nueva (sin esto el navegador puede dar la vieja hasta 10 min)
  e.respondWith(fetch(e.request, { cache: 'no-cache' })
    .then(r => { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./'))));
});
