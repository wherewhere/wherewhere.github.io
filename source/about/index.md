---
title: 关于
---
<script src="https://cdn.jsdelivr.net/npm/marked" data-pjax></script>

<script data-pjax>
  (() => {
    if (customElements.get("about-content")) { return; }
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
    class AboutContent extends HTMLElement {
      constructor() {
        super();
        this.isLoading = false;
        this.message = document.createElement("span");
        this.readme = document.createElement("div");
      }
      connectedCallback() {
        const message = this.message;
        const readme = this.readme;
        readme.textContent = "如果这里什么也没有，请";
        let link = document.createElement("a");
        link.onclick = () => this.loadReadme();
        link.textContent = "刷新";
        readme.appendChild(link);
        readme.append("页面，或者前往这个");
        link = document.createElement("a");
        link.href = "https://wherewhere.github.io/wherewhere";
        link.textContent = "页面";
        readme.appendChild(link);
        readme.append("查看");
        this.appendChild(this.message);
        this.appendChild(this.readme);
        this.loadReadme();
      }
      async loadReadme() {
        if (this.isLoading) {
          return;
        }
        const message = this.message;
        try {
          this.isLoading = true;
          message.textContent = "正在从 GitHub 拉取信息，请坐和放宽";
          const response = await fetch("https://api.github.com/repos/wherewhere/wherewhere/readme");
          if (response.ok) {
            message.textContent = "拉取成功，正在解析";
            const json = await response.json();
            const content = json.content;
            if (typeof (content) == "string" && content.length > 0) {
              message.textContent = "解析成功";
              this.readme.innerHTML = marked.parse(decodeBase64(content));
              message.remove();
              return;
            }
          }
        }
        catch (_) {
        }
        finally {
          this.isLoading = false;
        }
        message.textContent = "拉取失败，即将跳转到 GitHub 页面";
        location.href = "https://wherewhere.github.io/wherewhere"
      }
    }
    customElements.define("about-content", AboutContent);
  })();
</script>

<about-content class="about-content"></about-content>

<style>
  .about-content img {
    margin-bottom: unset !important;
    display: unset;
  }
</style>