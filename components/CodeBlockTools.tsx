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
      button.setAttribute("aria-label", "复制代码");
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          button.textContent = "Copied";
          setTimeout(() => {
            button.textContent = "Copy";
          }, 1500);
        } catch {
          button.textContent = "Copy";
        }
      });
      bar.appendChild(button);
      wrapper.appendChild(bar);
    }
  }, []);

  return null;
}
