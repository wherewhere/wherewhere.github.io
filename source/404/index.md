---
title: 404 找不到页面
description: 这是一个不存在的页面
comments: false
sitemap: false
permalink: /404.html
---
对不起，您所访问的页面不存在或者已删除。  
<span id="not-found-counter">页面将自动跳转到首页。</span>  
您可以[**点这里**](/)直接返回首页。
<script data-pjax>
  (() => {
    const counter = document.getElementById("not-found-counter");
    counter.innerText = "预计将在约 ";
    const timeout = document.createElement("span");
    let countTime = 6;
    timeout.innerText = countTime;
    counter.appendChild(timeout);
    counter.append(" 秒后返回首页。");
    function count() {
      if (--countTime > 0) {
        timeout.innerText = countTime;
      }
      else if (countTime === 0) {
        counter.innerText = "即将跳转到首页。";
        if (typeof pjax === "undefined") {
          location.href = '/';
        }
        else {
          pjax.loadUrl('/');
        }
      }
      else if (countTime < 0) {
        counter.innerText = "自动跳转失败。";
        return;
      }
      setTimeout(count, 1000);
    }
    count();
  })();
</script>