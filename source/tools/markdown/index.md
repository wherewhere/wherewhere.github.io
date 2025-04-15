---
title: Markdown 预览
description: 使用 <fluent-anchor appearance="hypertext" href="https://github.com/markedjs/marked"
  target="_blank">Marked.JS</fluent-anchor> 解析并预览 Markdown 文本
sitemap: false
---
<script type="importmap" data-pjax>
  {
    "imports": {
      "@babel/runtime/helpers/extends": "https://cdn.jsdelivr.net/npm/@babel/runtime/helpers/esm/extends.js",
      "@codemirror/autocomplete": "https://cdn.jsdelivr.net/npm/@codemirror/autocomplete/dist/index.js",
      "@codemirror/commands": "https://cdn.jsdelivr.net/npm/@codemirror/commands/dist/index.js",
      "@codemirror/lang-angular": "https://cdn.jsdelivr.net/npm/@codemirror/lang-angular/dist/index.js",
      "@codemirror/lang-cpp": "https://cdn.jsdelivr.net/npm/@codemirror/lang-cpp/dist/index.js",
      "@codemirror/lang-css": "https://cdn.jsdelivr.net/npm/@codemirror/lang-css/dist/index.js",
      "@codemirror/lang-go": "https://cdn.jsdelivr.net/npm/@codemirror/lang-go/dist/index.js",
      "@codemirror/lang-html": "https://cdn.jsdelivr.net/npm/@codemirror/lang-html/dist/index.js",
      "@codemirror/lang-java": "https://cdn.jsdelivr.net/npm/@codemirror/lang-java/dist/index.js",
      "@codemirror/lang-javascript": "https://cdn.jsdelivr.net/npm/@codemirror/lang-javascript/dist/index.js",
      "@codemirror/lang-json": "https://cdn.jsdelivr.net/npm/@codemirror/lang-json/dist/index.js",
      "@codemirror/lang-less": "https://cdn.jsdelivr.net/npm/@codemirror/lang-less/dist/index.js",
      "@codemirror/lang-liquid": "https://cdn.jsdelivr.net/npm/@codemirror/lang-liquid/dist/index.js",
      "@codemirror/lang-markdown": "https://cdn.jsdelivr.net/npm/@codemirror/lang-markdown/dist/index.js",
      "@codemirror/lang-php": "https://cdn.jsdelivr.net/npm/@codemirror/lang-php/dist/index.js",
      "@codemirror/lang-python": "https://cdn.jsdelivr.net/npm/@codemirror/lang-python/dist/index.js",
      "@codemirror/lang-rust": "https://cdn.jsdelivr.net/npm/@codemirror/lang-rust/dist/index.js",
      "@codemirror/lang-sass": "https://cdn.jsdelivr.net/npm/@codemirror/lang-sass/dist/index.js",
      "@codemirror/lang-sql": "https://cdn.jsdelivr.net/npm/@codemirror/lang-sql/dist/index.js",
      "@codemirror/lang-vue": "https://cdn.jsdelivr.net/npm/@codemirror/lang-vue/dist/index.js",
      "@codemirror/lang-wast": "https://cdn.jsdelivr.net/npm/@codemirror/lang-wast/dist/index.js",
      "@codemirror/lang-xml": "https://cdn.jsdelivr.net/npm/@codemirror/lang-xml/dist/index.js",
      "@codemirror/lang-yaml": "https://cdn.jsdelivr.net/npm/@codemirror/lang-yaml/dist/index.js",
      "@codemirror/language": "https://cdn.jsdelivr.net/npm/@codemirror/language/dist/index.js",
      "@codemirror/language-data": "https://cdn.jsdelivr.net/npm/@codemirror/language-data/dist/index.js",
      "@codemirror/legacy-modes/mode/apl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/apl.js",
      "@codemirror/legacy-modes/mode/asciiarmor": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/asciiarmor.js",
      "@codemirror/legacy-modes/mode/asn1": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/asn1.js",
      "@codemirror/legacy-modes/mode/asterisk": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/asterisk.js",
      "@codemirror/legacy-modes/mode/brainfuck": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/brainfuck.js",
      "@codemirror/legacy-modes/mode/clike": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/clike.js",
      "@codemirror/legacy-modes/mode/clojure": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/clojure.js",
      "@codemirror/legacy-modes/mode/cmake": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/cmake.js",
      "@codemirror/legacy-modes/mode/cobol": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/cobol.js",
      "@codemirror/legacy-modes/mode/coffeescript": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/coffeescript.js",
      "@codemirror/legacy-modes/mode/commonlisp": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/commonlisp.js",
      "@codemirror/legacy-modes/mode/crystal": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/crystal.js",
      "@codemirror/legacy-modes/mode/css": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/css.js",
      "@codemirror/legacy-modes/mode/cypher": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/cypher.js",
      "@codemirror/legacy-modes/mode/d": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/d.js",
      "@codemirror/legacy-modes/mode/diff": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/diff.js",
      "@codemirror/legacy-modes/mode/dockerfile": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/dockerfile.js",
      "@codemirror/legacy-modes/mode/dtd": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/dtd.js",
      "@codemirror/legacy-modes/mode/dylan": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/dylan.js",
      "@codemirror/legacy-modes/mode/ebnf": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/ebnf.js",
      "@codemirror/legacy-modes/mode/ecl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/ecl.js",
      "@codemirror/legacy-modes/mode/eiffel": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/eiffel.js",
      "@codemirror/legacy-modes/mode/elm": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/elm.js",
      "@codemirror/legacy-modes/mode/erlang": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/erlang.js",
      "@codemirror/legacy-modes/mode/factor": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/factor.js",
      "@codemirror/legacy-modes/mode/fcl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/fcl.js",
      "@codemirror/legacy-modes/mode/forth": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/forth.js",
      "@codemirror/legacy-modes/mode/fortran": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/fortran.js",
      "@codemirror/legacy-modes/mode/gas": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/gas.js",
      "@codemirror/legacy-modes/mode/gherkin": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/gherkin.js",
      "@codemirror/legacy-modes/mode/groovy": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/groovy.js",
      "@codemirror/legacy-modes/mode/haskell": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/haskell.js",
      "@codemirror/legacy-modes/mode/haxe": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/haxe.js",
      "@codemirror/legacy-modes/mode/http": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/http.js",
      "@codemirror/legacy-modes/mode/idl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/idl.js",
      "@codemirror/legacy-modes/mode/javascript": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/javascript.js",
      "@codemirror/legacy-modes/mode/jinja2": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/jinja2.js",
      "@codemirror/legacy-modes/mode/julia": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/julia.js",
      "@codemirror/legacy-modes/mode/livescript": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/livescript.js",
      "@codemirror/legacy-modes/mode/lua": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/lua.js",
      "@codemirror/legacy-modes/mode/mathematica": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/mathematica.js",
      "@codemirror/legacy-modes/mode/mbox": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/mbox.js",
      "@codemirror/legacy-modes/mode/mirc": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/mirc.js",
      "@codemirror/legacy-modes/mode/mllike": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/mllike.js",
      "@codemirror/legacy-modes/mode/modelica": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/modelica.js",
      "@codemirror/legacy-modes/mode/mscgen": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/mscgen.js",
      "@codemirror/legacy-modes/mode/mumps": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/mumps.js",
      "@codemirror/legacy-modes/mode/nginx": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/nginx.js",
      "@codemirror/legacy-modes/mode/nsis": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/nsis.js",
      "@codemirror/legacy-modes/mode/ntriples": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/ntriples.js",
      "@codemirror/legacy-modes/mode/octave": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/octave.js",
      "@codemirror/legacy-modes/mode/oz": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/oz.js",
      "@codemirror/legacy-modes/mode/pascal": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/pascal.js",
      "@codemirror/legacy-modes/mode/perl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/perl.js",
      "@codemirror/legacy-modes/mode/pig": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/pig.js",
      "@codemirror/legacy-modes/mode/powershell": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/powershell.js",
      "@codemirror/legacy-modes/mode/properties": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/properties.js",
      "@codemirror/legacy-modes/mode/protobuf": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/protobuf.js",
      "@codemirror/legacy-modes/mode/pug": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/pug.js",
      "@codemirror/legacy-modes/mode/puppet": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/puppet.js",
      "@codemirror/legacy-modes/mode/python": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/python.js",
      "@codemirror/legacy-modes/mode/q": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/q.js",
      "@codemirror/legacy-modes/mode/r": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/r.js",
      "@codemirror/legacy-modes/mode/rpm": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/rpm.js",
      "@codemirror/legacy-modes/mode/ruby": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/ruby.js",
      "@codemirror/legacy-modes/mode/sas": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/sas.js",
      "@codemirror/legacy-modes/mode/scheme": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/scheme.js",
      "@codemirror/legacy-modes/mode/shell": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/shell.js",
      "@codemirror/legacy-modes/mode/sieve": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/sieve.js",
      "@codemirror/legacy-modes/mode/smalltalk": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/smalltalk.js",
      "@codemirror/legacy-modes/mode/solr": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/solr.js",
      "@codemirror/legacy-modes/mode/sparql": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/sparql.js",
      "@codemirror/legacy-modes/mode/spreadsheet": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/spreadsheet.js",
      "@codemirror/legacy-modes/mode/sql": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/sql.js",
      "@codemirror/legacy-modes/mode/stex": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/stex.js",
      "@codemirror/legacy-modes/mode/stylus": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/stylus.js",
      "@codemirror/legacy-modes/mode/swift": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/swift.js",
      "@codemirror/legacy-modes/mode/tcl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/tcl.js",
      "@codemirror/legacy-modes/mode/textile": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/textile.js",
      "@codemirror/legacy-modes/mode/tiddlywiki": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/tiddlywiki.js",
      "@codemirror/legacy-modes/mode/tiki": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/tiki.js",
      "@codemirror/legacy-modes/mode/toml": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/toml.js",
      "@codemirror/legacy-modes/mode/troff": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/troff.js",
      "@codemirror/legacy-modes/mode/ttcn": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/ttcn.js",
      "@codemirror/legacy-modes/mode/ttcn-cfg": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/ttcn-cfg.js",
      "@codemirror/legacy-modes/mode/turtle": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/turtle.js",
      "@codemirror/legacy-modes/mode/vb": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/vb.js",
      "@codemirror/legacy-modes/mode/vbscript": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/vbscript.js",
      "@codemirror/legacy-modes/mode/velocity": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/velocity.js",
      "@codemirror/legacy-modes/mode/verilog": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/verilog.js",
      "@codemirror/legacy-modes/mode/vhdl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/vhdl.js",
      "@codemirror/legacy-modes/mode/webidl": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/webidl.js",
      "@codemirror/legacy-modes/mode/xquery": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/xquery.js",
      "@codemirror/legacy-modes/mode/yacas": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/yacas.js",
      "@codemirror/legacy-modes/mode/z80": "https://cdn.jsdelivr.net/npm/@codemirror/legacy-modes/mode/z80.js",
      "@codemirror/lint": "https://cdn.jsdelivr.net/npm/@codemirror/lint/dist/index.js",
      "@codemirror/search": "https://cdn.jsdelivr.net/npm/@codemirror/search/dist/index.js",
      "@codemirror/state": "https://cdn.jsdelivr.net/npm/@codemirror/state/+esm",
      "@codemirror/view": "https://cdn.jsdelivr.net/npm/@codemirror/view/dist/index.js",
      "@fluentui/web-components": "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm",
      "@lezer/common": "https://cdn.jsdelivr.net/npm/@lezer/common/+esm",
      "@lezer/cpp": "https://cdn.jsdelivr.net/npm/@lezer/cpp/dist/index.js",
      "@lezer/css": "https://cdn.jsdelivr.net/npm/@lezer/css/dist/index.js",
      "@lezer/go": "https://cdn.jsdelivr.net/npm/@lezer/go/dist/index.js",
      "@lezer/highlight": "https://cdn.jsdelivr.net/npm/@lezer/highlight/dist/index.js",
      "@lezer/html": "https://cdn.jsdelivr.net/npm/@lezer/html/dist/index.js",
      "@lezer/java": "https://cdn.jsdelivr.net/npm/@lezer/java/dist/index.js",
      "@lezer/javascript": "https://cdn.jsdelivr.net/npm/@lezer/javascript/dist/index.js",
      "@lezer/json": "https://cdn.jsdelivr.net/npm/@lezer/json/dist/index.js",
      "@lezer/lr": "https://cdn.jsdelivr.net/npm/@lezer/lr/dist/index.js",
      "@lezer/markdown": "https://cdn.jsdelivr.net/npm/@lezer/markdown/dist/index.js",
      "@lezer/php": "https://cdn.jsdelivr.net/npm/@lezer/php/dist/index.es.js",
      "@lezer/python": "https://cdn.jsdelivr.net/npm/@lezer/python/dist/index.js",
      "@lezer/rust": "https://cdn.jsdelivr.net/npm/@lezer/rust/dist/index.js",
      "@lezer/sass": "https://cdn.jsdelivr.net/npm/@lezer/sass/dist/index.js",
      "@lezer/xml": "https://cdn.jsdelivr.net/npm/@lezer/xml/dist/index.js",
      "@lezer/yaml": "https://cdn.jsdelivr.net/npm/@lezer/yaml/dist/index.js",
      "@uiw/codemirror-theme-vscode/dark": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-theme-vscode/esm/dark.js",
      "@uiw/codemirror-theme-vscode/light": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-theme-vscode/esm/light.js",
      "@uiw/codemirror-themes": "https://cdn.jsdelivr.net/npm/@uiw/codemirror-themes/esm/index.js",
      "codemirror": "https://cdn.jsdelivr.net/npm/codemirror/dist/index.js",
      "crelt": "https://cdn.jsdelivr.net/npm/crelt/+esm",
      "highlight.js": "https://cdn.jsdelivr.net/npm/highlight.js/+esm",
      "marked": "https://cdn.jsdelivr.net/npm/marked/+esm",
      "marked-highlight": "https://cdn.jsdelivr.net/npm/marked-highlight/+esm",
      "style-mod": "https://cdn.jsdelivr.net/npm/style-mod/+esm",
      "w3c-keyname": "https://cdn.jsdelivr.net/npm/w3c-keyname/+esm"
    }
  }
