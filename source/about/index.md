---
title: 关于
---
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<script>
  var message, readme;
  var isLoading = false;
  function decodeBase64(base64) {
    const text = atob(base64);
    const length = text.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = text.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  }
  async function loadReadme(message, readme) {
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
        if (typeof(content) == "string" && content.length > 0) {
          message.textContent = "解析成功";
          readme.innerHTML = marked.parse(decodeBase64(content));
          message.remove();
          return;
        }
      }
    }
    catch {
    }
    finally {
      isLoading = false;
    }
    message.textContent = "拉取失败，即将跳转到 GitHub 页面";
    location.href = "https://wherewhere.github.io/wherewhere"
  }
  class AboutContent extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      message = document.createElement("span");
      readme = document.createElement("div");
      readme.innerHTML = "如果这里什么也没有，请<a href=\"javascript:loadReadme(message, readme);\">刷新</a>页面，或者前往这个<a href=\"https://wherewhere.github.io/wherewhere\"><b>页面</b></a>查看";
      this.append(message);
      this.append(readme);
      loadReadme(message, readme);
    }
  }
  if (!customElements.get("about-content")) {
    customElements.define("about-content", AboutContent);
  }
</script>

<about-content></about-content>
