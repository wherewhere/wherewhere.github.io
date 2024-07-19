---
title: 正则表达式
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
    fluentButton,
    fluentSwitch,
    fluentTextArea,
    fluentTextField,
    baseLayerLuminance,
    StandardLuminance
  } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  provideFluentDesignSystem()
    .register(
      fluentAccordion(),
      fluentAccordionItem(),
      fluentButton(),
      fluentSwitch(),
      fluentTextArea(),
      fluentTextField()
    );
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
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/code_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="regex-code" class="unset">表达式</h4>
      </template>
      <template #description>
        输入正则表达式。
      </template>
      <div class="stack-horizontal" style="column-gap: 4px; justify-content: space-between;">
        <fluent-text-field v-model="code" style="flex: 1;"></fluent-text-field>
        <fluent-button @click="() => match()">匹配</fluent-button>
      </div>
    </settings-card>
    <settings-expander>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/options_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="regex-option" class="unset">标志</h4>
      </template>
      <template #description>
        设置正则表达式标志。
        <code ref="option">
          <span v-if="option.global">g</span>
          <span v-if="option.ignoreCase">i</span>
          <span v-if="option.multiline">m</span>
          <span v-if="option.dotAll">s</span>
          <span v-if="option.unicode">u</span>
          <span v-if="option.unicodeSets">v</span>
          <span v-if="option.sticky">y</span>
        </code>
      </template>
      <div>
        <settings-card class="default-setting-expander-item settings-nowarp">
          <template #header>
            <h5 id="regex-global" class="unset">全局匹配：<code>g</code></h5>
          </template>
          <template #description>
            找到所有的匹配，而不是在第一个匹配之后停止。
          </template>
          <value-change-host v-model="option.global" value-name="checked" event-name="change">
            <fluent-switch></fluent-switch>
          </value-change-host>
        </settings-card>
        <settings-card class="default-setting-expander-item settings-nowarp">
          <template #header>
            <h5 id="regex-ignore-case" class="unset">忽略大小写：<code>i</code></h5>
          </template>
          <template #description>
            如果 <code>c</code> 标志也被启用，使用 Unicode 大小写折叠。
          </template>
          <value-change-host v-model="option.ignoreCase" value-name="checked" event-name="change">
            <fluent-switch></fluent-switch>
          </value-change-host>
        </settings-card>
        <settings-card class="default-setting-expander-item settings-nowarp">
          <template #header>
            <h5 id="regex-multiline" class="unset">多行匹配：<code>m</code></h5>
          </template>
          <template #description>
            将开始和结束字符 (<code>^</code> and <code>$</code>) 视为在多行上工作。换句话说，匹配每一行的开头或结尾 <em>each</em> line
            (由 <code>\n</code> 或者 <code>\r</code> 分隔)，而不仅仅是整个输入字符串的开头或结尾。
          </template>
          <value-change-host v-model="option.multiline" value-name="checked" event-name="change">
            <fluent-switch></fluent-switch>
          </value-change-host>
        </settings-card>
        <settings-card class="default-setting-expander-item settings-nowarp">
          <template #header>
            <h5 id="regex-dotAll" class="unset">点号匹配所有字符：<code>s</code></h5>
          </template>
          <template #description>
            允许 <code>.</code> 去匹配新的行。
          </template>
          <value-change-host v-model="option.dotAll" value-name="checked" event-name="change">
            <fluent-switch></fluent-switch>
          </value-change-host>
        </settings-card>
        <settings-card class="default-setting-expander-item settings-nowarp">
          <template #header>
            <h5 id="regex-unicode" class="unset">Unicode: <code>u</code></h5>
          </template>
          <template #description>
            Treat <code>pattern</code> as a sequence of Unicode code points.
          </template>
          <value-change-host v-model="option.unicode" value-name="checked" event-name="change">
            <fluent-switch></fluent-switch>
          </value-change-host>
        </settings-card>
        <settings-card class="default-setting-expander-item settings-nowarp">
          <template #header>
            <h5 id="regex-unicodeSets" class="unset">Unicode Sets: <code>v</code></h5>
          </template>
          <template #description>
            An upgrade to the <code>u</code> flag that enables set notation in character classes as well as properties
            of strings.
          </template>
          <value-change-host v-model="option.unicodeSets" value-name="checked" event-name="change">
            <fluent-switch></fluent-switch>
          </value-change-host>
        </settings-card>
        <settings-card class="default-setting-expander-item settings-nowarp">
          <template #header>
            <h5 id="regex-sticky" class="unset">粘性匹配：<code>y</code></h5>
          </template>
          <template #description>
            Matches only from the index indicated by the <code>lastIndex</code> property of this regular expression
            in the target string. Does not attempt to match from any later indexes.
          </template>
          <value-change-host v-model="option.sticky" value-name="checked" event-name="change">
            <fluent-switch></fluent-switch>
          </value-change-host>
        </settings-card>
      </div>
    </settings-expander>
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/arrow_repeat_all_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="regex-replace" class="unset">替换</h4>
      </template>
      <template #description>
        测试字符串替换。
      </template>
      <div class="stack-horizontal" style="column-gap: 4px; justify-content: space-between;">
        <fluent-text-field v-model="replacement" style="flex: 1;"></fluent-text-field>
        <fluent-button @click="() => replace()">替换</fluent-button>
      </div>
    </settings-card>
    <div class="split-view">
      <input-label class="split-content" label="要匹配的内容" style="flex: 1;">
        <fluent-text-area v-model="text" resize="vertical" style="width: 100%;"></fluent-text-area>
      </input-label>
      <input-label class="split-content" label="匹配结果" style="flex: 1;">
        <fluent-text-area :value="getResult()" resize="vertical" style="width: 100%;" readonly></fluent-text-area>
      </input-label>
    </div>
  </div>
