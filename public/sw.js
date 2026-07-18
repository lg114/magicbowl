// MagicBowl service worker — 轻量离线缓存
// 策略：
//  - 导航请求（页面 HTML）：网络优先，失败回退缓存首页，保证离线可打开站点
//  - 静态资源（_next/static、图标等）：stale-while-revalidate，命中缓存即用并在后台更新
//  - 非 GET / 跨域请求：直接走网络，不做处理
// 版本：部署新版时改下方 APP_VERSION 即可让旧缓存整体失效（activate 期自动清理旧 cache）
const APP_VERSION = "1.0.0";
const CACHE = `magicbowl-${APP_VERSION}`;
const PRECACHE = ["/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        // 逐条容错：单条失败（如首页临时不可达）不拖垮整个安装，其余照常预缓存
        Promise.all(
          PRECACHE.map((url) =>
            cache.add(url).catch((e) => console.warn("[sw] precache skip:", url, e))
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // 页面导航：网络优先，离线回退首页
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match("/").then((r) => r || Response.error())
      )
    );
    return;
  }

  // 静态资源：stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
