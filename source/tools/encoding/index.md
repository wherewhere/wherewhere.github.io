---
title: 编码与解码
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentButton,
    fluentOption,
    fluentSelect,
    fluentTextArea,
    fillColor,
    accentBaseColor,
    SwatchRGB,
    neutralLayerFloating,
    baseLayerLuminance,
    StandardLuminance
  } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  provideFluentDesignSystem()
    .register(
      fluentButton(),
      fluentOption(),
      fluentSelect(),
      fluentTextArea()
    );
  accentBaseColor.withDefault(SwatchRGB.create(0xFC / 0xFF, 0x64 / 0xFF, 0x23 / 0xFF));
  fillColor.withDefault(neutralLayerFloating);
  if (typeof matchMedia === "function") {
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof scheme !== "undefined") {
      scheme.addListener(e => baseLayerLuminance.withDefault(e.matches ? StandardLuminance.DarkMode : StandardLuminance.LightMode));
      if (scheme.matches) {
        baseLayerLuminance.withDefault(StandardLuminance.DarkMode);
      }
    }
  }
</script>

{% raw %}
<div id="vue-app">
  <div class="stack-vertical" style="row-gap: 0.3rem;">
    <settings-card>
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/number_symbol_square_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="encode-type" class="unset">编码类型</h4>
      </template>
      <template #description>
        选择编码的类型。
      </template>
      <fluent-select v-model="type" style="min-width: 100px;">
        <fluent-option v-for="key in types" :value="key">{{ key }}</fluent-option>
      </fluent-select>
    </settings-card>
    <div class="split-view">
      <input-label class="split-content" label="明文" style="flex: 1;">
        <template #action>
          <fluent-button @click="() => encode()">编码</fluent-button>
        </template>
        <fluent-text-area v-model="decoded" resize="vertical" style="width: 100%;"></fluent-text-area>
      </input-label>
      <input-label class="split-content" label="密文" style="flex: 1;">
        <template #action>
          <fluent-button @click="() => decode()">解码</fluent-button>
        </template>
        <fluent-text-area v-model="encoded" resize="vertical" style="width: 100%;"></fluent-text-area>
      </input-label>
    </div>
  </div>
</div>

<template id="svg-host-template">
  <div v-html="innerHTML"></div>
</template>

<template id="input-label-template">
  <div class="input-label">
    <div class="fluent-input-label">
      <label>
        {{ label }}
      </label>
      <slot name="action"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<template id="settings-presenter-template">
  <div class="settings-presenter">
    <div class="header-root">
      <div class="icon-holder" v-show="showIcon">
        <slot name="icon"></slot>
      </div>
      <div class="header-panel" v-show="showHeader && showDescription">
        <span v-show="showHeader">
          <slot name="header"></slot>
        </span>
        <span class="description" v-show="showDescription">
          <slot name="description"></slot>
        </span>
      </div>
    </div>
    <div class="content-presenter" v-show="showContent">
      <slot></slot>
    </div>
  </div>
</template>

