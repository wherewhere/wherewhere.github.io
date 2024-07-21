---
title: JSON 与 YAML 转换
sitemap: false
---
<div class="split-view">
  <div id="json"></div>
  <div id="yaml"></div>
</div>

<script type="module" data-pjax>
  import * as monaco from "https://cdn.jsdelivr.net/npm/monaco-editor/+esm";
  if (typeof matchMedia === "function") {
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof scheme !== "undefined") {
      scheme.addListener(e => monaco.editor.setTheme(e.matches ? "vs-dark" : "vs"));
      if (scheme.matches) {
        monaco.editor.setTheme("vs-dark");
      }
    }
  }
  function createEditor(id, language, value) {
    return monaco.editor.create(document.getElementById(id), {
      value: value,
      language: language,
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
      smoothScrolling: true,
      tabSize: 2
    });
  };
  const json = createEditor("json", "javascript", "// JSON");
  const yaml = createEditor("yaml", "yaml", "# YAML");
  import * as JSONBig from "https://cdn.jsdelivr.net/npm/json-bigint/+esm";
  import * as jsYaml from "https://cdn.jsdelivr.net/npm/js-yaml/+esm";
  let isJsonChanged = false;
  json.onDidChangeModelContent(_ => {
    if (isYamlChanged) {
      isYamlChanged = false;
      return;
    }
    let object;
    try {
      const value = json.getValue();
      object = JSONBig.parse(value);
    }
    catch (ex) {
      console.error(ex);
      object = ex;
    }
    const result = jsYaml.dump(object);
    isJsonChanged = true;
    yaml.setValue(result ?? "# YAML");
  });
  let isYamlChanged = false;
  yaml.onDidChangeModelContent(_ => {
    if (isJsonChanged) {
      isJsonChanged = false;
      return;
    }
    let object;
    try {
      const value = yaml.getValue();
      object = jsYaml.load(value);
    }
    catch (ex) {
      console.error(ex);
      object = ex;
    }
    const result = JSONBig.stringify(object, null, 2);
    isYamlChanged = true;
    json.setValue(result ?? "// JSON");
  });
</script>

<style>
  @import 'https://cdn.jsdelivr.net/npm/github-markdown-css';

  div.split-view {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 0.3rem;
  }

  div.split-view * {
    --base-height-multiplier: 8;
    --control-corner-radius: 4;
    --elevation-shadow-card-rest: 0 0 2px rgba(0, 0, 0, 0.12), 0 calc(4 * 0.5px) calc((4 * 1px)) rgba(0, 0, 0, 0.14);
  }

  div.split-view #json,
  div.split-view #yaml {
    display: block;
    width: 50%;
    min-height: calc(var(--base-height-multiplier) * 50px);
    box-sizing: border-box;
    background: var(--vscode-editor-background);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
  }

  div.split-view #json .monaco-editor,
  div.split-view #json .monaco-editor .overflow-guard,
  div.split-view #yaml .monaco-editor,
  div.split-view #yaml .monaco-editor .overflow-guard {
    border-radius: inherit;
  }

  @media (max-width: 767px) {
    div.split-view {
      flex-direction: column;
    }

    div.split-view #json,
    div.split-view #yaml {
      width: 100%;
      height: 50%;
    }
  }
</style>