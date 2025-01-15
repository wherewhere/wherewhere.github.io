---
title: 小工具
description: 各种各样的实用小工具
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
    fluentAnchor,
    fluentButton,
    fluentNumberField,
    fluentSwitch,
    fluentTextField,
    accentBaseColor,
    SwatchRGB,
    fillColor,
    neutralLayerFloating,
    baseLayerLuminance,
    StandardLuminance
  } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  provideFluentDesignSystem()
    .register(
      fluentAccordion(),
      fluentAccordionItem(),
      fluentAnchor(),
      fluentButton(),
      fluentNumberField(),
      fluentSwitch(),
      fluentTextField()
    );
  accentBaseColor.withDefault(SwatchRGB.create(0xFC / 0xFF, 0x64 / 0xFF, 0x23 / 0xFF));
  fillColor.withDefault(neutralLayerFloating);
  if (typeof matchMedia === "function") {
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    if (typeof scheme !== "undefined") {
      scheme.addEventListener("change", e => baseLayerLuminance.withDefault(e.matches ? StandardLuminance.DarkMode : StandardLuminance.LightMode));
      if (scheme.matches) {
        baseLayerLuminance.withDefault(StandardLuminance.DarkMode);
      }
    }
  }
</script>

{% raw %}
<div id="vue-app">
  <settings-group>
    <template #header>
      <h3 id="render" class="unset">渲染</h3>
    </template>
    <settings-button href="bilibili-card">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/card_ui_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="render-bilibili-card" class="unset">哔哩哔哩卡片</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/wherewhere/hexo-tag-bilibili-card"
          target="_blank">bilibili-card</fluent-anchor> 生成哔哩哔哩卡片。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button href="bopo">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/local_language_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="render-bopomofo" class="unset">注音组字</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="http://cheonhyeong.com/Tools/Times.html#9"
          target="_blank">TH-Times</fluent-anchor> 字体显示注音文本。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button href="markdown">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/markdown_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="render-markdown" class="unset">Markdown 预览</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/markedjs/marked"
          target="_blank">Marked.JS</fluent-anchor> 解析并预览 Markdown 文本。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
  </settings-group>
  <settings-group>
    <template #header>
      <h3 id="convert" class="unset">转换</h3>
    </template>
    <settings-expander>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/calendar_date_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="convert-timestamp" class="unset">时间戳转换</h4>
      </template>
      <template #description>
        转换 Unix 时间戳与时间字符串。
      </template>
      <div class="setting-expander-content-grid stack-vertical"
        style="gap: calc(var(--base-horizontal-spacing-multiplier) * 3px);">
        <div class="stack-horizontal" style="gap: inherit;">
          <fluent-number-field v-model="timeStamp" style="flex: 1;"></fluent-number-field>
          <fluent-button @click="convertTimeStamp">转换时间戳</fluent-button>
        </div>
        <div class="stack-horizontal" style="gap: inherit;">
          <fluent-text-field v-model="timeString" style="flex: 1;"></fluent-text-field>
          <fluent-button @click="convertTimeString">转换时间</fluent-button>
        </div>
        <div class="stack-horizontal" style="justify-content: space-between; gap: inherit;">
          <fluent-button @click="setDateTimeNow">当前时间</fluent-button>
          <value-change-host v-model="isMillisecond" value-name="checked" event-name="change">
            <fluent-switch>时间戳是否为毫秒</fluent-switch>
          </value-change-host>
        </div>
      </div>
    </settings-expander>
    <settings-button href="encoding">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/arrow_sync_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="convert-encoding" class="unset">编码&解码</h4>
      </template>
      <template #description>
        编码与解码 HTML、XML、Base64、Unicode 文本。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button href="base-x">
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/number_symbol_square_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="convert-base-x" class="unset">Base X 编码</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/UmamiAppearance/BaseExJS"
          target="_blank">BaseEx</fluent-anchor> 编码与解码 Base1、Base16、Base32、Base64 等文本。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button href="json-yaml">
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/database_switch_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="convert-json-yaml" class="unset">JSON 与 YAML 转换</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/sidorares/json-bigint"
          target="_blank">json-bigint</fluent-anchor> 和 <fluent-anchor appearance="hypertext"
          href="https://github.com/nodeca/js-yaml/" target="_blank">js-yaml</fluent-anchor> 转化 JSON 与 YAML 数据。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
  </settings-group>
  <settings-group>
    <template #header>
      <h3 id="generate" class="unset">生成</h3>
    </template>
    <settings-button href="crypto">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/shield_lock_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="generate-crypto" class="unset">Hash 加密</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/Daninet/hash-wasm/"
          target="_blank">hash-wasm</fluent-anchor> 进行 MD5、Sha1、Sha2、Sha3、Bcrypt 等文本加密。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button href="uuid">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/fluid_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="generate-uuid" class="unset">UUID & GUID</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/uuidjs/uuid/"
          target="_blank">uuid</fluent-anchor> 生成 UUID 与 GUID。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button href="regex">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/code_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="generate-regex" class="unset">正则表达式</h4>
      </template>
      <template #description>
        测试正则表达式。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
  </settings-group>
