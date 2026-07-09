// 高德地图 JS API 2.0 动态加载器（含安全密钥）
// 文档：https://lbs.amap.com/api/javascript-api-v2/guide/abc/load
// 注意：安全密钥必须在高德脚本加载「之前」注入 window._AMapSecurityConfig

let promise: Promise<any> | null = null;

export function loadAMap(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("AMap 仅能在浏览器环境中加载"));
  }

  const key = process.env.NEXT_PUBLIC_AMAP_KEY;
  const security = process.env.NEXT_PUBLIC_AMAP_SECURITY;

  if (!key) {
    return Promise.reject(
      new Error("未配置 NEXT_PUBLIC_AMAP_KEY，请在 .env.local 中填写高德 Web 端 Key")
    );
  }

  // 安全密钥必须在脚本加载前设置（高德 2.0 强制）
  (window as any)._AMapSecurityConfig = { securityJsCode: security || "" };

  const existing = (window as any).AMap;
  if (existing) return Promise.resolve(existing);
  if (promise) return promise;

  promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(
      key
    )}&plugin=AMap.Scale,AMap.ToolBar`;
    script.async = true;
    script.onload = () => {
      if ((window as any).AMap) resolve((window as any).AMap);
      else reject(new Error("高德脚本已加载，但 AMap 全局未就绪"));
    };
    script.onerror = () =>
      reject(
        new Error("高德地图脚本加载失败（检查网络或 Key 的域名白名单）")
      );
    document.head.appendChild(script);
  });

  return promise;
}
