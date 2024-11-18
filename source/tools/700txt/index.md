---
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentButton,
    fluentProgressRing,
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
      fluentButton(),
      fluentProgressRing(),
      fluentTextField()
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
<div id="vue-app" class="stack-vertical" style="row-gap: 1rem; align-items: stretch;">
  <div class="stack-horizontal" style="column-gap: 3px; justify-content: space-between;">
    <fluent-text-field v-model="page" style="flex: 1;"></fluent-text-field>
    <fluent-button title="获取" @click="() => getContent()" :disabled="isloading">
      <fluent-progress-ring v-if="isloading" style="width: 16px; height: 16px;"></fluent-progress-ring>
      <svg-host v-else src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/arrow_right_16_regular.svg"
        style="fill: currentColor;"></svg-host>
    </fluent-button>
    <fluent-button title="清除" @click="() => clearContent()" :disabled="isloading">
      <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/dismiss_16_regular.svg"
        style="fill: currentColor;"></svg-host>
    </fluent-button>
  </div>
  <div ref="content"></div>
</div>

<template id="svg-host-template">
  <div v-html="innerHTML"></div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  const base = "https://m.700txt.com";
  const proxy = "https://api.allorigins.win/get?url=";
  createApp({
    data() {
      return {
        page: decodeURIComponent(location.hash.substring(1)),
        isloading: false
      }
    },
    methods: {
      async getContent() {
        if (this.isloading) { return; }
        this.isloading = true;
        const content = this.$refs.content;
        if (content instanceof HTMLElement) {
          try {
            let page = this.page.replace(base, '');
            if (!page) { return; }
            location.hash = page;
            async function getContentInner() {
              const html = await fetch(new URL(page, base)).then(x => x.text());
              const dom = new DOMParser().parseFromString(html, "text/html");
              const nr = dom.getElementById("nr");
              const prev_url = dom.getElementById("prev_url");
              let i = prev_url.textContent.trim() === "上一页" ? 1 : 0;
              const childNodes = nr.childNodes;
              for (; i < childNodes.length; i++) {
                content.appendChild(childNodes[i].cloneNode(true));
              }
              const next_url = dom.getElementById("next_url");
              if (next_url) {
                page = next_url.getAttribute("href");
                if (next_url.textContent.trim() === "下一页") {
                  await getContentInner();
                }
              }
            }
            await getContentInner();
            this.page = page;
          }
          catch (ex) {
            console.error(ex);
            content.innerText = ex.toString();
          }
          finally {
            this.isloading = false;
          }
        }
      },
      clearContent() {
        this.$refs.content.innerHTML = '';
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

  .stack-vertical#vue-app,
  #vue-app .stack-vertical {
    display: flex;
    flex-direction: column;
  }

  #vue-app .stack-horizontal {
    display: flex;
    flex-direction: row;
  }
</style>