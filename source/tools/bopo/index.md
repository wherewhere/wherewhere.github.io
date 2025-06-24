---
title: 注音
description: 使用 <fluent-anchor appearance="hypertext" href="http://cheonhyeong.com/Tools/Times.html#9"
  target="_blank">TH-Times</fluent-anchor> 字体显示注音文本
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentButton,
    fluentSlider,
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
      fluentButton(),
      fluentSlider(),
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
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/local_language_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="bopomofo-content" class="unset">输入</h3>
      </template>
      <template #description>
        输入注音文本。
      </template>
      <fluent-text-field v-model="content"></fluent-text-field>
    </settings-card>
    <input-label class="settings-card" label="显示"
      :style="{ paddingTop: 'calc(var(--design-unit) * 4px)', paddingRight: 'calc(var(--design-unit) * 4px)', paddingBottom: content ? 'calc(var(--design-unit) * 4px)' : 'calc(var(--design-unit) * 3px)', paddingLeft: 'calc(var(--design-unit) * 4px)' }">
      <template #action>
        <value-change-host v-model="fontSize" v-fill-color="fillColor" value-name="value" event-name="change"
          style="display: flex; flex: 1; justify-content: flex-end;">
          <fluent-slider :title="`字体大小 ${fontSize}`" min="14" max="150"
            style="max-width: calc(var(--base-height-multiplier) * 30px); margin: 0 0 -18px 0"></fluent-slider>
        </value-change-host>
      </template>
      <div v-style:font-size="fontSize + 'px'" style="font-family: TH-Times; text-align: center; line-height: 100%;">
        {{ content }}
      </div>
    </input-label>
    <div class="keyboard settings-card" v-resize:height="0.5">
      <div class="keys">
        <div class="key" title="b" @click="clickKey">ㄅ</div>
        <div class="key" title="d" @click="clickKey">ㄉ</div>
        <div class="key" title="上声" @click="clickKey">̌</div>
        <div class="key" title="去声" @click="clickKey">̀</div>
        <div class="key" title="zh" @click="clickKey">ㄓ</div>
        <div class="key" title="阳平" @click="clickKey">́</div>
        <div class="key" title="轻声" @click="clickKey">̇</div>
        <div class="key" title="a" @click="clickKey">ㄚ</div>
        <div class="key" title="ai" @click="clickKey">ㄞ</div>
        <div class="key" title="an" @click="clickKey">ㄢ</div>
      </div>
      <div class="keys">
        <div class="key" title="p" @click="clickKey">ㄆ</div>
        <div class="key" title="t" @click="clickKey">ㄊ</div>
        <div class="key" title="g" @click="clickKey">ㄍ</div>
        <div class="key" title="j" @click="clickKey">ㄐ</div>
        <div class="key" title="ch" @click="clickKey">ㄔ</div>
        <div class="key" title="z" @click="clickKey">ㄗ</div>
        <div class="key" title="i" @click="clickKey">ㄧ</div>
        <div class="key" title="o" @click="clickKey">ㄛ</div>
        <div class="key" title="ei" @click="clickKey">ㄟ</div>
        <div class="key" title="en" @click="clickKey">ㄣ</div>
      </div>
      <div class="keys">
        <div class="key" title="m" @click="clickKey">ㄇ</div>
        <div class="key" title="n" @click="clickKey">ㄋ</div>
        <div class="key" title="k" @click="clickKey">ㄎ</div>
        <div class="key" title="q" @click="clickKey">ㄑ</div>
        <div class="key" title="sh" @click="clickKey">ㄕ</div>
        <div class="key" title="c" @click="clickKey">ㄘ</div>
        <div class="key" title="u" @click="clickKey">ㄨ</div>
        <div class="key" title="e" @click="clickKey">ㄜ</div>
        <div class="key" title="ao" @click="clickKey">ㄠ</div>
        <div class="key" title="ang" @click="clickKey">ㄤ</div>
      </div>
      <div class="keys">
        <div class="key" title="f" @click="clickKey">ㄈ</div>
        <div class="key" title="l" @click="clickKey">ㄌ</div>
        <div class="key" title="h" @click="clickKey">ㄏ</div>
        <div class="key" title="x" @click="clickKey">ㄒ</div>
        <div class="key" title="r" @click="clickKey">ㄖ</div>
        <div class="key" title="s" @click="clickKey">ㄙ</div>
        <div class="key" title="ü" @click="clickKey">ㄩ</div>
        <div class="key" title="ê" @click="clickKey">ㄝ</div>
        <div class="key" title="ou" @click="clickKey">ㄡ</div>
        <div class="key" title="eng" @click="clickKey">ㄥ</div>
      </div>
      <div class="keys">
        <div class="key" title="v" @click="clickKey">ㄪ</div>
        <div class="key" title="m" @click="clickKey">ㆬ</div>
        <div class="key" title="ng" @click="clickKey">ㄫ</div>
        <div class="key" title="gn" @click="clickKey">ㄬ</div>
        <div class="key" title="阴平" @click="clickKey">̄</div>
        <div class="key" title="入声" @click="clickKey">̣</div>
        <div class="key" title="er" @click="clickKey">ㄦ</div>
        <div class="key" title="i" @click="clickKey">ㄭ</div>
        <div class="key" title="ng" @click="clickKey">ㆭ</div>
        <div class="key" title="ong" @click="clickKey">ㆲ</div>
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
{% endraw %}

