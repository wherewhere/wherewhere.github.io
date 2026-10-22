---
title: JSON 与 YAML 转换
description: 使用 <a appearance="hypertext" href="https://github.com/sidorares/json-bigint"
  target="_blank">json-bigint</a> 和 <a appearance="hypertext"
  href="https://github.com/nodeca/js-yaml/" target="_blank">js-yaml</a> 转化 JSON 与 YAML 数据
sitemap: false
---
<script type="importmap" data-pjax>
  {
    "imports": {
      "@babel/runtime/helpers/extends": "https://cdn.jsdelivr.net/npm/@babel/runtime/helpers/esm/extends.js",
      "@codemirror/autocomplete": "https://cdn.jsdelivr.net/npm/@codemirror/autocomplete/dist/index.js",
      "@codemirror/commands": "https://cdn.jsdelivr.net/npm/@codemirror/commands/dist/index.js",
      "@codemirror/lang-json": "https://cdn.jsdelivr.net/npm/@codemirror/lang-json/dist/index.js",
      "@codemirror/lang-yaml": "https://cdn.jsdelivr.net/npm/@codemirror/lang-yaml/dist/index.js",
      "@codemirror/language": "https://cdn.jsdelivr.net/npm/@codemirror/language/dist/index.js",
      "@codemirror/legacy-modes/mode/vb": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/vb.js",
      "@codemirror/lint": "https://cdn.jsdelivr.net/npm/@codemirror/lint/dist/index.js",
      "@codemirror/search": "https://cdn.jsdelivr.net/npm/@codemirror/search/dist/index.js",
      "@codemirror/state": "https://cdn.jsdelivr.net/npm/@codemirror/state/+esm",
      "@codemirror/streamparser": "https://cdn.jsdelivr.net/npm/@codemirror/streamparser/+esm",
      "@codemirror/view": "https://cdn.jsdelivr.net/npm/@codemirror/view/dist/index.js",
      "@fluentui/web-components": "https://cdn.jsdelivr.net/npm/@fluentui/web-components@v2/+esm",
      "@lezer/common": "https://cdn.jsdelivr.net/npm/@lezer/common/+esm",
      "@lezer/highlight": "https://cdn.jsdelivr.net/npm/@lezer/highlight/dist/index.js",
      "@lezer/json": "https://cdn.jsdelivr.net/npm/@lezer/json/dist/index.js",
      "@lezer/lr": "https://cdn.jsdelivr.net/npm/@lezer/lr/dist/index.js",
      "@lezer/yaml": "https://cdn.jsdelivr.net/npm/@lezer/yaml/dist/index.js",
      "@uiw/codemirror-themes": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-themes/esm/index.js",
      "@uiw/codemirror-theme-vscode/dark": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-theme-vscode/esm/dark.js",
      "@uiw/codemirror-theme-vscode/light": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-theme-vscode/esm/light.js",
      "codemirror": "https://cdn.jsdelivr.net/npm/codemirror/dist/index.js",
      "crelt": "https://cdn.jsdelivr.net/npm/crelt/+esm",
      "js-yaml": "https://cdn.jsdelivr.net/npm/js-yaml/+esm",
      "json-bigint": "https://cdn.jsdelivr.net/npm/json-bigint/+esm",
      "style-mod": "https://cdn.jsdelivr.net/npm/style-mod/+esm",
      "w3c-keyname": "https://cdn.jsdelivr.net/npm/w3c-keyname/+esm"
    }
  }
</script>

<div class="split-view">
  <div id="json"></div>
  <div id="yaml"></div>
</div>