<template id="settings-card-template">
  <div class="settings-card">
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
  </div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import * as entities from "https://cdn.jsdelivr.net/npm/entities/+esm";
  import { Base64 } from "https://cdn.jsdelivr.net/npm/js-base64/+esm";
  function checkSolt(solt) {
    if (typeof solt === "function") {
      let value = solt();
      if (value instanceof Array) {
        value = value[0];
        if (typeof value === "object") {
          if (typeof value.type === "object") {
            return true;
          }
          else {
            value = value.children;
            if (value instanceof Array) {
              return value.length > 0;
            }
          }
        }
      }
    }
    return false;
  }
  createApp({
    data() {
      return {
        type: "HTML",
        encoded: null,
        decoded: null,
        types: ["HTML", "XML", "URL", "Base64", "Unicode"]
      }
    },
    methods: {
      encode() {
        switch (this.type) {
          case "HTML":
            this.encoded = entities.encodeHTML(this.decoded);
            break;
          case "XML":
            this.encoded = entities.encodeXML(this.decoded);
            break;
          case "URL":
            this.encoded = encodeURIComponent(this.decoded);
            break;
          case "Base64":
            this.encoded = Base64.encode(this.decoded);
            break;
          case "Unicode":
            this.encoded = entities.escape(this.decoded);
            break;
        }
      },
      decode() {
        switch (this.type) {
          case "HTML":
            this.decoded = entities.decodeHTML(this.encoded);
            break;
          case "XML":
            this.decoded = entities.decodeXML(this.encoded);
            break;
          case "URL":
            this.decoded = decodeURIComponent(this.encoded);
            break;
          case "Base64":
            this.decoded = Base64.decode(this.encoded);
            break;
          case "Unicode":
            this.decoded = entities.unescape(this.encoded);
            break;
        }
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
    data() {
      return {
        showIcon: false,
        showHeader: false,
        showDescription: false,
        showContent: false,
      };
    },
    methods: {
      setShowSlots() {
        const slots = this.$slots;
        this.showIcon = checkSolt(slots.icon);
        this.showHeader = checkSolt(slots.header);
        this.showDescription = checkSolt(slots.description);
        this.showContent = checkSolt(slots.default);
      }
    },
    created() {
      this.setShowSlots();
    },
    beforeUpdate() {
      this.setShowSlots();
    }
  }).component("settings-card", {
    template: "#settings-card-template"
  }).mount("#vue-app");
</script>

<style>
  @import 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/Components/Label/FluentInputLabel.razor.css';

  #vue-app {
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    font-weight: var(--font-weight);
    color: var(--neutral-foreground-rest);
  }

  #vue-app * {
    --settings-card-padding: 16px;
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
    margin-top: unset;
    margin-bottom: unset;
    font-weight: unset;
    font-family: unset;
    font-size: unset;
    line-height: unset;
  }

  #vue-app fluent-select::part(listbox) {
    max-height: 250px;
  }

  #vue-app fluent-select .listbox {
    max-height: 250px;
  }

  #vue-app div.split-view {
    height: 100%;
    display: flex;
    gap: 0.3rem;
  }

  #vue-app div.split-view .split-content {
    flex: 1;
    display: block;
    box-sizing: border-box;
    padding: var(--settings-card-padding);
    background: var(--neutral-fill-input-rest);
    color: var(--neutral-foreground-rest);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
  }

  @media (max-width: 767px) {
    #vue-app div.split-view {
      flex-direction: column;
    }
  }

  .input-label .fluent-input-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: unset;
  }

  .input-label .fluent-input-label label {
    cursor: pointer;
  }

  .settings-presenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-presenter * {
    --settings-card-description-font-size: 12px;
    --settings-card-header-icon-max-size: 20px;
    --settings-card-content-min-width: 240px;
    --settings-card-header-icon-margin: 0px 20px 0px 2px;
    --settings-card-vertical-header-content-spacing: 8px 0px 0px 0px;
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
    margin: 0px 24px 0px 0px;
  }

  .settings-presenter span.description {
    font-size: var(--settings-card-description-font-size);
    color: var(--neutral-fill-strong-hover);
  }

  .settings-presenter div.content-presenter {
    display: grid;
  }

  @media (max-width: 600px) {
    .settings-presenter {
      flex-flow: column;
      justify-content: unset;
      align-items: unset;
    }

    .settings-presenter * {
      --settings-card-content-min-width: auto;
    }

    .settings-presenter div.header-panel {
      margin: unset;
    }

    .settings-presenter div.content-presenter {
      margin: var(--settings-card-vertical-header-content-spacing);
    }
  }

  .settings-card {
    display: block;
    height: var(--card-height, 100%);
    width: var(--card-width, 100%);
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

  .settings-card div.content-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>