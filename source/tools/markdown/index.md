---
title: Markdown 预览
sitemap: false
---
<div class="split-view">
  <div id="container"></div>
  <div class="perview-card markdown-body monaco-component">
    <div id="perview"></div>
  </div>
</div>

<script type="module" data-pjax>
  import { provideFluentDesignSystem, baseLayerLuminance, StandardLuminance } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  provideFluentDesignSystem().register();
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
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof scheme !== "undefined") {
      scheme.addListener(e => {
        monaco.editor.setTheme(e.matches ? "vs-dark" : "vs");
        baseLayerLuminance.withDefault(e.matches ? StandardLuminance.DarkMode : StandardLuminance.LightMode)
      });
      if (scheme.matches) {
        monaco.editor.setTheme("vs-dark");
        baseLayerLuminance.withDefault(StandardLuminance.DarkMode);
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
    width: 100%;
    height: 100%;
    display: flex;
    gap: 0.3rem;
  }

  div.split-view #container {
    display: block;
    width: 50%;
    min-height: 400px;
    box-sizing: border-box;
    background: var(--vscode-editor-background);
    border-radius: calc(var(--layer-corner-radius)* 1px);
    box-shadow: var(--elevation-shadow-card-rest);
  }

  div.split-view #container .monaco-editor,
  div.split-view #container .monaco-editor .overflow-guard {
    border-radius: inherit;
  }

  div.split-view .perview-card {
    flex: 1;
    padding: 16px;
    display: block;
    height: auto;
    width: var(--card-width, 100%);
    box-sizing: border-box;
    background: var(--vscode-editor-background);
    border: calc(var(--stroke-width)* 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--layer-corner-radius)* 1px);
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