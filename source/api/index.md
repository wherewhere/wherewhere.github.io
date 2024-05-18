---
title: API 文档
---
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
<script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js" crossorigin></script>
<script>
  function loadSwaggerUI() {
    const definitionURL = "https://wherewhere.github.io/api/openapi.json";
    window.ui = SwaggerUIBundle({
      url: definitionURL,
      "dom_id": "#swagger-ui",
      deepLinking: true,
      queryConfigEnabled: true
    });
    var elements = document.getElementsByClassName("main-inner");
    Array.prototype.forEach.call(elements, element => element.style.background = "white");
    elements = document.getElementsByClassName("post-title");
    Array.prototype.forEach.call(elements, element => element.style.color = "#555");
  }
</script>
<div id="swagger-ui">如果这里什么也没有，请<a href="javascript:loadSwaggerUI();">刷新</a>页面</div>
<script>loadSwaggerUI();</script>
<style>
  pre.version {
    background: unset;
  }
  @media (prefers-color-scheme: dark) {
    td:not(.col_header) {
      background: white;
    }
  }
</style>
