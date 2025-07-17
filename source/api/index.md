---
title: API 文档
description: 基于 <a href="https://github.com/swagger-api/swagger-ui" target="_blank">swagger-ui</a> 的 OpenAPI 文档展示
---
<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js" data-pjax></script>

<script data-pjax>
  if (!customElements.get("load-swagger-ui")) {
    class LoadSwaggerUI extends HTMLElement {
      constructor() {
        super();
        this.isLoading = false;
      }
      get dom_id() {
        return this.getAttribute("dom_id") || "swagger-ui";
      }
      connectedCallback() {
        const swaggerDiv = document.createElement("div");
        swaggerDiv.id = this.dom_id;
        swaggerDiv.innerText = "如果这里什么也没有，请";
        const link = document.createElement('a');
        link.href = "javascript:void(0)";
        link.click = () => this.loadSwaggerUI();
        link.innerText = "刷新";
        swaggerDiv.appendChild(link);
        swaggerDiv.append("页面");
        this.append(swaggerDiv);
        this.loadSwaggerUI();
      }
      loadSwaggerUI() {
        if (this.isLoading) {
          return;
        }
        try {
          this.isLoading = true;
          const definitionURL = "https://wherewhere.github.io/api/openapi.json";
          window.ui = SwaggerUIBundle({
            url: definitionURL,
            dom_id: `#${this.dom_id}`,
            deepLinking: true,
            queryConfigEnabled: true
          });
          const inner = document.querySelector(".main-inner");
          if (inner instanceof HTMLElement) {
            inner.style.background = "white";
            inner.style.colorScheme = "light";
          }
          const title = document.querySelector(".post-title");
          if (title instanceof HTMLElement) {
            title.style.color = "#555";
          }
        }
        catch (error) {
          console.error(error);
        }
        finally {
          this.isLoading = false;
        }
      }
    }
    customElements.define("load-swagger-ui", LoadSwaggerUI);
  }
</script>

<load-swagger-ui class="load-swagger-ui"></load-swagger-ui>

<style>
  @import 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css';

  .post-description a {
    color: #555;
  }

  .load-swagger-ui a.link {
    border-bottom: 0;
  }

  .load-swagger-ui pre.version {
    background: none;
  }

  .load-swagger-ui .highlight-code code, 
  .load-swagger-ui .highlight-code pre{
    color: #dcdcdc;
  }

  @media (min-width: 1200px) {
    .load-swagger-ui hgroup.main {
      width: auto;
    }
  }

  @media (prefers-color-scheme: dark) {
    .load-swagger-ui td:not(.col_header) {
      background: white;
    }
  }
</style>