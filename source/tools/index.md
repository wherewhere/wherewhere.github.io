---
title: 小工具
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
    fluentSwitch,
    fluentTextField,
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
  <settings-group>
    <template #header>
      <h3 id="render" class="unset">渲染</h3>
    </template>
    <settings-button @click="() => navigate('./markdown')">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/markdown_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="markdown" class="unset">Markdown 预览</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/markedjs/marked"
          target="_blank">Marked.JS</fluent-anchor> 解析并预览 Markdown 文本。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button @click="() => navigate('./bilibili-card')">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/card_ui_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="bilibili-card" class="unset">哔哩哔哩卡片</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/wherewhere/hexo-tag-bilibili-card"
          target="_blank">bilibili-card</fluent-anchor> 生成哔哩哔哩卡片。
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
        <h4 id="timestamp" class="unset">时间戳转换</h4>
      </template>
      <template #description>
        转换 Unix 时间戳与时间字符串。
      </template>
      <div class="setting-expander-content-grid">
        <div class="stack-vertical" style="gap: 10px;">
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
            <value-change-host v-model="isMillisecond" value-name="current-checked">
              <fluent-switch>时间戳是否为毫秒</fluent-switch>
            </value-change-host>
          </div>
        </div>
      </div>
    </settings-expander>
    <settings-button @click="() => navigate('./encoding')">
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/arrow_sync_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="encoding" class="unset">编码&解码</h4>
      </template>
      <template #description>
        编码与解码 HTML、XML、Base64、Unicode 文本。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
    <settings-button @click="() => navigate('./base-x')">
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/number_symbol_square_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="base-x" class="unset">Base X</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/UmamiAppearance/BaseExJS"
          target="_blank">BaseEx</fluent-anchor> 编码与解码 Base1、Base16、Base32、Base64 等文本。
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
  <div v-html="innerHTML"></div>
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

<template id="settings-button-template">
  <div class="settings-button">
    <div class="content-grid">
      <settings-presenter class="presenter" :expanded="expanded">
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
      <div class="action-icon-holder" v-show="showActionIcon">
        <slot name="action-icon"></slot>
      </div>
    </div>
  </div>
</template>

<template id="settings-expander-template">
  <fluent-accordion class="settings-expander" style="width: 100%;">
    <fluent-accordion-item class="expander">
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

<template id="settings-group-template">
  <div class="settings-group" v-show="showHeader || showContent">
    <div class="header-presenter" v-show="showHeader">
      <slot name="header"></slot>
    </div>
    <div class="items-presenter" v-show="showContent">
      <slot></slot>
    </div>
  </div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  function checkSolt(solt) {
    if (typeof solt === "function") {
      let value = solt();
      if (value instanceof Array) {
        value = value[0];
        if (typeof value === "object") {
          if (typeof value.type === "symbol") {
            value = value.children;
            if (value instanceof Array) {
              return value.length > 0;
            }
          }
          else {
            return true;
          }
        }
      }
    }
    return false;
  }
  createApp({
    data() {
      return {
        isMillisecond: "false",
        timeStamp: Math.floor(Date.now() / 1000),
        timeString: new Date().toISOString()
      }
    },
    watch: {
      isMillisecond(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.timeStamp = Math.floor(oldValue === "true" ? this.timeStamp / 1000 : this.timeStamp * 1000);
        }
      }
    },
    methods: {
      navigate(src) {
        location.href = src;
      },
      getIsMillisecond() {
        this.isMillisecond === "true";
      },
      convertTimeStamp() {
        const isMillisecond = this.getIsMillisecond();
        const time = Math.floor(isMillisecond ? +this.timeStamp : this.timeStamp * 1000);
        this.timeString = new Date(time).toISOString();
      },
      convertTimeString() {
        const isMillisecond = this.getIsMillisecond();
        const time = new Date(this.timeString);
        this.timeStamp = isMillisecond ? time.getTime() : Math.floor(time.getTime() / 1000);
      },
      setDateTimeNow() {
        const time = new Date();
        const isMillisecond = this.getIsMillisecond();
        this.timeStamp = isMillisecond ? time.getTime() : Math.floor(time.getTime() / 1000);
        this.timeString = new Date().toISOString();
      }
    }
  }).component("value-change-host", {
    template: "#empty-slot-template",
    props: {
      valueName: String,
      modelValue: String
    },
    emits: ['update:modelValue'],
    watch: {
      valueName(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (typeof this.mutation !== "undefined") {
            this.mutation.disconnect();
            this.mutation = undefined;
            if (newValue) {
              this.registerObserver(newValue);
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
                element.setAttribute(valueName, newValue);
              }
            }
          }
        }
      }
    },
    methods: {
      registerObserver(valueName) {
        const $el = this.$el;
        if ($el instanceof HTMLElement) {
          const element = $el.children[0];
          if (element instanceof HTMLElement) {
            element.setAttribute(valueName, this.modelValue);
            this.mutation = new MutationObserver((mutationsList, observer) => {
              for (const mutation of mutationsList) {
                if (mutation.type === "attributes" && mutation.attributeName === valueName) {
                  const target = mutation.target;
                  if (target instanceof HTMLElement) {
                    const value = target.getAttribute(valueName);
                    this.$emit('update:modelValue', value);
                  }
                }
              }
            }).observe(
              element,
              {
                attributes: true,
                attributeFilter: [this.valueName]
              }
            );
          }
        }
      }
    },
    mounted() {
      const valueName = this.valueName;
      if (valueName) {
        this.registerObserver(valueName);
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
  }).component("settings-button", {
    template: "#settings-button-template",
    data() {
      return {
        showActionIcon: false
      };
    },
    methods: {
      setShowSlots() {
        const slots = this.$slots;
        this.showActionIcon = checkSolt(slots["action-icon"]);
      }
    },
    created() {
      this.setShowSlots();
    },
    beforeUpdate() {
      this.setShowSlots();
    }
  }).component("settings-expander", {
    template: "#settings-expander-template",
    props: {
      expanded: String
    }
  }).component("settings-group", {
    template: "#settings-group-template",
    data() {
      return {
        showHeader: false,
        showContent: false,
      };
    },
    methods: {
      setShowSlots() {
        const slots = this.$slots;
        this.showHeader = checkSolt(slots.header);
        this.showContent = checkSolt(slots.default);
      }
    },
    created() {
      this.setShowSlots();
    },
    beforeUpdate() {
      this.setShowSlots();
    }
  }).mount("#vue-app");
</script>

<style>
  #vue-app {
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    font-weight: var(--font-weight);
    color: var(--neutral-foreground-rest);
  }

  #vue-app * {
    --settings-button-padding: 16px 0 16px 16px;
    --settings-expander-header-padding: 4px 0px 4px 8px;
    --settings-expander-item-padding: 0px 36px 0px 50px;
  }

  #vue-app div.root {
    display: flex;
  }

  #vue-app .stack-vertical {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 100%;
  }

  #vue-app .stack-horizontal {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;
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

  .settings-button {
    cursor: pointer;
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

  .settings-button:hover {
    background: var(--neutral-fill-input-hover);
  }

  .settings-button:active {
    background: var(--neutral-fill-input-active);
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
    width: 32px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    fill: currentColor;
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

  .settings-group {
    width: 100%;
  }

  .settings-group * {
    --body-strong-text-block-font-size: 14px;
  }

  .settings-group div.header-presenter {
    margin: 1rem 0px 6px 1px;
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