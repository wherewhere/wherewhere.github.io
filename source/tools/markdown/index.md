---
title: Markdown 预览
description: 使用 <fluent-anchor appearance="hypertext" href="https://github.com/markedjs/marked"
  target="_blank">Marked.JS</fluent-anchor> 解析并预览 Markdown 文本
sitemap: false
---
<div class="split-view">
  <div id="container"></div>
  <div class="perview-card markdown-body monaco-component">
    <div id="perview"></div>
  </div>
</div>

<script type="module" data-pjax>
  import { Marked } from "https://cdn.jsdelivr.net/npm/marked/+esm";
  import { markedHighlight } from "https://cdn.jsdelivr.net/npm/marked-highlight/+esm";
  import { HighlightJS as hljs } from "https://cdn.jsdelivr.net/npm/highlight.js/+esm";
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      }
    })
  );
  import * as monaco from "https://cdn.jsdelivr.net/npm/monaco-editor/+esm";
  if (typeof matchMedia === "function") {
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    if (typeof scheme !== "undefined") {
      scheme.addEventListener("change", e => monaco.editor.setTheme(e.matches ? "vs-dark" : "vs"));
      if (scheme.matches) {
        monaco.editor.setTheme("vs-dark");
      }
    }
  }
  const editor = monaco.editor.create(document.getElementById("container"), {
    value: "# Markdown Editor",
    language: "markdown",
    automaticLayout: true,
    fontFamily: "'Cascadia Code NF', 'Cascadia Code PL', 'Cascadia Code', Consolas, 'Courier New', monospace",
    fontLigatures: "ligatures",
    minimap: {
      enabled: false
    },
    padding: {
      bottom: 4,
      top: 4
    },
    smoothScrolling: true
  });
  const perview = document.getElementById("perview");
  editor.onDidChangeModelContent(_ => perviewMarkdown());
  perviewMarkdown();
  function perviewMarkdown() {
    const value = editor.getValue();
    try {
      perview.innerHTML = marked.parse(value);
    }
    catch (ex) {
      console.error(ex);
      perview.innerText = value;
    }
  }
</script>

<style>
  @import 'https://cdn.jsdelivr.net/npm/github-markdown-css';

  div.split-view {
    --base-height-multiplier: 8;
    --design-unit: 4;
    --control-corner-radius: 4;
    --elevation-shadow-card-rest: 0 0 2px rgba(0, 0, 0, 0.12), 0 calc(4 * 0.5px) calc((4 * 1px)) rgba(0, 0, 0, 0.14);
    width: 100%;
    height: 100%;
    display: flex;
    gap: 0.3rem;
  }

  div.split-view #container {
    display: block;
    width: 50%;
    min-height: calc(var(--base-height-multiplier) * 50px);
    box-sizing: border-box;
    background: var(--vscode-editor-background);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
  }

  div.split-view #container .monaco-editor,
  div.split-view #container .monaco-editor .overflow-guard {
    border-radius: inherit;
  }

  div.split-view .perview-card {
    flex: 1;
    padding: calc(var(--design-unit) * 4px);
    display: block;
    height: auto;
    width: var(--card-width, 100%);
    box-sizing: border-box;
    background: var(--vscode-editor-background);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
  }

  @media (max-width: 767px) {
    div.split-view {
      flex-direction: column;
    }

    div.split-view #container {
      width: 100%;
      height: 50%;
    }
  }
</style>