---
title: 小工具
sitemap: false
---
<script type="module">
  import { baseLayerLuminance, StandardLuminance } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/dist/web-components.min.js";
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
  <fluent-accordion>
    <fluent-accordion-item>
      <div slot="heading">
        <settings-presenter style="padding: var(--settings-expander-header-padding);">
          <template #icon>
            <svg-host
              src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/calendar_date_20_regular.svg"></svg-host>
          </template>
          <template #header>
            <h4 class="unset">时间戳转换</h4>
          </template>
          <template #description>
            转换 Unix 时间戳与时间字符串。
          </template>
        </settings-presenter>
      </div>
      <div class="setting-expander-content-grid">
        <div class="stack-vertical">
          <h4 class="unset" style="margin: 0 0 0 2px; font-size: var(--type-ramp-base-font-size);">时间戳转换</h4>
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
            <fluent-switch ref="isMillisecond">时间戳是否为毫秒</fluent-switch>
          </div>
        </div>
      </div>
    </fluent-accordion-item>
  </fluent-accordion>
</div>

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
{% endraw %}

<script type="module">
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  createApp({
    data() {
      return {
        timeStamp: Math.floor(Date.now() / 1000),
        timeString: new Date().toISOString()
      }
    },
    methods: {
      convertTimeStamp() {
        const isMillisecond = this.$refs.isMillisecond.checked;
        const time = Math.floor(isMillisecond ? +this.timeStamp : this.timeStamp * 1000);
        this.timeString = new Date(time).toISOString();
      },
      convertTimeString() {
        const isMillisecond = this.$refs.isMillisecond.checked;
        const time = new Date(this.timeString);
        this.timeStamp = isMillisecond ? time.getTime() : Math.floor(time.getTime() / 1000);
      },
      setDateTimeNow() {
        const time = new Date();
        const isMillisecond = this.$refs.isMillisecond.checked;
        this.timeStamp = isMillisecond ? time.getTime() : Math.floor(time.getTime() / 1000);
        this.timeString = new Date().toISOString();
      },
      valueChanged(oldValue, newValue) {
        console.log(oldValue, newValue);
      }
    }
  }).component("settings-presenter", {
    template: "#settings-presenter-template"
  }).mount("#vue-app");
  if (!customElements.get("svg-host")) {
    async function getSVG(src) {
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
    class svgHost extends HTMLElement {
      static get observedAttributes() {
        return ["src"];
      }
      constructor() {
        super();
        this.isLoaded = false;
      }
      get src() {
        return this.getAttribute("src");
      }
      set src(value) {
        this.setAttribute("src", value);
      }
      connectedCallback() {
        getSVG(this.src).then(svg => this.innerHTML = svg);
        this.isLoaded = true;
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if (!this.isLoaded || oldValue === newValue) { return; }
        switch (name) {
          case "src":
            getSVG(newValue).then(svg => this.innerHTML = svg);
            break;
        }
      }
    }
    customElements.define("svg-host", svgHost);
  }
</script>

<style>
  #vue-app * {
    --settings-card-padding: 16px;
    --settings-expander-header-padding: 4px 0px 4px 8px;
    --settings-expander-item-padding: 0px 36px 0px 50px;
  }

  #vue-app div.root {
    display: flex;
  }

  #vue-app .card {
    display: block;
    contain: content;
    height: var(--card-height, 100%);
    width: var(--card-width, 100%);
    box-sizing: border-box;
    background: var(--fill-color);
    color: var(--neutral-foreground-rest);
    border: calc(var(--stroke-width)* 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--layer-corner-radius)* 1px);
    box-shadow: var(--elevation-shadow-card-rest);
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

  div.setting-expander-content-grid {
    padding: var(--settings-expander-item-padding);
  }
</style>