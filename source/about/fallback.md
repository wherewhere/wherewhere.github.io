---
title: 关于
description: 铺路尚未成功，同志仍需努力！
sitemap: false
---
<span id="about-content"><span id="about-message"></span>如果这里什么也没有，请<a id="about-refresh"
    href="./fallback.html">刷新</a>页面，或者前往这个[页面](https://wherewhere.github.io/wherewhere)查看</span>

<script src="https://cdn.jsdelivr.net/npm/js-base64@2" data-pjax></script>
<script src="https://cdn.jsdelivr.net/gh/douglascrockford/JSON-js@master/json2.js" data-pjax></script>
<script src="https://cdn.jsdelivr.net/gh/xiapeng01/xiapeng01.GitHub.io@4975fc1/marked.js" data-pjax></script>

<script data-pjax>
  (function () {
    var isLoading = false;
    var readme = document.getElementById("about-content");
    var message = document.getElementById("about-message");
    function loadReadmeAsync() {
      if (isLoading) {
        return;
      }
      isLoading = true;
      message.innerHTML = "正在从 GitHub 拉取信息，请坐和放宽<br>";
      var request = typeof XDomainRequest === "undefined" ? new XMLHttpRequest() : new XDomainRequest();
      function onError() {
        message.innerHTML = "拉取失败，即将跳转到 GitHub 页面<br>";
        location.href = "https://wherewhere.github.io/wherewhere";
        isLoading = false;
      }
      try {
        request.open("GET", "https://api.github.com/repos/wherewhere/wherewhere/readme", true);
      }
      catch (e) {
        onError();
        return;
      }
      request.onload = function (e) {
        try {
          message.innerHTML = "拉取成功，正在解析<br>";
          var data = JSON.parse(request.responseText);
          var content = data.content;
          if (typeof content == "string" && content.length > 0) {
            message.innerHTML = "解析成功，正在渲染<br>";
            readme.innerHTML = marked.parse(Base64.decode(content));
          }
        }
        catch (e) {
          onError();
          return;
        }
        finally {
          isLoading = false;
        }
      };
      request.onerror = onError;
      request.ontimeout = onError;
      request.send();
    }
    loadReadmeAsync();
    var refresh = document.getElementById("about-refresh");
    if (typeof refresh === "object") {
      refresh.href = "javascript:void(0)";
      refresh.onclick = loadReadmeAsync;
    }
  })();
</script>

<style>
  #about-content img {
    margin-bottom: unset !important;
    display: unset;
  }
</style>