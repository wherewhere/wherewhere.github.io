---
title: API 文档
---
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js" crossorigin></script>

<script>
  let swaggerDiv;
  let isLoading = false;
  function loadSwaggerUI() {
    if (isLoading) {
      return;
    }
    const definitionURL = "https://wherewhere.github.io/api/openapi.json";
    window.ui = SwaggerUIBundle({
      url: definitionURL,
      "dom_id": "#swagger-ui",
      deepLinking: true,
      queryConfigEnabled: true
    });
    let elements = document.getElementsByClassName("main-inner");
    Array.prototype.forEach.call(elements, element => element.style.background = "white");
    elements = document.getElementsByClassName("post-title");
    Array.prototype.forEach.call(elements, element => element.style.color = "#555");
  }
  class LoadSwaggerUI extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      swaggerDiv = document.createElement("div");
      swaggerDiv.id = "swagger-ui";
      swaggerDiv.innerHTML = "如果这里什么也没有，请<a href=\"javascript:loadSwaggerUI();\">刷新</a>页面";
      this.append(swaggerDiv);
      loadSwaggerUI();
    }
  }
  if (!customElements.get("load-swagger-ui")) {
    customElements.define("load-swagger-ui", LoadSwaggerUI);
  }
</script>

<load-swagger-ui></load-swagger-ui>

<style>
  a.link {
    border-bottom: unset;
  }
  pre.version {
    background: unset;
  }
  @media (min-width: 1200px) {
    hgroup.main {
      width: auto;
    }
  }
  @media (prefers-color-scheme: dark) {
    input[type="text"] {
      color: black;
    }
    td:not(.col_header) {
      background: white;
    }
  }
</style>
