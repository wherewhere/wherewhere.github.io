---
title: 这是一个不存在的页面
comments: false
sitemap: false
permalink: /404.html
---
对不起，您所访问的页面不存在或者已删除。

<span id="timeout"></span>

您可以[**点这里**](/)直接返回首页。

<script>
  var countTime = 5;

  function count() {
    if (--countTime > 0) {
      document.getElementById('timeout').textContent = "预计将在约 " + countTime + " 秒后返回首页。";
    }
    else if (countTime === 0) {
      document.getElementById('timeout').textContent = "即将跳转到首页。";
      location.href = '/';
    }
    else if (countTime < 0) {
      document.getElementById('timeout').remove();
      return;
    }
    setTimeout(() => { count(); }, 1000);
  }

  count();
</script>
