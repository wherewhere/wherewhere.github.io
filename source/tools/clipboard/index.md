---
title: 剪贴板
description: 获取并渲染剪贴板中的内容
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
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
        点击粘贴按钮或使用快捷键 <kbd>ctrl</kbd> + <kbd>v</kbd> 粘贴。
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
          <span v-if="info.kind">类别: <code>{{ info.kind }}</code>&nbsp;</span>
          <span v-if="info.types?.length">
            MIME 类型:
            <span v-for="type in info.types" :key="type"><code>{{ type }}</code>&nbsp;</span>
          </span>
        </span>
      </template>
    </settings-card>
    <div class="split-view">
      <div class="split-content">
        <input-label v-fill-color="fillColor" label="原文" style="flex: 1;">
          <fluent-text-area v-model="original" resize="vertical" style="flex: 1;" readonly></fluent-text-area>
        </input-label>
      </div>
      <div class="split-content" style="overflow-x: auto;">
        <input-label v-fill-color="fillColor" label="渲染" style="flex: 1; overflow-x: inherit;">
          <div class="rendered" v-html="rendered"></div>
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
        fillColor: neutralFillInputRest
      }
    },
    methods: {
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
            let type = types.find(x => x.startsWith("image/"));
            if (type) {
              const blob = await item.getType(type);
              const text = await blob.text();
              this.original = text;
              this.rendered = `<img src="${URL.createObjectURL(blob)}" loading="lazy" />`;
            }
            else if (types.includes("text/html")) {
              const blob = await item.getType("text/html");
              const text = await blob.text();
              this.original = text;
              this.rendered = text;
            }
            else if (types.includes("text/plain")) {
              const blob = await item.getType("text/plain");
              const text = await blob.text();
              this.original = text;
              const pre = document.createElement("pre");
              pre.innerText = text;
              this.rendered = pre.outerHTML;
            }
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
                types: [item.type]
              };
              switch (item.kind) {
                case "string":
                  item.getAsString(text => {
                    this.original = text;
                    const pre = document.createElement("pre");
                    pre.innerText = text;
                    this.rendered = pre.outerHTML;
                  });
                  break;
                case "file":
                  const file = item.getAsFile();
                  if (file) {
                    this.original = file.name;
                    if (file.type.startsWith("image/")) {
                      this.rendered = `<img src="${URL.createObjectURL(file)}" loading="lazy" />`;
                    }
                    else if (file.type.startsWith("audio/")) {
                      this.rendered = `<audio src="${URL.createObjectURL(file)}" loading="lazy" controls></audio>`;
                    }
                    else if (file.type.startsWith("video/")) {
                      this.rendered = `<video src="${URL.createObjectURL(file)}" loading="lazy" controls></video>`;
                    }
                    else if (file.type.startsWith("text/") || file.type === "application/json" || file.type === "application/xml") {
                      if (file.type === "text/html") {
                        this.rendered = `<iframe src="${URL.createObjectURL(file)}" loading="lazy"></iframe>`;
                      }
                      else {
                        const type = file.type;
                        const lang = type.split('/').pop();
                        if (lang) {
                          const text = await file.text();
                          const { HighlightJS } = await import("https://cdn.jsdelivr.net/npm/highlight.js/+esm");
                          const highlighted = HighlightJS.highlight(text, { language: lang }).value;
                          this.rendered = `<pre class="highlight ${lang} language-${lang}"><code class="hljs language-${lang}">` + highlighted + "</code></pre>";
                        }
                        else {
                          const text = await file.text();
                          const pre = document.createElement("pre");
                          pre.innerText = text;
                          this.rendered = pre.outerHTML;
                        }
                      }
                    }
                    else {
                      this.rendered = `<a href="${URL.createObjectURL(file)}" download="${file.name}">${file.name}</a>`;
                    }
                  }
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
  }).directive("check-solt",
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