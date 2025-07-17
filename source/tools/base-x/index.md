---
title: Base X 编码
description: 使用 <fluent-anchor appearance="hypertext" href="https://github.com/UmamiAppearance/BaseExJS"
  target="_blank">BaseEx</fluent-anchor> 编码与解码 Base1、Base16、Base32、Base64 等文本
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
    fluentSwitch,
    fluentTextArea,
    fluentTextField,
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
      fluentSwitch(),
      fluentTextArea(),
      fluentTextField()
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
  <div class="stack-vertical" style="row-gap: 0.3rem;">
    <settings-card>
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/settings_cog_multiple_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="base-type" class="unset">Base X 类型</h3>
      </template>
      <template #description>
        选择编码 Base 的类型。
      </template>
      <fluent-select v-model="type" style="min-width: calc(var(--base-height-multiplier) * 20px);">
        <fluent-option v-for="key in getBaseExList()" :value="key">{{ key }}</fluent-option>
      </fluent-select>
    </settings-card>
    <settings-expander v-show="showCharsets">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/password_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="base-charsets" class="unset">编码表</h3>
      </template>
      <template #description>
        {{ type }} 的编码表。
      </template>
      <div class="setting-expander-content-grid">
        <fluent-text-area :value="getBaseCharsets()" resize="vertical" style="width: 100%;"
          readonly="true"></fluent-text-area>
      </div>
    </settings-expander>
    <settings-card class="settings-nowarp">
      <template #icon>
        <svg-host
          :src="`https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/${isFile ? 'document' : 'textbox'}_20_regular.svg`"></svg-host>
      </template>
      <template #header>
        <h3 id="base-file" class="unset">是否为文件</h3>
      </template>
      <template #description>
        编码与解码{{ isFile ? '文件' : '文本' }}。
      </template>
      <value-change-host v-model="isFile" value-name="checked" event-name="change">
        <fluent-switch>{{ isFile ? '是' : '否' }}</fluent-switch>
      </value-change-host>
    </settings-card>
    <settings-card v-show="isFile">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/rename_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="base-file-name" class="unset">自定义文件名</h3>
      </template>
      <template #description>
        自定义解码后生成的文件名。
      </template>
      <fluent-text-field v-model="fileName" :placeholder="getFileName()"></fluent-text-field>
    </settings-card>
    <div class="split-view">
      <div class="split-content">
        <input-label :label="isFile ? '文件' : '明文'" v-fill-color="fillColor"
          style="flex: 1; display: flex; flex-direction: column;">
          <template #action>
            <fluent-button @click="encode">编码</fluent-button>
          </template>
          <div class="fluent-inputfile-container" v-if="isFile" style="flex: 1; min-height: 64px;">
            <div class="inputfile-content">
              <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/arrow_upload_24_regular.svg"
                style="fill: var(--accent-fill-rest); justify-content: center;"></svg-host>
              <div v-if="file">{{ file.name }} ({{ getSizeString(file.size) }})</div>
              <div v-else>上传一个文件</div>
            </div>
            <input @change="(e) => file = e.target.files[0]" type="file"
              style="grid-column: 1; grid-row: 1; opacity: 0;"></input>
          </div>
          <fluent-text-area v-model="decoded" resize="vertical" style="width: 100%;" v-else></fluent-text-area>
        </input-label>
      </div>
      <div class="split-content">
        <input-label label="密文" v-fill-color="fillColor" style="flex: 1;">
          <template #action>
            <fluent-button @click="decode">解码</fluent-button>
          </template>
          <fluent-text-area v-model="encoded" resize="vertical" style="width: 100%;"></fluent-text-area>
        </input-label>
      </div>
    </div>
  </div>
</div>

<template id="empty-slot-template">
  <div>
    <slot></slot>
  </div>
</template>

<template id="svg-host-template">
  <div class="svg-host" v-html="innerHTML"></div>
</template>

