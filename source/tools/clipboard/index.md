---
title: 剪贴板
description: 获取并渲染剪贴板中的内容
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAnchor,
    fluentButton,
    fluentTextArea,
    fillColor,
    accentBaseColor,
    SwatchRGB,
    neutralLayerFloating,
    baseLayerLuminance,
    StandardLuminance
  } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components@v2/+esm";
  provideFluentDesignSystem()
    .register(
      fluentAnchor(),
      fluentButton(),
      fluentTextArea()
    );
  accentBaseColor.withDefault(SwatchRGB.create(0xFC / 0xFF, 0x64 / 0xFF, 0x23 / 0xFF));
  fillColor.withDefault(neutralLayerFloating);
  const scheme = matchMedia("(prefers-color-scheme: dark)");
  if (typeof scheme !== "undefined") {
    scheme.addEventListener("change", e => baseLayerLuminance.withDefault(e.matches ? StandardLuminance.DarkMode : StandardLuminance.LightMode));
    if (scheme.matches) {
      baseLayerLuminance.withDefault(StandardLuminance.DarkMode);
    }
  }
</script>

{% raw %}
<div id="vue-app">
  <div class="stack-vertical" style="row-gap: 0.3rem; container-type: inline-size;">
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/clipboard_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="clipboard-paste" class="unset">获取剪贴板</h3>
      </template>
      <template #description>
        点击<fluent-anchor href="javascript:void(0)" @click="pasteAsync" appearance="hypertext">粘贴</fluent-anchor>按钮或使用快捷键
        <kbd>ctrl</kbd> + <kbd>v</kbd> 粘贴。
      </template>
      <fluent-button @click="pasteAsync">粘贴</fluent-button>
    </settings-card>
    <settings-card v-if="info">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/info_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="clipboard-info" class="unset">{{ info.title }}</h3>
      </template>
      <template #description>
        <span v-if="info.error">{{ info.error }}</span>
        <span v-else>
          <span v-if="info.kind">
            <span v-if="info.kind === 'file'">文件名: <code>{{ file.name }}</code></span>
            <span v-else>类型: <code>{{ info.kind }}</code></span>&nbsp;
          </span>
          <span v-if="info.types?.length">
            MIME 类型:
            <span v-for="type in info.types" :key="type"><code>{{ type }}</code>&nbsp;</span>
          </span>
        </span>
      </template>
      <fluent-anchor v-if="file" :href="file.url" target="_blank" :download="file.name">下载</fluent-anchor>
      <fluent-button v-if="canShare" @click="share">分享</fluent-button>
    </settings-card>
    <div class="split-view">
      <div class="split-content">
        <input-label v-fill-color="fillColor" label="原文" style="flex: 1;">
          <fluent-text-area v-model="original" resize="vertical" v-attribute:wrap="'off'" style="flex: 1;"
            readonly></fluent-text-area>
        </input-label>
      </div>
      <div class="split-content" style="overflow-x: auto;">
        <input-label v-fill-color="fillColor" label="渲染" style="flex: 1; overflow-x: inherit;">
          <div class="rendered">
            <pre v-if="rendered.text">{{ rendered.text }}</pre>
            <component v-else-if="rendered.component" :is="rendered.component" :src="file.url" loading="lazy" controls>
            </component>
            <div v-else-if="rendered.marked" class="markdown-body" v-html="rendered.marked"></div>
            <pre v-else-if="rendered.lang" :class="['highlight', rendered.lang, `language-${rendered.lang}`]">
              <code :class="['hljs', `language-${rendered.lang}`]" v-html="rendered.highlighted"></code>
            </pre>
            <fluent-anchor v-else-if="file" appearance="hypertext" :href="file.url" target="_blank"
              appearance="hypertext" :download="file.name">
              {{ file.name }}
            </fluent-anchor>
          </div>
        </input-label>
      </div>
    </div>
  </div>
</div>

<template id="empty-template">
  <slot></slot>
</template>

<template id="svg-host-template">
  <div class="svg-host" v-html="innerHTML"></div>
</template>

<template id="input-label-template">
  <div class="input-label">
    <div class="fluent-input-label">
      <label>{{ label }}</label>
    </div>
    <slot></slot>
  </div>
</template>

