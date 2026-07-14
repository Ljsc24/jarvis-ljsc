const CACHE = 'jarvis-v1.0.0';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request).then(r=>{const cl=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));return r;}).catch(()=>caches.match(e.request))); });
self.addEventListener('message', e => { if(e.data==='SKIP_WAITING') self.skipWaiting(); });