<template id="input-label-template">
  <div class="input-label">
    <div class="fluent-input-label">
      <label>{{ label }}</label>
      <slot name="action"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<template id="settings-presenter-template">
  <div class="settings-presenter">
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
    <div class="content-grid" v-fill-color="fillColor">
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
      <div v-fill-color="fillColor">
        <slot></slot>
      </div>
    </fluent-accordion-item>
  </fluent-accordion>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp, toRaw } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { fillColor, neutralFillInputRest, neutralFillLayerAltRest } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  import { BaseEx } from "https://cdn.jsdelivr.net/npm/base-ex/+esm";
  createApp({
    data() {
      return {
        type: "base64",
        encoded: null,
        decoded: null,
        isFile: false,
        file: null,
        fileName: null,
        showCharsets: false,
        baseEx: new BaseEx(),
        fillColor: neutralFillInputRest
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
        if (this.isFile) {
          const file = this.file;
          if (file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              this.encoded = this.baseEx[this.type].encode(reader.result);
            }
            reader.readAsArrayBuffer(file);
          }
          else {
            this.encoded = '';
          }
        }
        else {
          this.encoded = this.baseEx[this.type].encode(this.decoded);
        }
      },
      decode() {
        if (this.isFile) {
          let name = this.fileName;
          if (!name) {
            name = this.getFileName();
          }
          const file = new File([this.baseEx[this.type].decode(this.encoded)], name);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(file);
          link.download = name;
          link.click();
        }
        else {
          this.decoded = this.baseEx[this.type].decode(this.encoded, "str");
        }
      },
      getFileName() {
        const file = this.file;
        if (file instanceof File) {
          return file.name;
        }
        const date = new Date();
        function padStart(value, total) {
          return value.toString().padStart(total, '0');
        }
        return `whercate_${date.getFullYear()}-${padStart(date.getMonth() + 1, 2)}-${padStart(date.getDate(), 2)}_${padStart(date.getHours(), 2)}-${padStart(date.getMinutes(), 2)}-${padStart(date.getSeconds(), 2)}`
      },
      getSizeString(size) {
        let index = 0;
        while (index <= 11) {
          index++;
          size /= 1024;
          if (size > 0.7 && size < 716.8) { break; }
          else if (size >= 716.8) { continue; }
          else if (size <= 0.7) {
            size *= 1024;
            index--;
            break;
          }
        }
        let str = '';
        switch (index) {
          case 0: str = 'B'; break;
          case 1: str = "KB"; break;
          case 2: str = "MB"; break;
          case 3: str = "GB"; break;
          case 4: str = "TB"; break;
          case 5: str = "PB"; break;
          case 6: str = "EB"; break;
          case 7: str = "ZB"; break;
          case 8: str = "YB"; break;
          case 9: str = "BB"; break;
          case 10: str = "NB"; break;
          case 11: str = "DB"; break;
          default:
            break;
        }
        function toFixed(value) {
          return Math.floor(value * 100) / 100;
        }
        return `${toFixed(size)}${str}`;
      }
    },
    mounted() {
      if (typeof NexT !== "undefined") {
        NexT.utils.registerSidebarTOC();
      }
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
          setDisplay(false);
        }
        else if (typeof solt === "function") {
          let value = solt();
          if (value instanceof Array) {
            const result = value.some(x => {
              if (typeof x === "object") {
                if (typeof x.type === "symbol") {
                  x = x.children;
                  if (typeof x === "string" || x instanceof Array) {
                    return !!x.length;
                  }
                  else {
                    return !!x;
                  }
                }
                else {
                  return true;
                }
              }
              else {
                return false;
              }
            });
            setDisplay(result);
          }
        }
        else if (solt !== binding.oldValue) {
          setDisplay(false);
        }
      }
    }
  ).directive("fill-color",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const color = toRaw(binding.value);
        if (color !== binding.oldValue) {
          fillColor.setValueFor(element, color.getValueFor(element.parentElement));
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
  }).component("input-label", {
    template: "#input-label-template",
    props: {
      label: String
    }
  }).component("settings-presenter", {
    template: "#settings-presenter-template"
  }).component("settings-card", {
    template: "#settings-card-template",
    data() {
      return {
        fillColor: neutralFillInputRest
      }
    }
  }).component("settings-expander", {
    template: "#settings-expander-template",
    props: {
      expanded: String
    },
    data() {
      return {
        fillColor: neutralFillLayerAltRest
      }
    }
  }).mount("#vue-app");
</script>

<style>
  @import 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/Components/Label/FluentInputLabel.razor.css';

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

  #vue-app fluent-select::part(listbox),
  #vue-app fluent-select .listbox {
    max-height: calc(var(--base-height-multiplier) * 30px);
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

  @media (max-width: 767px) {
    #vue-app div.split-view {
      flex-direction: column;
    }
  }

  #vue-app .fluent-inputfile-container {
    display: grid;
    grid-gap: 10px;
    border-radius: calc(var(--control-corner-radius)* 1px);
    background-color: var(--neutral-fill-hover);
    border: 1px dashed var(--accent-fill-rest);
  }

  #vue-app .fluent-inputfile-container .inputfile-content {
    grid-column: 1;
    grid-row: 1;
    text-align: center;
    align-self: center;
    justify-self: center;
  }

  .svg-host {
    display: flex;
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

  .settings-presenter a.text-button {
    font-weight: bold;
    text-decoration: inherit;
  }

  @media (max-width: 600px) {
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

    .settings-nowarp .settings-presenter {
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }

    .settings-nowarp .settings-presenter div.header-panel {
      margin: 0 calc(var(--design-unit) * 6px) 0 0;
    }

    .settings-nowarp .settings-presenter div.content-presenter {
      margin: 0;
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

  .settings-expander {
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

  .settings-expander fluent-accordion-item.expander::part(region),
  .settings-expander fluent-accordion-item.expander .region {
    border-bottom-left-radius: calc((var(--control-corner-radius) - var(--stroke-width)) * 1px);
    border-bottom-right-radius: calc((var(--control-corner-radius) - var(--stroke-width)) * 1px);
  }

  .settings-expander .presenter {
    padding: var(--settings-expander-header-padding);
  }

  .settings-expander div.setting-expander-content-grid {
    padding: var(--settings-expander-item-padding);
  }
</style>