---
title: 这是一个不存在的页面
comments: false
sitemap: false
permalink: /404.html
---
对不起，您所访问的页面不存在或者已删除。

<script data-pjax>
  if (!customElements.get("not-found-counter")) {
    class NotFoundCounter extends HTMLElement {
      constructor() {
        super();
        this.countTime = 5;
        const timeout = document.createElement("span");
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(timeout);
        this.count(timeout);
      }
      count(timeout) {
        if (--this.countTime > 0) {
          timeout.innerText = "预计将在约 " + this.countTime + " 秒后返回首页。";
        }
        else if (this.countTime === 0) {
          timeout.innerText = "即将跳转到首页。";
          location.href = '/';
        }
        else if (this.countTime < 0) {
          timeout.remove();
          return;
        }
        setTimeout(() => this.count(timeout), 1000);
      }
    }
    customElements.define("not-found-counter", NotFoundCounter);
  }
</script>

<not-found-counter></not-found-counter>

您可以[**点这里**](/)直接返回首页。