---
title: 哔哩哔哩卡片
description: 使用 <fluent-anchor appearance="hypertext" href="https://github.com/wherewhere/hexo-tag-bilibili-card"
  target="_blank">bilibili-card</fluent-anchor> 生成哔哩哔哩卡片
sitemap: false
---
<script src="https://cdn.jsdelivr.net/npm/hexo-tag-bilibili-card/components/bilibili-card/bilibili-card.js" data-pjax
  async></script>
<script src="https://cdn.jsdelivr.net/npm/js-beautify/js/lib/beautify-html.js" data-pjax></script>
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
    fluentAnchor,
    fluentButton,
    fluentCombobox,
    fluentOption,
    fluentSelect,
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
      fluentCombobox(),
      fluentOption(),
      fluentSelect(),
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

<style>
  .video-holder a {
    border-bottom: none;
  }
</style>

{% raw %}
<div id="vue-app">
  <div class="stack-vertical" style="row-gap: 0.3rem;">
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/design_ideas_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="bilibili-card-output" class="unset">生成类型</h3>
      </template>
      <template #description>
        选择生成卡片的类型。
      </template>
      <fluent-select placeholder="components" v-model="output"
        style="min-width: calc(var(--base-height-multiplier) * 11.25px);">
        <fluent-option value="components">控件</fluent-option>
        <fluent-option value="html">HTML</fluent-option>
        <fluent-option value="svg" disabled>SVG</fluent-option>
      </fluent-select>
    </settings-card>
    <settings-card>
      <template #icon>
        <svg-host :src="getTypeIcon(type)"></svg-host>
      </template>
      <template #header>
        <h3 id="bilibili-card-type" class="unset">卡片类型</h3>
      </template>
      <template #description>
        选择卡片显示内容的类型。
      </template>
      <fluent-select placeholder="video" v-model="type"
        style="min-width: calc(var(--base-height-multiplier) * 11.25px);">
        <fluent-option v-for="(value, key) in types" :value="key">{{ value }}</fluent-option>
      </fluent-select>
    </settings-card>
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/card_ui_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="bilibili-card-id" class="unset">卡片 ID</h3>
      </template>
      <template #description>
        输入卡片显示的哔哩哔哩{{ types[type] }}的 ID。
      </template>
      <fluent-text-field v-model="id" :placeholder="getExampleID(type)"></fluent-text-field>
    </settings-card>
    <settings-expander expanded="true">
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/database_arrow_down_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="bilibili-card-get-data" class="unset">获取数据</h3>
      </template>
      <template #description>
        从哔哩哔哩获取 JSON 数据。(由于跨域限制无法自动获取信息，请手动在下方填入 JSON 数据)
      </template>
      <div class="setting-expander-content-grid">
        <input-label label="输入 JSON">
          <template #action>
            <div class="stack-horizontal" style="width: unset; column-gap: calc(var(--design-unit) * 1px);">
              <fluent-button title="这个按钮并不能正常使用" :disabled="!id" @click="getApiAsync">自动</fluent-button>
              <fluent-anchor :href="getApiUrl()" target="_blank">手动</fluent-anchor>
            </div>
          </template>
          <fluent-text-area v-model="json" resize="vertical" style="width: 100%;"></fluent-text-area>
        </input-label>
      </div>
    </settings-expander>
    <settings-card>
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/image_arrow_forward_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="bilibili-card-image-proxy" class="unset">图片代理</h3>
      </template>
      <template #description>
        设置封面图片的代理。
      </template>
      <fluent-text-field v-model="imageProxy" placeholder="https://images.weserv.nl/?url="></fluent-text-field>
    </settings-card>
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/tag_multiple_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="bilibili-card-info-types" class="unset">信息类型</h3>
      </template>
      <template #description>
        设置卡片显示信息的类型。(views, danmakus, comments, favorites, coins, likes)
      </template>
      <fluent-text-field v-model="infoTypes" :placeholder="getDefaultInfoTypes(type)"></fluent-text-field>
    </settings-card>
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/color_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="bilibili-card-theme" class="unset">卡片主题</h3>
      </template>
      <template #description>
        选择卡片的主题样式。
      </template>
      <value-change-host v-model="theme" value-name="value" event-name="change" style="display: inherit;">
        <fluent-combobox placeholder="default" style="min-width: unset;">
          <fluent-option title="跟随系统">system</fluent-option>
          <fluent-option title="浅色">light</fluent-option>
          <fluent-option title="深色">dark</fluent-option>
          <fluent-option title="Fluent UI">fluent</fluent-option>
          <fluent-option title="Windose">windose</fluent-option>
        </fluent-combobox>
      </value-change-host>
    </settings-card>
    <div class="settings-card"
      :style="{ paddingTop: 'calc(var(--design-unit) * 4px)', paddingRight: 'calc(var(--design-unit) * 4px)', paddingBottom: example ? 'calc(var(--design-unit) * 4px)' : 'calc(var(--design-unit) * 3px)', paddingLeft: 'calc(var(--design-unit) * 4px)' }">
      <input-label label="预览" v-fill-color="fillColor">
        <template #action>
          <div class="stack-horizontal" style="width: unset; column-gap: calc(var(--design-unit) * 1px);">
            <fluent-button v-show="example" @click="e => onCopyClicked(e, example)">复制代码</fluent-button>
            <fluent-button
              @click="() => createExample(json, imageProxy, id, type, infoTypes, theme)">生成卡片</fluent-button>
          </div>
        </template>
        <div ref="example" v-show="example" style="max-width: 100%;"></div>
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
  import { encodeHTML } from "https://cdn.jsdelivr.net/npm/entities/+esm";
  import { HighlightJS as hljs } from "https://cdn.jsdelivr.net/npm/highlight.js/+esm";
  import message from "https://cdn.jsdelivr.net/npm/hexo-tag-bilibili-card/components/bilibili-card-message/bilibili-card-message.esm.js";
  import builder from "https://cdn.jsdelivr.net/npm/hexo-tag-bilibili-card/components/bilibili-card-builder/bilibili-card-builder.esm.js";
  createApp({
    data() {
      return {
        id: null,
        output: "components",
        type: "video",
        json: null,
        imageProxy: null,
        infoTypes: null,
        theme: null,
        types: {
          video: "视频",
          article: "专栏",
          user: "用户",
          live: "直播",
          bangumi: "番剧",
          audio: "音频",
          dynamic: "动态",
          favorite: "收藏夹",
          album: "相簿"
        },
        example: null,
        fillColor: neutralFillInputRest
      }
    },
    methods: {
      getApiUrl() {
        const id = this.id;
        if (!id) { return null; }
        else { return message.getApi(id, this.type); }
      },
      async getApiAsync() {
        const id = this.id;
        if (!id) { return; }
        json = await fetch(message.getApi(id, this.type))
          .then(x => x.text())
          .catch(ex => ex.toString());
      },
      getTypeIcon(type) {
        switch (type) {
          case "video":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/video_clip_20_regular.svg";
          case "article":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/document_20_regular.svg";
          case "user":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/person_20_regular.svg";
          case "live":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/live_20_regular.svg";
          case "bangumi":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/movies_and_tv_20_regular.svg";
          case "audio":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/music_note_2_20_regular.svg";
          case "dynamic":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/feed_20_regular.svg";
          case "favorite":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/collections_20_regular.svg";
          case "album":
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/album_20_regular.svg";
          default:
            return "https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/presence_unknown_20_regular.svg";
        }
      },
      getExampleID(type) {
        switch (type) {
          case "video":
            return "BV1y54y1a768";
          case "article":
            return "cv8930865";
          case "user":
            return "266112738";
          case "live":
            return "12720436";
          case "bangumi":
            return "md1689";
          case "audio":
            return "au13598";
          case "dynamic":
            return "501590001933778048";
          case "favorite":
            return "1026854530";
          case "album":
            return "99184721";
        }
      },
      getDefaultInfoTypes(type) {
        switch (type) {
          case "video":
            return "views, danmakus";
          case "user":
            return "views, likes";
          case "live":
            return "views";
          case "bangumi":
            return "favorites";
          case "favorite":
            return "views, favorites";
          case "article":
          case "audio":
          case "dynamic":
          case "album":
          default:
            return "views, comments";
        }
      },
      onCopyClicked(event, text) {
        const button = event.target;
        navigator.clipboard.writeText(text)
          .then(() => {
            if (button instanceof HTMLElement) {
              const content = button.innerHTML;
              button.innerText = "已复制";
              setTimeout(() => button.innerHTML = content, 1000)
            }
          });
      },
      createExample(json, imageProxy, id, type, infoTypes, theme) {
        this.updateExample(this.createCard(JSON.parse(json), imageProxy, id, type, infoTypes, theme));
      },
      updateExample(element) {
        const example = this.$refs.example;
        if (example instanceof HTMLElement) {
          if (!element) {
            example.innerHTML = this.example = '';
          }
          else {
            element = html_beautify(element);
            example.innerHTML = this.example = element;
            const pre = document.createElement("pre");
            pre.className = "highlight html language-html";
            pre.style.marginTop = "calc(var(--design-unit) * 1px)";
            pre.style.marginBottom = "unset";
            pre.style.borderRadius = "6px";
            const code = document.createElement("code");
            code.innerHTML = encodeHTML(element);
            pre.appendChild(code);
            example.appendChild(pre);
            hljs.highlightElement(code);
          }
        }
      },
      createCard(token, imageProxy, id, type, infoTypes, theme) {
        if (!token) { return ''; }
        const _message = message.getMessage(type, id, console);
        return this.createElement(imageProxy, infoTypes, _message, theme);
      },
      createElement(imageProxy, infoTypes, { vid, type, title, author, cover, duration, views, danmakus, comments, favorites, coins, likes }, theme) {
        switch (this.output) {
          case "components":
            return builder.createHost(imageProxy, infoTypes, { vid, type, title, author, cover, duration, views, danmakus, comments, favorites, coins, likes }, theme).outerHTML;
          case "html":
            const card = builder.createCardWithTagName("div", imageProxy, infoTypes, { vid, type, title, author, cover, duration, views, danmakus, comments, favorites, coins, likes }, theme);
            if (card instanceof HTMLElement) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = this.getTheme(this.theme || '0');
              card.insertBefore(link, card.firstChild);
              return card.innerHTML;
            }
        }
      },
      getTheme(theme) {
        const baseUrl = "https://cdn.jsdelivr.net/npm/hexo-tag-bilibili-card/components/bilibili-card/bilibili-card";
        switch (theme.toLowerCase()) {
          case '1':
          case "light":
            return `${baseUrl}.light.css`;
          case '2':
          case "dark":
            return `${baseUrl}.dark.css`;
          case '0':
          case "auto":
          case "system":
          case "default":
            return `${baseUrl}.css`;
          case "fd":
          case "fd2":
          case "fluent":
          case "fluentui":
            return `${baseUrl}.fluent.css`;
          case "-1":
          case "none":
            return '';
          default:
            return theme;
        }
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
        else if (solt !== binding.oldValue) {
          if (typeof solt === "function") {
            let value = solt();
            if (value instanceof Array) {
              value = value[0];
              if (typeof value === "object") {
                if (typeof value.type === "symbol") {
                  value = value.children;
                  if (value instanceof Array) {
                    setDisplay(value.length);
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
    cursor: unset;
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