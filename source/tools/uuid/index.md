---
title: UUID 与 GUID
description: 使用 <fluent-anchor appearance="hypertext" href="https://github.com/uuidjs/uuid/"
  target="_blank">uuid</fluent-anchor> 生成 UUID 与 GUID
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
    fluentAnchor,
    fluentButton,
    fluentNumberField,
    fluentOption,
    fluentSelect,
    fluentTab,
    fluentTabPanel,
    fluentTabs,
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
      fluentAnchor(),
      fluentButton(),
      fluentNumberField(),
      fluentOption(),
      fluentSelect(),
      fluentTab(),
      fluentTabPanel(),
      fluentTabs(),
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
  <fluent-tabs>
    <fluent-tab id="generate">
      <h2 id="uuid-generate" class="unset">生成</h2>
    </fluent-tab>
    <fluent-tab-panel id="generatePanel">
      <div class="stack-vertical" style="row-gap: 0.3rem;">
        <settings-card>
          <template #icon>
            <svg-host
              src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/settings_cog_multiple_20_regular.svg"></svg-host>
          </template>
          <template #header>
            <h3 id="uuid-generate-version" class="unset">版本</h3>
          </template>
          <template #description>
            选择 UUID 的版本。
          </template>
          <fluent-select v-model="version" style="min-width: calc(var(--base-height-multiplier) * 25px);">
            <fluent-option value="v1">Version 1 (Timestamp)</fluent-option>
            <fluent-option value="v3">Version 3 (Namespace w/ MD5)</fluent-option>
            <fluent-option value="v4">Version 4 (Random)</fluent-option>
            <fluent-option value="v5">Version 5 (Namespace w/ SHA-1)</fluent-option>
            <fluent-option value="v6">Version 6 (Timestamp, Reordered)</fluent-option>
            <fluent-option value="v7">Version 7 (Unix Epoch time-based)</fluent-option>
            <fluent-option value="v8" disabled>Version 8 (Intentionally left blank)</fluent-option>
          </fluent-select>
        </settings-card>
        <settings-expander v-show="option != null" expanded="true">
          <template #icon>
            <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/rename_20_regular.svg"></svg-host>
          </template>
          <template #header>
            <h3 id="uuid-generate-name" class="unset">名称</h3>
          </template>
          <template #description>
            用于生成 UUID 的命名空间与内容。
          </template>
          <div>
            <settings-card class="default-setting-expander-item">
              <template #header>
                <h4 id="uuid-generate-name-namespace" class="unset">命名空间</h4>
              </template>
              <template #description>
                输入命名空间的 UUID，有 <fluent-anchor :title="getNamespace('DNS')" appearance="hypertext"
                  href="javascript:void(0);" @click="() => option.namespace = getNamespace('DNS')">DNS</fluent-anchor> 和
                <fluent-anchor :title="getNamespace('URL')" appearance="hypertext" href="javascript:void(0);"
                  @click="() => option.namespace = getNamespace('URL')">URL</fluent-anchor>。
              </template>
              <fluent-text-field v-model="option.namespace"></fluent-text-field>
            </settings-card>
            <settings-card class="default-setting-expander-item">
              <template #header>
                <h4 id="uuid-generate-name-content" class="unset">内容</h4>
              </template>
              <template #description>
                输入用于生成 UUID 的内容。
              </template>
              <fluent-text-field v-model="option.name"></fluent-text-field>
            </settings-card>
          </div>
        </settings-expander>
        <settings-card>
          <template #icon>
            <svg-host
              src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/arrow_repeat_all_20_regular.svg"></svg-host>
          </template>
          <template #header>
            <h3 id="uuid-generate-count" class="unset">数量</h3>
          </template>
          <template #description>
            生成 UUID 的个数。
          </template>
          <fluent-number-field v-model="number" min="1"></fluent-number-field>
        </settings-card>
        <div class="settings-card" style="padding: var(--settings-card-padding);">
          <input-label label="UUID" v-fill-color="fillColor">
            <template #action>
              <fluent-button @click="create">生成</fluent-button>
            </template>
            <fluent-text-area :value="uuids.join('\n')" v-attribute:rows="number" resize="vertical" style="width: 100%;"
              readonly></fluent-text-area>
          </input-label>
        </div>
      </div>
    </fluent-tab-panel>
    <fluent-tab id="validate">
      <h2 id="uuid-validate" class="unset">验证</h2>
    </fluent-tab>
    <fluent-tab-panel id="validatePanel">
      <div class="stack-vertical" style="row-gap: 0.3rem;">
        <settings-card>
          <template #icon>
            <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/braces_20_regular.svg"></svg-host>
          </template>
          <template #header>
            <h3 id="uuid-validate-uuid" class="unset">UUID</h3>
          </template>
          <template #description>
            <span>输入要验证的 UUID。</span>
            <span v-if="valid.valid">
              <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/checkmark_circle_16_filled.svg"
                style="fill: var(--success); display: inline; vertical-align: middle;"></svg-host>
              <span v-if="valid.version">版本 v{{ valid.version }}</span>
              <span v-else>未知版本</span>
            </span>
            <span v-else>
              <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/dismiss_circle_16_filled.svg"
                style="fill: var(--error); display: inline; vertical-align: middle;"></svg-host>
              <span>无效的 UUID</span>
            </span>
          </template>
          <fluent-text-field v-model="uuid"></fluent-text-field>
        </settings-card>
        <settings-card v-show="valid.version === 1 || valid.version === 6">
          <template #icon>
            <svg-host
              src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/arrow_repeat_all_20_regular.svg"></svg-host>
          </template>
          <template #header>
            <h3 id="uuid-validate-convert" class="unset">转换</h3>
          </template>
          <template #description>
            <span v-if="valid.version === 1">从 UUID v1 转换至 v6。</span>
            <span v-else-if="valid.version === 6">从 UUID v6 转换回 v1。</span>
          </template>
          <fluent-text-field :value="converted" readonly></fluent-text-field>
        </settings-card>
        <settings-card v-show="valid.valid">
          <template #icon>
            <svg-host
              src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/text_edit_style_20_regular.svg"></svg-host>
          </template>
          <template #header>
            <h3 id="uuid-validate-convert" class="unset">格式化</h3>
          </template>
          <template #description>格式化 UUID。</template>
          <div class="stack-horizontal"
            style="column-gap: calc(var(--design-unit) * 1px); justify-content: space-between;">
            <fluent-text-field :value="format.result" style="flex: 1;" readonly></fluent-text-field>
            <fluent-select v-model="format.type" style="min-width: calc(var(--base-height-multiplier)* 12.5px);">
              <fluent-option value="CLSID">CLSID</fluent-option>
              <fluent-option value="bytes">字节数组</fluent-option>
              <fluent-option value="text">字符串</fluent-option>
            </fluent-select>
          </div>
        </settings-card>
      </div>
    </fluent-tab-panel>
  </fluent-tabs>
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
      <slot name="action"></slot>
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

