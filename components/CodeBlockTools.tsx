"use client";

import { useEffect } from "react";

// 给正文里的代码块加上语言名与复制按钮。构建期 HTML 已定型，
// 这里只做挂载后增强：无代码块的文章不受影响。
export default function CodeBlockTools() {
  useEffect(() => {
    const pres = Array.from(document.querySelectorAll<HTMLElement>(".post__body pre"));
    for (const pre of pres) {
      if (pre.parentElement?.classList.contains("codeblock")) continue;
      const wrapper = document.createElement("div");
      wrapper.className = "codeblock";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const bar = document.createElement("div");
      bar.className = "codeblock__bar";
      const lang = pre.getAttribute("data-language");
      if (lang) {
        const label = document.createElement("span");
        label.className = "codeblock__lang";
        label.textContent = lang;
        bar.appendChild(label);
      }
      const button = document.createElement("button");
      button.type = "button";
      button.className = "codeblock__copy";
      button.textContent = "Copy";
      // 不设 aria-label：可见文案即无障碍名，中文 label 会盖住它，状态切换就播报不出来。
      const status = document.createElement("span");
      status.className = "sr-only";
      status.setAttribute("role", "status");
      let resetTimer: number | undefined;
      button.addEventListener("click", async () => {
        window.clearTimeout(resetTimer);
        let ok = true;
        try {
          await navigator.clipboard.writeText(pre.innerText);
        } catch {
          ok = false;
        }
        button.textContent = ok ? "Copied" : "Copy";
        status.textContent = ok ? "Copied" : "Copy failed";
        resetTimer = window.setTimeout(() => {
          button.textContent = "Copy";
          status.textContent = "";
        }, 1500);
      });
      bar.appendChild(button);
      bar.appendChild(status);
      wrapper.appendChild(bar);
    }
  }, []);

  return null;
}
