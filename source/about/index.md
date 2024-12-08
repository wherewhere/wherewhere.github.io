---
title: 关于
description: 铺路尚未成功，同志仍需努力！
---
<span id="about-content"><span id="about-message"></span>如果这里什么也没有，请<a id="about-refresh"
    href="./">刷新</a>页面，或者前往这个[页面](https://wherewhere.github.io/wherewhere)查看</span>

<script id="marked-script" src="https://cdn.jsdelivr.net/npm/marked" data-pjax></script>
<script data-pjax>
  (() => {
    function importMarkedAsync() {
      return new Promise(resolve => {
        if (typeof marked === "undefined") {
          function replaceScript(id, src) {
            if (typeof Element.prototype.replaceWith !== "function") {
              Element.prototype.replaceWith = function (node) {
                if (this.parentNode) {
                  this.parentNode.replaceChild(node, this);
                }
              };
            }
            const script = document.createElement("script");
            script.id = id;
            script.src = src;
            document.getElementById(id).replaceWith(script);
            return script;
          }
          replaceScript("marked-script", "https://cdn.jsdelivr.net/gh/markedjs/marked/lib/marked.js").onload = () => resolve(marked);
        }
        else {
          resolve(marked);
        }
      });
    }
    function decodeBase64Async(base64) {
      return new Promise(resolve => {
        if (typeof TextDecoder === "undefined") {
          if (typeof Base64 === "undefined") {
            function addScript(src) {
              const script = document.createElement("script");
              script.src = src;
              document.scripts[0].parentNode.appendChild(script);
              return script;
            }
            addScript("https://cdn.jsdelivr.net/npm/js-base64").onload = () => resolve(Base64.decode(base64));
          }
          else {
            resolve(Base64.decode(base64));
          }
        }
        else {
          const text = atob(base64);
          const length = text.length;
          const bytes = new Uint8Array(length);
          for (let i = 0; i < length; i++) {
            bytes[i] = text.charCodeAt(i);
          }
          const decoder = new TextDecoder();
          resolve(decoder.decode(bytes));
        }
      });
    }
    let isLoading = false;
    const readme = document.getElementById("about-content");
    const message = document.getElementById("about-message");
    async function loadReadmeAsync() {
      if (isLoading) {
        return;
      }
      try {
        isLoading = true;
        message.innerHTML = "正在从 GitHub 拉取信息，请坐和放宽<br>";
        const response = await fetch("https://api.github.com/repos/wherewhere/wherewhere/readme");
        if (response.ok) {
          message.innerHTML = "拉取成功，正在解析<br>";
          const json = await response.json();
          const content = json.content;
          if (typeof content == "string" && content.length > 0) {
            message.innerHTML = "解析成功，正在渲染<br>";
            const marked = await importMarkedAsync();
            readme.innerHTML = marked.parse(await decodeBase64Async(content));
            return;
          }
        }
      }
      catch (_) {
      }
      finally {
        isLoading = false;
      }
      message.innerText = "拉取失败，即将跳转到 GitHub 页面";
      location.href = "https://wherewhere.github.io/wherewhere"
    }
    const refresh = document.getElementById("about-refresh");
    if (refresh instanceof HTMLAnchorElement) {
      refresh.href = "javascript:void(0)";
      refresh.addEventListener("click", loadReadmeAsync);
    }
    loadReadmeAsync();
  })();
</script>

<style>
  #about-content img {
    margin-bottom: unset !important;
    display: unset;
  }
</style>