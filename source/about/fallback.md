---
title: 关于
description: 铺路尚未成功，同志仍需努力！
sitemap: false
---
<script src="https://cdn.jsdelivr.net/npm/js-base64" data-pjax></script>
<script src="https://cdn.jsdelivr.net/gh/markedjs/marked/lib/marked.js" data-pjax></script>

<div id="about-content"></div>

<script data-pjax>
  (() => {
    let isLoading = false;
    async function loadReadmeAsync(message, readme) {
      if (isLoading) {
        return;
      }
      try {
        isLoading = true;
        message.textContent = "正在从 GitHub 拉取信息，请坐和放宽";
        const response = await fetch("https://api.github.com/repos/wherewhere/wherewhere/readme");
        if (response.ok) {
          message.textContent = "拉取成功，正在解析";
          const json = await response.json();
          const content = json.content;
          if (typeof (content) == "string" && content.length > 0) {
            message.textContent = "解析成功";
            readme.innerHTML = marked.parse(Base64.decode(content));
            message.remove();
            return;
          }
        }
      }
      catch (_) {
      }
      finally {
        isLoading = false;
      }
      message.textContent = "拉取失败，即将跳转到 GitHub 页面";
      location.href = "https://wherewhere.github.io/wherewhere"
    }
    const about = document.getElementById("about-content");
    const message = document.createElement("span");
    const readme = document.createElement("div");
    readme.textContent = "如果这里什么也没有，请";
    let link = document.createElement("a");
    link.href = "javascript:void(0)";
    link.addEventListener("click", () => loadReadmeAsync());
    link.textContent = "刷新";
    readme.appendChild(link);
    readme.append("页面，或者前往这个");
    link = document.createElement("a");
    link.href = "https://wherewhere.github.io/wherewhere";
    link.textContent = "页面";
    readme.appendChild(link);
    readme.append("查看");
    about.appendChild(message);
    about.appendChild(readme);
    loadReadmeAsync(message, readme);
  })();
</script>

<style>
  #about-content img {
    margin-bottom: unset !important;
    display: unset;
  }
</style>