<script type="module" data-pjax>
  import { createApp, toRaw } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { fillColor, neutralFillInputRest } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  createApp({
    data() {
      return {
        content: "ㄊㄢㄊㄢㄏㄜㄨㄟㄦㄩㄥㄩㄢㄉㄡㄕㄏㄠㄆㄥㄧㄡ！",
        fontSize: 50,
        fillColor: neutralFillInputRest
      };
    },
    methods: {
      clickKey(args) {
        const target = args.target;
        if (target instanceof HTMLElement) {
          this.content += target.innerText;
        }
      }
    },
    mounted() {
      if (typeof NexT !== "undefined") {
        NexT.utils.registerSidebarTOC();
      }
    }
  }).directive("style",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const value = binding.value;
        if (value !== binding.oldValue) {
          element.style[binding.arg] = value;
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
        const color = toRaw(binding.value);
        if (color !== binding.oldValue) {
          fillColor.setValueFor(element, color.getValueFor(element.parentElement));
        }
      }
    }
  ).directive("resize", {
    mounted(element, binding) {
      if (element instanceof HTMLElement) {
        let isHeight;
        switch (binding.arg) {
          case "height":
            isHeight = true;
            break;
          case "width":
            isHeight = false;
            break;
          default:
            return;
        }
        const scale = binding.value;
        if (scale !== binding.oldValue) {
          if (element.resizeObserver instanceof ResizeObserver) {
            this.resizeObserver.disconnect();
          }
          const resizeObserver = isHeight
            ? new ResizeObserver(entries => {
              for (const entry of entries) {
                if (entry.contentBoxSize) {
                  let contentBoxSize = entry.contentBoxSize;
                  if (Array.isArray(contentBoxSize)) {
                    contentBoxSize = contentBoxSize[0];
                  }
                  element.style.height = `${contentBoxSize.inlineSize * scale}px`;
                } else {
                  element.style.height = `${entry.contentRect.width * scale}px`;
                }
              }
            })
            : new ResizeObserver(entries => {
              for (const entry of entries) {
                if (entry.contentBoxSize) {
                  let contentBoxSize = entry.contentBoxSize;
                  if (Array.isArray(contentBoxSize)) {
                    contentBoxSize = contentBoxSize[0];
                  }
                  element.style.width = `${contentBoxSize.blockSize * scale}px`;
                } else {
                  element.style.width = `${entry.contentRect.height * scale}px`;
                }
              }
            });
          resizeObserver.observe(element);
          element.resizeObserver = resizeObserver;
        }
      }
    },
    beforeUnmount(element) {
      if (element instanceof HTMLElement
        && element.resizeObserver instanceof ResizeObserver) {
        element.resizeObserver.disconnect();
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
  }).mount("#vue-app");
</script>

<style>
  @import 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/Components/Label/FluentInputLabel.razor.css';

  @font-face {
    font-family: TH-Times;
    src: local('TH-Times'), url('https://fmnijk.github.io/font/TH-Times.ttf') format('truetype');
  }

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

  #vue-app .keyboard {
    display: flex;
    user-select: none;
    flex-direction: column;
    padding: calc(var(--design-unit)* 2px);
  }

  #vue-app .keys {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
  }

  #vue-app .keys div {
    flex: 1;
    display: flex;
    font-size: calc(3vw);
    line-height: 100%;
    justify-content: center;
    align-items: center;
    padding: calc(var(--design-unit)* 2px);
  }

  #vue-app .key {
    cursor: pointer;
    border-radius: calc(var(--control-corner-radius)* 1px);
    background: var(--neutral-fill-stealth-rest-on-neutral-fill-layer-rest);
  }

  #vue-app .key:hover {
    background: var(--neutral-fill-stealth-hover-on-neutral-fill-layer-rest);
  }

  #vue-app .key:active {
    background: var(--neutral-fill-stealth-active-on-neutral-fill-layer-rest);
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
</style>