<template id="settings-presenter-template">
  <div class="settings-presenter" v-fill-color="fillColor">
    <div class="header-root">
      <div class="icon-holder" v-check-solt="$slots.icon">
        <slot name="icon"></slot>
      </div>
      <div class="header-panel">
        <span v-check-solt="$slots.header">
          <slot name="header"></slot>
        </span>
        <span class="description" v-check-solt="$slots.description">
          <slot name="description"></slot>
        </span>
      </div>
    </div>
    <div class="content-presenter" v-check-solt="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<template id="settings-card-template">
  <div class="settings-card">
    <provide-value name="fillColor" :value="fillColor">
      <settings-presenter class="presenter">
        <template #icon>
          <slot name="icon"></slot>
        </template>
        <template #header>
          <slot name="header"></slot>
        </template>
        <template #description>
          <slot name="description"></slot>
        </template>
        <slot></slot>
      </settings-presenter>
    </provide-value>
  </div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp, computed, toRaw } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { fillColor, neutralFillInputRest } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components@v2/+esm";
  createApp({
    data() {
      return {
        original: '',
        rendered: '',
        info: null,
        _file: null,
        fillColor: neutralFillInputRest
      }
    },
    computed: {
      file: {
        get() {
          return this._file;
        },
        async set(file) {
          if (!file) {
            this._file = null;
            this.original = '';
            this.rendered = {};
          }
          else if (typeof file === "string") {
            this._file = null;
            this.original = file;
            this.rendered = { text: file };
          }
          else if (file instanceof Blob) {
            const url = file.url = URL.createObjectURL(file);
            const name = file.name;
            this._file = file;
            this.original = name || url;
            if (file.type.startsWith("image/")) {
              this.rendered = { component: "img" };
            }
            else if (file.type.startsWith("audio/")) {
              this.rendered = { component: "audio" };
            }
            else if (file.type.startsWith("video/")) {
              this.rendered = { component: "video" };
            }
            else if (file.type.startsWith("text/") || file.type === "application/json" || file.type === "application/xml") {
              const text = this.original = await file.text();
              if (file.type === "text/html") {
                this.rendered = { component: "iframe" };
              }
              else if (file.type === "text/markdown") {
                this.rendered = { marked: await this.marked(text) };
              }
              else {
                const type = file.type;
                const lang = type.split('/').pop();
                if (lang && lang !== "plain") {
                  this.rendered = { lang, highlighted: await this.highlight(text, lang) };
                }
                else {
                  this.rendered = { text };
                }
              }
            }
            else {
              this.rendered = {};
            }
          }
        }
      },
      canShare() {
        const file = this.file;
        return navigator.canShare && file instanceof File && navigator.canShare({ files: [file] });
      }
    },
    watch: {
      _file(_, oldValue) {
        if (oldValue instanceof Blob) {
          URL.revokeObjectURL(oldValue.url);
        }
      }
    },
    methods: {
      share() {
        const file = this.file;
        navigator.share({
          title: "剪贴板分享",
          text: file.name,
          files: [file]
        });
      },
      async marked(src) {
        const { use } = await import("https://cdn.jsdelivr.net/npm/marked/+esm");
        const { markedHighlight } = await import("https://cdn.jsdelivr.net/npm/marked-highlight/+esm");
        const marked = use(markedHighlight({
          async: true,
          langPrefix: "hljs language-",
          highlight: (code, lang, info) => {
            return this.highlight(code, lang);
          }
        }), {
          renderer: {
            link(token) {
              const link = Object.getPrototypeOf(this).link.call(this, token);
              if (/^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(token.href)) {
                const span = document.createElement("span");
                span.innerHTML = link;
                const anchor = span.firstElementChild;
                anchor.setAttribute("target", "_blank");
                anchor.setAttribute("rel", "noopener noreferrer");
                return span.innerHTML;
              }
              return link;
            },
            image(token) {
              const image = Object.getPrototypeOf(this).image.call(this, token);
              return `${image.slice(0, image.length - 1)} loading = "lazy" >`;
            }
          }
        });
        return marked.parse(src, { async: true });
      },
      async highlight(code, lang) {
        const { HighlightJS: hljs } = await import("https://cdn.jsdelivr.net/npm/highlight.js/+esm");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        const highlighted = hljs.highlight(code, { language }).value;
        return highlighted;
      },
      async pasteAsync() {
        try {
          const result = await navigator.permissions.query({ name: "clipboard-read" });
          if (result.state === "denied") {
            this.info = {
              title: "没有剪贴板读取权限"
            };
            return;
          }
          const items = await navigator.clipboard.read();
          const item = items[0];
          if (item) {
            const types = item.types;
            this.info = {
              title: "剪贴板信息",
              types: types
            };
            let type = types.find(x => x !== "text/plain");
            this.file = type ? await item.getType(type) :
              types.includes("text/plain") ? await item.getType("text/plain")
                : await navigator.clipboard.readText();
          }
          else {
            this.info = {
              title: "剪贴板无内容"
            };
          }
        }
        catch (ex) {
          console.error(ex);
          this.info = {
            title: "剪贴板获取失败",
            error: ex instanceof Error ? ex.message : String(ex)
          };
        }
      },
      async onpaste(e) {
        try {
          const data = e.clipboardData;
          if (data instanceof DataTransfer) {
            const items = data.items;
            const item = items[0];
            if (item) {
              this.info = {
                title: "粘贴信息",
                kind: item.kind,
                types: item.type ? [item.type] : []
              };
              switch (item.kind) {
                case "string":
                  item.getAsString(text => this.file = text);
                  break;
                case "file":
                  this.file = item.getAsFile();
                  break;
              }
            }
            return;
          }
          this.info = {
            title: "无粘贴内容"
          };
        }
        catch (ex) {
          console.error(ex);
          this.info = {
            title: "粘贴解析失败",
            error: ex instanceof Error ? ex.message : String(ex)
          };
        }
      }
    },
    mounted() {
      document.addEventListener("paste", this.onpaste);
      if (typeof NexT !== "undefined") {
        NexT.utils.registerSidebarTOC();
      }
    },
    unmounted() {
      document.removeEventListener("paste", this.onpaste);
    }
  }).directive("attribute",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const value = binding.value;
        if (value !== binding.oldValue) {
          const name = binding.arg;
          if (name) {
            element.setAttribute(name, value);
          }
        }
      }
    }
  ).directive("check-solt",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const solt = binding.value;
        function setDisplay(value) {
          if (value) {
            if (element.style.display === "none") {
              element.style.display = '';
            }
          }
          else {
            element.style.display = "none";
          }
        }
        if (typeof solt === "undefined") {
          return setDisplay(false);
        }
        else if (typeof solt === "function") {
          const value = solt();
          if (value instanceof Array) {
            const result = value.some(x => {
              if (typeof x === "object") {
                if (typeof x.type === "symbol") {
                  const children = x.children;
                  return children === "v-if" ? false
                    : typeof children === "string" || children instanceof Array ? !!children.length
                      : !!children;
                }
                else {
                  return true;
                }
              }
              else {
                return false;
              }
            });
            return setDisplay(result);
          }
        }
        setDisplay(false);
      }
    }
  ).directive("fill-color",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        if (binding.value !== binding.oldValue) {
          const color = toRaw(binding.value);
          if (color) {
            fillColor.setValueFor(element, color.getValueFor(element.parentElement));
          }
          else {
            fillColor.deleteValueFor(element);
          }
        }
      }
    }
  ).component("provide-value", {
    template: "#empty-template",
    props: {
      name: String,
      value: undefined
    },
    provide() {
      return {
        [this.name]: computed(() => this.value)
      }
    }
  }).component("svg-host", {
    template: "#svg-host-template",
    props: {
      src: String
    },
    data() {
      return {
        innerHTML: null
      }
    },
    watch: {
      src(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.getSVGAsync(newValue).then(svg => this.innerHTML = svg);
        }
      }
    },
    methods: {
      async getSVGAsync(src) {
        if (src) {
          try {
            return await fetch(src)
              .then(response => response.text());
          }
          catch (ex) {
            console.error(ex);
          }
        }
        return '';
      }
    },
    mounted() {
      this.getSVGAsync(this.src).then(svg => this.innerHTML = svg);
    }
  }).component("input-label", {
    template: "#input-label-template",
    props: {
      label: String
    }
  }).component("settings-presenter", {
    template: "#settings-presenter-template",
    inject: ["fillColor"]
  }).component("settings-card", {
    template: "#settings-card-template",
    inject: {
      fillColor: {
        default: neutralFillInputRest
      }
    }
  }).mount("#vue-app");
