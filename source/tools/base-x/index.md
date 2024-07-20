---
title: Base X 编码
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
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
      fluentAccordion(),
      fluentAccordionItem(),
      fluentButton(),
      fluentOption(),
      fluentSelect(),
      fluentTextArea()
    );
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
        <h4 id="base-type" class="unset">Base X 类型</h4>
      </template>
      <template #description>
        选择编码 Base 的类型。
      </template>
      <fluent-select v-model="type" style="min-width: 160px;">
        <fluent-option v-for="key in getBaseExList()" :value="key">{{ key }}</fluent-option>
      </fluent-select>
    </settings-card>
    <settings-expander v-show="showCharsets">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/password_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="base-charsets" class="unset">编码表</h4>
      </template>
      <template #description>
        {{ type }} 的编码表。
      </template>
      <div class="setting-expander-content-grid">
        <fluent-text-area :value="getBaseCharsets()" resize="vertical" style="width: 100%;"
          readonly="true"></fluent-text-area>
      </div>
    </settings-expander>
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

<template id="settings-expander-template">
  <fluent-accordion class="settings-expander">
    <fluent-accordion-item class="expander" :expanded="expanded">
      <div slot="heading">
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
          <slot name="action-content"></slot>
        </settings-presenter>
      </div>
      <slot></slot>
    </fluent-accordion-item>
  </fluent-accordion>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { BaseEx } from "https://cdn.jsdelivr.net/npm/base-ex/+esm";
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
        type: "base64",
        encoded: null,
        decoded: null,
        showCharsets: false,
        baseEx: new BaseEx("str")
      }
    },
    methods: {
      getBaseExList() {
        const keys = Object.keys(this.baseEx);
        const index = keys.lastIndexOf("simpleBase");
        if (index > -1) {
          keys.splice(index, 1);
        }
        return keys;
      },
      getBaseCharsets() {
        try {
          const base = this.baseEx[this.type];
          if (typeof base.charsets === "object") {
            this.showCharsets = true;
            return base.charsets[base.version].join('');
          }
        }
        catch (ex) {
          console.error(ex);
        }
        this.showCharsets = false;
        return [];
      },
      encode() {
        this.encoded = this.baseEx[this.type].encode(this.decoded);
      },
      decode() {
        this.decoded = this.baseEx[this.type].decode(this.encoded);
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
  }).component("settings-expander", {
    template: "#settings-expander-template",
    props: {
      expanded: String
    }
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
    --settings-expander-header-padding: 4px 0px 4px 8px;
    --settings-expander-item-padding: 0px 36px 0px 50px;
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

  .settings-presenter a.text-button {
    font-weight: bold;
    text-decoration: unset;
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

  .settings-expander fluent-accordion-item.expander {
    box-sizing: border-box;
    box-shadow: var(--elevation-shadow-card-rest);
  }

  .settings-expander .presenter {
    padding: var(--settings-expander-header-padding);
  }

  .settings-expander div.setting-expander-content-grid {
    padding: var(--settings-expander-item-padding);
  }
</style>