<script type="module" data-pjax>
  import { basicSetup, EditorView } from "codemirror";
  import { Compartment } from "@codemirror/state";
  import { json } from "@codemirror/lang-json";
  import { yaml } from "@codemirror/lang-yaml";
  import { vscodeDarkInit } from "@uiw/codemirror-theme-vscode/dark";
  import { vscodeLightInit } from "@uiw/codemirror-theme-vscode/light";
  const fontFamily = "Cascadia Code NF, Cascadia Code PL, Cascadia Code, Cascadia Next SC, Cascadia Next TC, Cascadia Next JP, Consolas, Courier New, Liberation Mono, SFMono-Regular, Menlo, Monaco, monospace";
  const vscodeDark = vscodeDarkInit({
    settings: {
      background: "#1E1E1E",
      foreground: "#CCCCCC",
      caret: "#AEAFAD",
      selection: "#264F78",
      selectionMatch: "#ADD6FF26",
      gutterForeground: "#6E7681",
      gutterActiveForeground: "#CCCCCC",
      gutterBorder: "#404040",
      fontFamily
    }
  });
  const vscodeLight = vscodeLightInit({
    settings: {
      foreground: "#3B3B3B",
      selectionMatch: "#ADD6FF80",
      gutterForeground: "#6E7681",
      gutterActiveForeground: "#171184",
      gutterBorder: "#D3D3D3",
      fontFamily
    }
  });
  function createEditor(id, value, onchange) {
    const themeSet = new Compartment();
    const theme = themeSet.of(vscodeLight);
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    const editor = new EditorView({
      doc: value,
      parent: document.getElementById(id),
      extensions: [
        basicSetup,
        theme,
        id === "json" ? json() : yaml(),
        EditorView.updateListener.of(e => {
          if (e.docChanged) {
            onchange();
          }
        })
      ]
    });
    if (typeof scheme !== "undefined") {
      scheme.addEventListener("change", e => editor.dispatch({ effects: themeSet.reconfigure(e.matches ? vscodeDark : vscodeLight) }));
      if (scheme.matches) {
        editor.dispatch({ effects: themeSet.reconfigure(vscodeDark) });
      }
    }
    return editor;
  }
  const jsonEditer = createEditor("json", "// JSON", onJsonChanged);
  const yamlEditer = createEditor("yaml", "# YAML", onYamlChanged);
  import * as JSONBig from "json-bigint";
  import * as jsYaml from "js-yaml";
  let isJsonChanged = false;
  function onJsonChanged() {
    if (isYamlChanged) {
      isYamlChanged = false;
      return;
    }
    let object;
    try {
      const value = jsonEditer.state.doc.toString();
      object = JSONBig.parse(value);
    }
    catch (ex) {
      console.error(ex);
      object = ex;
    }
    const result = jsYaml.dump(object);
    isJsonChanged = true;
    yamlEditer.dispatch({ changes: { from: 0, to: yamlEditer.state.doc.length, insert: result ?? "# YAML" } });
  }
  let isYamlChanged = false;
  function onYamlChanged() {
    if (isJsonChanged) {
      isJsonChanged = false;
      return;
    }
    let object;
    try {
      const value = yamlEditer.state.doc.toString();
      object = jsYaml.load(value);
    }
    catch (ex) {
      console.error(ex);
      object = ex;
    }
    const result = JSONBig.stringify(object, null, 2);
    isYamlChanged = true;
    jsonEditer.dispatch({ changes: { from: 0, to: jsonEditer.state.doc.length, insert: result ?? "// JSON" } });
  };
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/github-markdown-css";

  div.split-view {
    --base-height-multiplier: 8;
    --control-corner-radius: 4;
    --vscode-editor-background: #ffffff;
    --elevation-shadow-card-rest: 0 0 2px rgba(0, 0, 0, 0.12), 0 calc(4 * 0.5px) calc((4 * 1px)) rgba(0, 0, 0, 0.14);
    width: 100%;
    height: 100%;
    display: flex;
    gap: 0.3rem;
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    div.split-view {
      --vscode-editor-background: #1e1e1e;
      color-scheme: dark;
    }
  }

  div.split-view #json,
  div.split-view #yaml {
    display: flex;
    width: 50%;
    min-height: calc(var(--base-height-multiplier) * 50px);
    max-height: 100vh;
    box-sizing: border-box;
    background: var(--vscode-editor-background);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
    overflow: auto;
  }

  div.split-view .cm-editor {
    flex: 1;
    outline: none;
    overflow: inherit;
  }

  div.split-view .cm-editor .cm-line::selection,
  div.split-view .cm-editor .cm-line ::selection,
  div.split-view .cm-editor .cm-content::selection,
  div.split-view .cm-editor .cm-content ::selection {
    color: HighlightText;
  }

  div.split-view .cm-editor .cm-diagnostic,
  div.split-view .cm-editor .cm-tooltip-autocomplete>ul {
    font-family: "Cascadia Code NF", "Cascadia Code PL", "Cascadia Code", "Cascadia Next SC", "Cascadia Next TC", "Cascadia Next JP", Consolas, "Courier New", "Liberation Mono", SFMono-Regular, Menlo, Monaco, monospace;
  }

  div.split-view .cm-editor .cm-gutters {
    border-right-width: 1px;
    border-right-style: solid;
  }

  div.split-view .cm-editor .cm-searchMatch {
    background-color: rgba(234, 92, 0, 0.33);
  }

  div.split-view .cm-editor .cm-searchMatch-selected {
    background-color: rgba(234, 92, 0, 0.22);
  }

  @media (prefers-color-scheme: dark) {
    div.split-view .cm-editor .cm-searchMatch-selected {
      background-color: #9E6A03;
    }
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