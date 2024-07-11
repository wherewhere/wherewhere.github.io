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
    fluentCard,
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
      fluentCard(),
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
  <div class="stack-vertical" style="row-gap: 0.3rem;">
    <settings-expander>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/calendar_date_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 class="unset">时间戳转换</h4>
      </template>
      <template #description>
        转换 Unix 时间戳与时间字符串。
      </template>
      <div class="setting-expander-content-grid">
        <div class="stack-vertical">
          <div class="stack-horizontal">
            <fluent-number-field v-model="timeStamp" style="flex: 1;"></fluent-number-field>
            <fluent-button @click="convertTimeStamp">转换时间戳</fluent-button>
          </div>
          <div class="stack-horizontal">
            <fluent-text-field v-model="timeString" style="flex: 1;"></fluent-text-field>
            <fluent-button @click="convertTimeString">转换时间</fluent-button>
          </div>
          <div class="stack-horizontal" style="justify-content: space-between;">
            <fluent-button @click="setDateTimeNow">当前时间</fluent-button>
            <value-change-host v-model="isMillisecond" value-name="current-checked">
              <fluent-switch>时间戳是否为毫秒</fluent-switch>
            </value-change-host>
          </div>
        </div>
      </div>
    </settings-expander>
    <settings-button @click="() => navigate('./markdown')">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/markdown_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 class="unset">Markdown 预览</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/markedjs/marked" target="_blank">Marked.JS</fluent-anchor> 解析并预览 Markdown 文本。
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
        <h4 class="unset">哔哩哔哩卡片</h4>
      </template>
      <template #description>
        使用 <fluent-anchor appearance="hypertext" href="https://github.com/wherewhere/hexo-tag-bilibili-card" target="_blank">bilibili-card</fluent-anchor> 生成哔哩哔哩卡片。
      </template>
      <template #action-icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/chevron_right_12_regular.svg"></svg-host>
      </template>
    </settings-button>
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

<template id="settings-presenter-template">
  <div class="settings-presenter">
    <div class="header-root">
      <div class="icon-holder">
        <slot name="icon"></slot>
      </div>
      <div class="header-panel">
        <span>
          <slot name="header"></slot>
        </span>
        <span class="description">
          <slot name="description"></slot>
        </span>
      </div>
    </div>
    <div class="content-presenter">
      <slot></slot>
    </div>
  </div>
</template>

<template id="settings-button-template">
  <fluent-card class="settings-button" style="cursor: pointer;">
    <div class="content-grid">
      <settings-presenter style="padding: var(--settings-button-padding);">
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
      <div class="action-icon-holder">
        <slot name="action-icon"></slot>
      </div>
    </div>
  </fluent-card>
</template>

<template id="settings-expander-template">
  <fluent-accordion class="settings-expander" style="width: 100%;">
    <fluent-accordion-item>
      <div slot="heading">
        <settings-presenter style="padding: var(--settings-expander-header-padding);">
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
      isMillisecond() {
        this.isMillisecond === "true";
      },
      convertTimeStamp() {
        const isMillisecond = this.isMillisecond();
        const time = Math.floor(isMillisecond ? +this.timeStamp : this.timeStamp * 1000);
        this.timeString = new Date(time).toISOString();
      },
      convertTimeString() {
        const isMillisecond = this.isMillisecond();
        const time = new Date(this.timeString);
        this.timeStamp = isMillisecond ? time.getTime() : Math.floor(time.getTime() / 1000);
      },
      setDateTimeNow() {
        const time = new Date();
        const isMillisecond = this.isMillisecond();
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
    template: "#settings-presenter-template"
  }).component("settings-button", {
    template: "#settings-button-template"
  }).component("settings-expander", {
    template: "#settings-expander-template"
  }).mount("#vue-app");
</script>

<style>
  #vue-app {
    font-family: "Segoe UI Variable", "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }

  #vue-app * {
    --settings-card-padding: 16px;
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
    column-gap: 10px;
    row-gap: 10px;
    width: 100%;
  }

  #vue-app .stack-horizontal {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    column-gap: 10px;
    row-gap: 10px;
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

  #vue-app fluent-accordion-item {
    box-sizing: border-box;
    box-shadow: var(--elevation-shadow-card-rest);
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
    .settings-presenter * {
      --settings-card-content-min-width: auto;
    }

    .settings-presenter div.settings-presenter {
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

  .settings-expander div.setting-expander-content-grid {
    padding: var(--settings-expander-item-padding);
  }
</style>