<template id="settings-expander-template">
  <fluent-accordion class="settings-expander">
    <fluent-accordion-item class="expander" :expanded="expanded">
      <div slot="heading">
        <provide-value name="fillColor" :value="neutralFillInputRest">
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
        </provide-value>
      </div>
      <div v-fill-color="neutralFillLayerAltRest">
        <provide-value name="fillColor" :value="undefined">
          <slot></slot>
        </provide-value>
      </div>
    </fluent-accordion-item>
  </fluent-accordion>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp, computed, toRaw } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { fillColor, neutralFillInputRest, neutralFillLayerAltRest } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  import * as uuid from "https://cdn.jsdelivr.net/npm/uuid/+esm";
  createApp({
    data() {
      return {
        version: "v4",
        option: null,
        number: 1,
        uuids: [],
        uuid: null,
        valid: {
          valid: false,
          version: null,
          array: []
        },
        converted: null,
        format: {
          type: "CLSID",
          result: null
        },
        fillColor: neutralFillInputRest
      }
    },
    watch: {
      version(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.updateOption(newValue);
        }
      },
      uuid(newValue, oldValue) {
        if (newValue !== oldValue) {
          let array = newValue.split(/[{\s,}]/).filter(x => x.length);
          if (array.length) {
            array = array.map(x => +x).filter(x => !isNaN(x));
            if (array.length === 16) {
              const valid = this.valid;
              if (checkArray(array, valid)) {
                const format = this.format;
                valid.array = array;
                if (format.type === "bytes") {
                  format.type = "text";
                }
                else {
                  this.updateFormat(array, format.type);
                }
              }
            }
            else if (array.length === 11) {
              const list = [];
              array.forEach((x, i) => {
                switch (i) {
                  case 0:
                    list.push(x >> 0x18 & 0xFF);
                    list.push(x >> 0x10 & 0xFF);
                    list.push(x >> 0x08 & 0xFF);
                    list.push(x & 0xFF);
                    break;
                  case 1:
                  case 2:
                    list.push(x >> 0x08 & 0xFF);
                    list.push(x & 0xFF);
                    break;
                  default:
                    list.push(x);
                }
              });
              const valid = this.valid;
              if (checkArray(list, valid)) {
                const format = this.format;
                valid.array = list;
                if (format.type === "CLSID") {
                  format.type = "text";
                }
                else {
                  this.updateFormat(list, format.type);
                }
              }
            }
            else {
              const valid = this.valid;
              if (checkValid(newValue, valid)) {
                valid.array = uuid.parse(newValue);
                const format = this.format;
                if (format.type === "text") {
                  format.type = "CLSID";
                }
                else {
                  this.updateFormat(valid.array, format.type);
                }
              }
            }
            function checkArray(array, valid) {
              valid.array = array;
              const str = uuid.stringify(array);
              return checkValid(str, valid);
            }
            function checkValid(str, valid) {
              valid.valid = uuid.validate(str);
              if (valid.valid) {
                valid.version = uuid.version(str);
                switch (valid.version) {
                  case 1:
                    this.converted = uuid.v1ToV6(str);
                    break;
                  case 6:
                    this.converted = uuid.v6ToV1(str);
                    break;
                }
              }
              return valid.valid;
            }
          }
        }
      },
      "format.type"(newValue, oldValue) {
        const valid = this.valid;
        if (newValue !== oldValue && valid.valid) {
          this.updateFormat(valid.array, newValue);
        }
      }
    },
    methods: {
      updateOption(type) {
        switch (type) {
          case "v3":
            this.option = this.option ?? {
              name: "https://www.example.com/",
              namespace: uuid.v3.URL
            };
            break;
          case "v5":
            this.option = this.option ?? {
              name: "https://www.example.com/",
              namespace: uuid.v5.URL
            };
            break;
          default:
            this.option = null;
            break;
        }
      },
      updateFormat(array, type) {
        switch (type) {
          case "CLSID":
            const result = [];
            Array.prototype.forEach.call(array, (x, i) => {
              switch (i) {
                case 0:
                case 4:
                case 6:
                  result.push(`0x${x.toString(16).toUpperCase()}`);
                  break;
                case 1:
                case 2:
                  result.push(x.toString(16).toUpperCase());
                  break;
                case 3:
                case 5:
                  result.push(`${x.toString(16).toUpperCase()}, `);
                  break;
                case 7:
                  result.push(`${x.toString(16).toUpperCase()}, { `);
                  break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                  result.push(`0x${x.toString(16).toUpperCase()}, `);
                  break;
                case 15:
                  result.push(`0x${x.toString(16).toUpperCase()} }`);
                  break;
              }
            });
            this.format.result = result.join('');
            break;
          case "bytes":
            this.format.result = Array.prototype.map.call(array, x => `0x${x.toString(16).toUpperCase()}`).join(", ");
            break;
          case "text":
            this.format.result = uuid.stringify(array).toUpperCase();
            break;
        }
      },
      getNamespace(type) {
        return uuid[this.version][type];
      },
      create() {
        const uuids = [];
        try {
          const version = this.version;
          let create;
          switch (version) {
            case "v3":
            case "v5":
              const { name, namespace } = this.option;
              create = () => uuid[version](name, namespace);
              break;
            default:
              create = uuid[version];
          }
          for (let i = 0; i < this.number; i++) {
            uuids.push(create());
          }
        }
        catch (ex) {
          console.error(ex);
        }
        this.uuids = uuids;
        this.uuid = uuids[0];
      }
    },
    mounted() {
      if (typeof NexT !== "undefined") {
        NexT.utils.registerSidebarTOC();
      }
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
  }).component("settings-expander", {
    template: "#settings-expander-template",
    props: {
      expanded: String
    },
    data() {
      return {
        neutralFillInputRest,
        neutralFillLayerAltRest
      }
    }
  }).mount("#vue-app");
</script>

<style>
  @import 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/Components/Label/FluentInputLabel.razor.css';

  #vue-app {
    --success: #0E700E;
    --error: #BC2F32;
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

  .settings-expander .default-setting-expander-item {
    background: none;
    border: none;
    border-top: 1px solid var(--neutral-stroke-layer-rest);
    border-radius: 0;
    box-shadow: none;
  }

  .settings-expander .default-setting-expander-item:first-child {
    border-top: none;
  }

  .settings-expander .default-setting-expander-item .presenter {
    padding: calc(var(--design-unit) * 2px) calc((var(--base-height-multiplier) + 1 + var(--density)) * var(--design-unit) * 1px) calc(var(--design-unit) * 2px) calc((var(--base-horizontal-spacing-multiplier) * 12 - var(--design-unit) * 1.5) * 1px + var(--type-ramp-base-line-height));
  }

  .settings-expander .default-setting-expander-item:first-child .presenter {
    padding-top: 0;
  }

  .settings-expander .default-setting-expander-item:last-child .presenter {
    padding-bottom: 0;
  }
</style>