</div>

<template id="empty-slot-template">
  <div>
    <slot></slot>
  </div>
</template>

<template id="svg-host-template">
  <div v-html="innerHTML"></div>
</template>

<template id="input-label-template">
  <div class="input-label">
    <div class="fluent-input-label">
      <label>
        {{ label }}
      </label>
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
  import * as yaml from "https://cdn.jsdelivr.net/npm/js-yaml/+esm";
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
        code: null,
        text: null,
        replacement: null,
        result: null,
        option: {
          indices: false,
          global: true,
          ignoreCase: false,
          multiline: false,
          dotAll: false,
          unicode: false,
          unicodeSets: false,
          sticky: false
        }
      }
    },
    methods: {
      match() {
        try {
          const option = this.$refs.option.innerText.trim();
          const regex = new RegExp(this.code, option || undefined);
          this.result = regex.exec(this.text);
        }
        catch (ex) {
          console.error(ex);
          this.result = null;
        }
      },
      replace() {
        try {
          const option = this.$refs.option.innerText.trim();
          const regex = new RegExp(this.code, option || undefined);
          this.result = this.text.replace(regex, this.replacement);
        }
        catch (ex) {
          console.error(ex);
          this.result = null;
        }
      },
      getResult() {
        const result = this.result;
        if (result instanceof Array) {
          return yaml.dump({
            results: result,
            groups: result.groups,
            indices: result.indices
          });
        }
        return result;
      }
    }
  }).component("value-change-host", {
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
    border: calc(var(--stroke-width)* 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--layer-corner-radius)* 1px);
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

    .settings-nowarp .settings-presenter {
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }

    .settings-nowarp .settings-presenter div.header-panel {
      margin: 0px 24px 0px 0px;
    }

    .settings-nowarp .settings-presenter div.content-presenter {
      margin: unset;
    }
  }

  .settings-card {
    display: block;
    height: var(--card-height, 100%);
    width: var(--card-width, 100%);
    box-sizing: border-box;
    background: var(--neutral-fill-input-rest);
    color: var(--neutral-foreground-rest);
    border: calc(var(--stroke-width)* 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--layer-corner-radius)* 1px);
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

  .settings-expander * {
    --settings-expander-item-border-thickness: 0px 1px 0px 0px;
  }

  .settings-expander fluent-accordion-item.expander {
    box-sizing: border-box;
    box-shadow: var(--elevation-shadow-card-rest);
  }

  .settings-expander .presenter {
    padding: var(--settings-expander-header-padding);
  }

  .settings-expander .default-setting-expander-item {
    background: unset;
    border: unset;
    border-top: 1px solid var(--neutral-stroke-layer-rest);
    border-radius: unset;
    box-shadow: unset;
  }

  .settings-expander .default-setting-expander-item:first-child {
    border-top: unset;
  }

  .settings-expander .default-setting-expander-item .presenter {
    padding: 8px 36px 8px 50px;
  }

  .settings-expander div.setting-expander-content-grid {
    padding: var(--settings-expander-item-padding);
  }
</style>