</div>

<template id="empty-slot-template">
  <div>
    <slot></slot>
  </div>
</template>

<template id="svg-host-template">
  <div class="svg-host" v-html="innerHTML"></div>
</template>

<template id="settings-presenter-template">
  <div class="settings-presenter">
    <div class="header-root">
      <div class="icon-holder" v-check-solt="getSlot('icon')">
        <slot name="icon"></slot>
      </div>
      <div class="header-panel">
        <span v-check-solt="getSlot('header')">
          <slot name="header"></slot>
        </span>
        <span class="description" v-check-solt="getSlot('description')">
          <slot name="description"></slot>
        </span>
      </div>
    </div>
    <div class="content-presenter" v-check-solt="getSlot('default')">
      <slot></slot>
    </div>
  </div>
</template>

<template id="settings-button-template">
  <a class="settings-button" ref="anchor">
    <div class="content-grid">
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
      <div class="action-icon-holder" v-check-solt="getSlot('action-icon')">
        <slot name="action-icon"></slot>
      </div>
    </div>
  </a>
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
      <div v-fill-color="neutralFillLayerAltRest">
        <slot></slot>
      </div>
    </fluent-accordion-item>
  </fluent-accordion>
</template>

<template id="settings-group-template">
  <div class="settings-group">
    <div class="header-presenter" v-check-solt="getSlot('header')">
      <slot name="header"></slot>
    </div>
    <div class="items-presenter" v-check-solt="getSlot('default')">
      <slot></slot>
    </div>
  </div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { fillColor, neutralFillLayerAltRest } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  const root = document.getElementById("vue-app");
  const designTokens = {
    neutralFillLayerAltRest: neutralFillLayerAltRest.getValueFor(root)
  }
  createApp({
    data() {
      return {
        isMillisecond: false,
        timeStamp: Math.floor(Date.now() / 1000),
        timeString: new Date().toISOString()
      }
    },
    watch: {
      isMillisecond(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.timeStamp = Math.floor(oldValue ? this.timeStamp / 1000 : this.timeStamp * 1000);
        }
      }
    },
    methods: {
      convertTimeStamp() {
        const time = Math.floor(this.isMillisecond ? +this.timeStamp : this.timeStamp * 1000);
        this.timeString = new Date(time).toISOString();
      },
      convertTimeString() {
        const time = new Date(this.timeString);
        this.timeStamp = this.isMillisecond ? time.getTime() : Math.floor(time.getTime() / 1000);
      },
      setDateTimeNow() {
        const time = new Date();
        this.timeStamp = this.isMillisecond ? time.getTime() : Math.floor(time.getTime() / 1000);
        this.timeString = new Date().toISOString();
      }
    }
  }).directive("check-solt",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const solt = binding.value;
        if (solt !== binding.oldValue) {
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
          if (typeof solt === "function") {
            let value = solt();
            if (value instanceof Array) {
              value = value[0];
              if (typeof value === "object") {
                if (typeof value.type === "symbol") {
                  value = value.children;
                  if (value instanceof Array) {
                    setDisplay(value.length > 0);
                    return;
                  }
                }
                else {
                  setDisplay(true);
                  return;
                }
              }
            }
          }
          setDisplay(false);
        }
      }
    }
  ).directive("fill-color",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const color = binding.value;
        if (color !== binding.oldValue) {
          fillColor.setValueFor(element, color);
        }
      }
    }
  ).component("value-change-host", {
    template: "#empty-slot-template",
    props: {
      valueName: String,
      eventName: String,
      modelValue: undefined
    },
    emits: ['update:modelValue'],
    watch: {
      eventName(newValue, oldValue) {
        if (newValue !== oldValue) {
          const $el = this.$el;
          if ($el instanceof HTMLElement) {
            const element = $el.children[0];
            if (element instanceof HTMLElement) {
              if (oldValue) {
                element.removeEventListener(oldValue, this.onValueChanged);
              }
              if (newValue) {
                element.addEventListener(newValue, this.onValueChanged);
              }
            }
          }
        }
      },
      modelValue(newValue, oldValue) {
        if (newValue !== oldValue) {
          const valueName = this.valueName;
          if (valueName) {
            const $el = this.$el;
            if ($el instanceof HTMLElement) {
              const element = $el.children[0];
              if (element instanceof HTMLElement) {
                element[valueName] = newValue;
              }
            }
          }
        }
      }
    },
    methods: {
      registerEvent(valueName) {
        const $el = this.$el;
        if ($el instanceof HTMLElement) {
          const element = $el.children[0];
          if (element instanceof HTMLElement) {
            const modelValue = this.modelValue;
            if (modelValue === undefined) {
              this.$emit('update:modelValue', element[valueName]);
            }
            else {
              element[valueName] = modelValue;
            }
            element.addEventListener(this.eventName, this.onValueChanged);
          }
        }
      },
      onValueChanged(event) {
        const target = event.target;
        if (target instanceof HTMLElement) {
          this.$emit('update:modelValue', target[this.valueName]);
        }
      }
    },
    mounted() {
      const valueName = this.valueName;
      if (valueName && this.eventName) {
        this.registerEvent(valueName);
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
  }).component("settings-presenter", {
    template: "#settings-presenter-template",
    methods: {
      getSlot(name) {
        return this.$slots[name];
      }
    }
  }).component("settings-button", {
    template: "#settings-button-template",
    methods: {
      getSlot(name) {
        return this.$slots[name];
      }
    },
    mounted() {
      if (typeof pjax !== "undefined") {
        pjax.attachLink(this.$refs.anchor);
      }
    }
  }).component("settings-expander", {
    template: "#settings-expander-template",
    props: {
      expanded: String
    },
    data() {
      return {
        neutralFillLayerAltRest: designTokens.neutralFillLayerAltRest
      }
    }
  }).component("settings-group", {
    template: "#settings-group-template",
    methods: {
      getSlot(name) {
        return this.$slots[name];
      }
    }
  }).mount(root);
</script>

<style>
  #vue-app {
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    font-weight: var(--font-weight);
    color: var(--neutral-foreground-rest);
  }

  #vue-app .stack-vertical {
    display: flex;
    flex-direction: column;
  }

  #vue-app .stack-horizontal {
    display: flex;
    flex-direction: row;
    align-items: center;
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

  .svg-host {
    display: flex;
  }

  .settings-presenter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-presenter * {
    --settings-card-description-font-size: var(--type-ramp-minus-1-font-size);
    --settings-card-header-icon-max-size: var(--type-ramp-base-line-height);
    --settings-card-header-icon-margin: 0 calc((var(--base-horizontal-spacing-multiplier) * 6 + var(--design-unit) * 0.5) * 1px) 0 calc((var(--base-horizontal-spacing-multiplier) * 6 - var(--design-unit) * 4) * 1px);
    --settings-card-vertical-header-content-spacing: calc(var(--design-unit) * 2px) 0 0 0;
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

    .settings-presenter div.header-panel {
      margin: unset;
    }

    .settings-presenter div.content-presenter {
      margin: var(--settings-card-vertical-header-content-spacing);
    }
  }

  .settings-button {
    cursor: pointer;
    display: block;
    box-sizing: border-box;
    background: var(--neutral-fill-input-rest);
    color: var(--neutral-foreground-rest);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
    text-decoration: inherit;
  }

  .settings-button:hover {
    background: var(--neutral-fill-input-hover);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-hover);
    box-shadow: var(--elevation-shadow-card-hover);
  }

  .settings-button:active {
    background: var(--neutral-fill-input-active);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-active);
    box-shadow: var(--elevation-shadow-card-pressed);
  }

  .settings-button * {
    --settings-button-padding: calc(var(--design-unit) * 4px) 0 calc(var(--design-unit) * 4px) calc(var(--design-unit) * 4px);
  }

  .settings-button .presenter {
    padding: var(--settings-button-padding);
    flex: 1;
  }

  .settings-button div.content-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-button div.action-icon-holder {
    width: calc((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px);
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 calc(var(--design-unit) * 2px);
    fill: currentColor;
  }

  .settings-expander * {
    --settings-expander-header-padding: calc(var(--design-unit) * 1px) 0 calc(var(--design-unit) * 1px) calc(var(--design-unit) * 2px);
    --settings-expander-item-padding: 0 calc((var(--base-height-multiplier) + 1 + var(--density)) * var(--design-unit) * 1px) 0 calc((var(--base-horizontal-spacing-multiplier) * 12 - var(--design-unit) * 1.5) * 1px + var(--type-ramp-base-line-height));
  }

  .settings-expander fluent-accordion-item.expander {
    box-sizing: border-box;
    box-shadow: var(--elevation-shadow-card-rest);
    border-radius: calc(var(--control-corner-radius) * 1px);
  }

  .settings-expander fluent-accordion-item.expander:hover {
    background: var(--neutral-fill-input-hover);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-hover);
    box-shadow: var(--elevation-shadow-card-hover);
  }

  .settings-expander fluent-accordion-item.expander:active {
    background: var(--neutral-fill-input-active);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-active);
    box-shadow: var(--elevation-shadow-card-pressed);
  }

  .settings-expander .presenter {
    padding: var(--settings-expander-header-padding);
  }

  .settings-expander div.setting-expander-content-grid {
    padding: var(--settings-expander-item-padding);
  }

  .settings-group * {
    --body-strong-text-block-font-size: var(--type-ramp-base-font-size);
  }

  .settings-group div.header-presenter {
    margin: 1rem 0 calc(var(--base-horizontal-spacing-multiplier) * 2px) calc(var(--stroke-width) * 1px);
    font-size: var(--body-strong-text-block-font-size);
    font-weight: bold;
    color: var(--neutral-foreground-rest);
  }

  .settings-group div.items-presenter {
    display: flex;
    flex-direction: column;
    row-gap: 0.3rem;
  }
</style>