</script>

<div class="split-view">
  <div id="container"></div>
  <div class="perview-card markdown-body monaco-component">
    <div id="perview"></div>
  </div>
</div>

<script type="module" data-pjax>
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import { HighlightJS as hljs } from "highlight.js";
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      }
    })
  );
  import { basicSetup, EditorView } from "codemirror";
  import { Compartment } from "@codemirror/state";
  import { markdown } from "@codemirror/lang-markdown";
  import { languages } from "@codemirror/language-data";
  import { vscodeDark } from "@uiw/codemirror-theme-vscode/dark";
  import { vscodeLight } from "@uiw/codemirror-theme-vscode/light";
  const themeSet = new Compartment();
  const theme = themeSet.of(vscodeLight);
  const scheme = matchMedia("(prefers-color-scheme: dark)");
  const editor = new EditorView({
    doc: "# Markdown Editor",
    parent: document.getElementById("container"),
    extensions: [
      basicSetup,
      theme,
      markdown({ codeLanguages: languages }),
      EditorView.updateListener.of(e => {
        if (e.docChanged) {
          perviewMarkdown();
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
  const perview = document.getElementById("perview");
  function perviewMarkdown() {
    const value = editor.state.doc.toString();
    try {
      perview.innerHTML = marked.parse(value);
    }
    catch (ex) {
      console.error(ex);
      perview.innerText = value;
    }
  }
  perviewMarkdown();
</script>

<style>
  @import 'https://cdn.jsdelivr.net/npm/github-markdown-css';

  div.split-view {
    --base-height-multiplier: 8;
    --design-unit: 4;
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

  div.split-view #container {
    display: block;
    width: 50%;
    min-height: calc(var(--base-height-multiplier) * 50px);
    max-height: 100vh;
    box-sizing: border-box;
    background: var(--vscode-editor-background);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
    overflow: auto;
  }

  div.split-view #container .cm-editor {
    border-radius: inherit;
    outline: none;
  }

  div.split-view #container .cm-editor .cm-scroller,
  div.split-view #container .cm-editor .cm-diagnostic,
  div.split-view #container .cm-editor .cm-tooltip-autocomplete>ul {
    font-family: 'Cascadia Code NF', 'Cascadia Code PL', 'Cascadia Code', Consolas, 'Courier New', monospace;
  }

  div.split-view #container .cm-editor .cm-scroller .cm-gutters {
    border-radius: calc(var(--control-corner-radius) * 1px);
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