</script>

<style>
  @import "https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/Components/Label/FluentInputLabel.razor.css";

  #vue-app {
    --settings-card-padding: calc(var(--design-unit) * 4px);
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    font-weight: var(--font-weight);
    color: var(--neutral-foreground-rest);
    color-scheme: light;
  }

  @media (prefers-color-scheme: dark) {
    #vue-app {
      color-scheme: dark;
    }
  }

  #vue-app .stack-vertical {
    display: flex;
    flex-direction: column;
  }

  #vue-app h6.unset,
  #vue-app h5.unset,
  #vue-app h4.unset,
  #vue-app h3.unset,
  #vue-app h2.unset,
  #vue-app h1.unset {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  #vue-app fluent-text-area::part(control) {
    min-height: max(100%, calc(((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 2) * 1px));
  }

  #vue-app fluent-text-area[readonly]::part(control) {
    cursor: auto;
  }

  fluent-text-area[wrap="off"]::part(control) {
    white-space-collapse: preserve;
    text-wrap-mode: nowrap;
    overflow-wrap: normal;
  }

  #vue-app pre {
    border-radius: calc(var(--control-corner-radius) * 1px);
  }

  #vue-app pre code.hljs {
    padding: 0;
  }

  #vue-app iframe {
    width: 100%;
    height: 100%;
    border: none;
    resize: vertical;
  }

  #vue-app div.split-view {
    height: 100%;
    display: flex;
    gap: 0.3rem;
  }

  #vue-app div.split-view .split-content {
    flex: 1;
    display: flex;
    box-sizing: border-box;
    padding: var(--settings-card-padding);
    background: var(--neutral-fill-input-rest);
    color: var(--neutral-foreground-rest);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
  }

  #vue-app .rendered {
    overflow-x: inherit;
  }

  #vue-app .rendered>* {
    margin-bottom: 0;
  }

  #vue-app .markdown-body embed,
  #vue-app .markdown-body iframe,
  #vue-app .markdown-body img,
  #vue-app .markdown-body video {
    display: inline;
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    #vue-app div.split-view {
      flex-direction: column;
    }
  }

  .main-inner .post-block .post-body #vue-app kbd {
    border-width: 1px;
    font-size: 0.875em;
  }

  .svg-host {
    display: flex;
  }

  .input-label {
    display: flex;
    flex-direction: column;
  }

  .input-label .fluent-input-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;
  }

  .input-label .fluent-input-label label {
    cursor: pointer;
  }

  .settings-presenter {
    --settings-card-description-font-size: var(--type-ramp-minus-1-font-size);
    --settings-card-header-icon-max-size: var(--type-ramp-base-line-height);
    --settings-card-header-icon-margin: 0 calc((var(--base-horizontal-spacing-multiplier) * 6 + var(--design-unit) * 0.5) * 1px) 0 calc((var(--base-horizontal-spacing-multiplier) * 6 - var(--design-unit) * 4) * 1px);
    --settings-card-vertical-header-content-spacing: calc(var(--design-unit) * 2px) 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-presenter div.header-root {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .settings-presenter div.icon-holder {
    max-width: var(--settings-card-header-icon-max-size);
    max-height: var(--settings-card-header-icon-max-size);
    margin: var(--settings-card-header-icon-margin);
    fill: currentColor;
  }

  .settings-presenter div.header-panel {
    display: flex;
    flex-direction: column;
    margin: 0 calc(var(--design-unit) * 6px) 0 0;
  }

  .settings-presenter span.description {
    font-size: var(--settings-card-description-font-size);
    color: var(--neutral-fill-strong-hover);
  }

  .settings-presenter div.content-presenter {
    display: grid;
    grid-auto-flow: column;
    gap: calc(var(--design-unit) * 1px);
  }

  @container (max-width: 476px) {
    .settings-presenter {
      flex-flow: column;
      justify-content: normal;
      align-items: normal;
    }

    .settings-presenter div.header-panel {
      margin: 0;
    }

    .settings-presenter div.content-presenter {
      margin: var(--settings-card-vertical-header-content-spacing);
      grid-auto-flow: row;
    }
  }

  @media (max-width: 476px) {
    .settings-presenter {
      flex-flow: column;
      justify-content: normal;
      align-items: normal;
    }

    .settings-presenter div.header-panel {
      margin: 0;
    }

    .settings-presenter div.content-presenter {
      margin: var(--settings-card-vertical-header-content-spacing);
      grid-auto-flow: row;
    }
  }

  .settings-card {
    display: block;
    box-sizing: border-box;
    background: var(--neutral-fill-input-rest);
    color: var(--neutral-foreground-rest);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
  }

  .settings-card .presenter {
    padding: var(--settings-card-padding);
  }
</style>