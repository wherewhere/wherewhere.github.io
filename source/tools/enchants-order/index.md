---
title: 附魔排序
description: 使用 <fluent-anchor appearance="hypertext" href="https://github.com/wherewhere/Enchants-Order"
  target="_blank">Enchants-Order</fluent-anchor> 获取最佳附魔顺序
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
    fluentButton,
    fluentCombobox,
    fluentNumberField,
    fluentOption,
    fluentProgressRing,
    fluentSelect,
    fluentSwitch,
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
      fluentCombobox(),
      fluentNumberField(),
      fluentOption(),
      fluentProgressRing(),
      fluentSelect(),
      fluentSwitch()
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
  <div class="stack-vertical">
    <settings-group>
      <settings-card>
        <template #icon>
          <svg-host
            src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/local_language_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h2 id="global-lang" class="unset">语言</h2>
        </template>
        <template #description>
          选择您想使用的语言。
        </template>
        <fluent-select placeholder="选择语言" v-model="locale"
          style="min-width: calc(var(--base-height-multiplier) * 23px);">
          <fluent-option value="zh-CN">中文 (中国)</fluent-option>
          <fluent-option value="en-US">English (United States)</fluent-option>
        </fluent-select>
      </settings-card>
    </settings-group>
    <settings-group>
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2 id="object" class="unset">目标物品</h2>
          <div v-if="usePresets" class="text-button" title="获取结果" type="button" style="padding: 4px;"
            @click="listItemEnchantsAsync" :disabled="loading">
            <fluent-progress-ring v-if="loading" style="width: 12px; height: 12px;"></fluent-progress-ring>
            <svg-host v-else
              src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/triangle_right_12_filled.svg"></svg-host>
          </div>
        </div>
      </template>
      <settings-card class="settings-nowarp">
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/database_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 id="object-switch" class="unset">使用预设</h3>
        </template>
        <template #description>
          切换是否使用预设物品。
        </template>
        <value-change-host v-model="usePresets" value-name="checked" event-name="change">
          <fluent-switch>
            {{ usePresets ? "开" : "关" }}
          </fluent-switch>
        </value-change-host>
      </settings-card>
      <settings-card>
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/bug_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 id="object-penalty" class="unset">初始惩罚</h3>
        </template>
        <template #description>
          设置您想要附魔的物品的初始惩罚。
        </template>
        <fluent-number-field v-model="initialPenalty" min="0"></fluent-number-field>
      </settings-card>
      <settings-card v-show="usePresets">
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/box_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 id="object-select" class="unset">选择物品</h3>
        </template>
        <template #description>
          通过名称选择目标物品。
        </template>
        <fluent-select placeholder="选择物品" v-model="item" style="min-width: calc(var(--base-height-multiplier) * 26px);">
          <fluent-option v-for="item in items" :value="item">{{ item }}</fluent-option>
        </fluent-select>
      </settings-card>
    </settings-group>
    <settings-group v-show="!usePresets">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2 id="enchantment" class="unset">添加附魔</h2>
          <div class="text-button" title="添加" type="button" style="padding: 2px;" @click="addEnchantment"
            :disabled="!enchantment.name">
            <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/add_16_regular.svg"></svg-host>
          </div>
        </div>
      </template>
      <settings-card>
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/rename_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 id="enchantment-name" class="unset">附魔</h3>
        </template>
        <template #description>
          通过名称选择目标附魔。
        </template>
        <value-change-host v-model="enchantment.name" value-name="value" event-name="change" style="display: inherit;">
          <fluent-combobox placeholder="选择附魔" autocomplete="both" style="min-width: 0;">
            <fluent-option v-for="enchantment in enchantments">
              {{ enchantment.name }}
            </fluent-option>
          </fluent-combobox>
        </value-change-host>
      </settings-card>
      <settings-card>
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/trophy_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 id="enchantment-level" class="unset">等级</h3>
        </template>
        <template #description>
          设置目标附魔的等级。
        </template>
        <fluent-number-field v-model="enchantment.level" min="1"></fluent-number-field>
      </settings-card>
      <settings-card>
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/scales_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 id="enchantment-weight" class="unset">权重</h3>
        </template>
        <template #description>
          设置目标附魔的权重。如果您不确定它是什么，请<b>不要更改</b>。
        </template>
        <fluent-number-field v-model="enchantment.weight" min="1"></fluent-number-field>
      </settings-card>
    </settings-group>
    <settings-group v-show="!usePresets && wantedList.length">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h2 id="wanted" class="unset">附魔列表</h2>
          <div class="text-button" title="排序" type="button" style="padding: 4px;" @click="orderingWantListAsync"
            :disabled="!wantedList.length || loading">
            <fluent-progress-ring v-if="loading" style="width: 12px; height: 12px;"></fluent-progress-ring>
            <svg-host v-else
              src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/triangle_right_12_filled.svg"></svg-host>
          </div>
        </div>
      </template>
      <settings-card class="settings-nowarp" v-for="item in wantedList">
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/book_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 class="unset">{{ item.name }}</h3>
        </template>
        <template #description>
          等级: {{ item.level }} | 权重: {{ item.weight }} | 经验: {{ item.level * item.weight }}
        </template>
        <div class="text-button" title="移除" type="button" style="padding: 8px;" @click="removeEnchantment(item)">
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/delete_16_regular.svg"></svg-host>
        </div>
      </settings-card>
    </settings-group>
    <settings-group v-show="results.length">
      <template #header>
        <h2 id="results" class="unset">结果</h2>
      </template>
      <settings-expander v-for="result in results" expanded="true">
        <template #icon>
          <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/script_20_regular.svg"></svg-host>
        </template>
        <template #header>
          <h3 class="unset">总经验等级: {{ result.TotalExperience }}</h3>
        </template>
        <template #description>
          惩罚等级: {{ result.Penalty }} | 最高所需等级: {{ result.MaxExperience }}
        </template>
        <div class="setting-expander-content-grid" style="font-family: var(--font-monospace);">
          <pre class="unset">{{ readSteps(result.Steps) }}</pre>
        </div>
      </settings-expander>
    </settings-group>
  </div>
</div>

<template id="empty-template">
  <slot></slot>
</template>

<template id="empty-slot-template">
  <div>
    <slot></slot>
  </div>
</template>

<template id="svg-host-template">
  <div class="svg-host" v-html="innerHTML"></div>
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

<template id="settings-group-template">
  <div class="settings-group">
    <div class="header-presenter" v-check-solt="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="items-presenter" v-check-solt="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { dotnet } from "https://wherewhere.github.io/Enchants-Order/_framework/dotnet.js";
  import { createApp, computed, toRaw } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { fillColor, neutralFillInputRest, neutralFillLayerAltRest } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  createApp({
    data() {
      return {
        locker: {
          resolves: [],
          reference: 0,
          async await() {
            return new Promise(resolve => {
              if (this.reference++ <= 0) {
                resolve();
              }
              else {
                this.resolves.push(resolve);
              }
            });
          },
          release() {
            if (--this.reference > 0) {
              this.resolves.pop()();
            }
          }
        },
        exports: null,
        isInitDotnet: false,
        lang: null,
        enchantments: [],
        initialPenalty: 0,
        enchantment: {
          name: null,
          level: 1,
          weight: 1
        },
        loading: false,
        usePresets: false,
        items: [],
        item: null,
        wantedList: [],
        results: [],
        locale: (() => {
          const supportLanguages = ["en-US", "zh-CN"];
          const supportLanguageCodes =
            [
              ["en", "en-au", "en-ca", "en-gb", "en-ie", "en-in", "en-nz", "en-sg", "en-us", "en-za", "en-bz", "en-hk", "en-id", "en-jm", "en-kz", "en-mt", "en-my", "en-ph", "en-pk", "en-tt", "en-vn", "en-zw", "en-053", "en-021", "en-029", "en-011", "en-018", "en-014"],
              ["zh-Hans", "zh-cn", "zh-hans-cn", "zh-sg", "zh-hans-sg"]
            ];
          const fallbackLanguage = "en-US";
          const languages = navigator.languages || [navigator.language || fallbackLanguage];
          for (const lang of languages) {
            const temp = supportLanguageCodes.findIndex(codes => codes.some(x => x === lang.toLowerCase()));
            if (temp !== -1) {
              return supportLanguages[temp];
            }
          }
          return fallbackLanguage;
        })()
      }
    },
    watch: {
      "locale"(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.initializeEnchantmentsAsync();
        }
      },
      "enchantment.name"(newValue, oldValue) {
        if (newValue !== oldValue) {
          const enchantment = this.enchantments.find(x => x.name === newValue);
          if (enchantment) {
            this.enchantment = { ...enchantment };
          }
        }
      }
    },
    methods: {
      async initDotNetAsync() {
        if (!this.isInitDotnet) {
          await this.locker.await();
          if (!this.isInitDotnet) {
            const fetch = globalThis.fetch;
            globalThis.fetch = (input, init) => {
              if (typeof init === "object") {
                init.credentials = undefined;
              }
              return fetch(input, init);
            };
            const { getAssemblyExports, getConfig } = await dotnet.create();
            globalThis.fetch = fetch;
            const config = getConfig();
            const exports = await getAssemblyExports(config.mainAssemblyName);
            this.exports = exports.Exports;
          }
          this.locker.release();
          this.isInitDotnet = true;
        }
      },
      async initializeEnchantmentsAsync() {
        try {
          this.loading = true;
          const enchantments = [];
          const json = await new Promise(async (resolve, reject) => {
            try {
              const json = await fetch(`https://wherewhere.github.io/Enchants-Order/content/enchants/Enchants.${this.locale}.json`).then(x => x.json());
              resolve(json);
            }
            catch (ex) {
              console.warn(ex);
              const json = await fetch(`https://cdn.jsdelivr.net/gh/wherewhere/Enchants-Order@main/EnchantsOrder/EnchantsOrder.Demo/Assets/Enchants/Enchants.${this.$i18n.locale}.json`).then(x => x.json()).catch(reject);
              resolve(json);
            }
          });
          for (const name in json) {
            const enchantment = json[name];
            enchantments.push({
              name,
              level: enchantment.levelMax,
              weight: enchantment.weight,
              hidden: enchantment.hidden,
              items: enchantment.items,
              incompatible: enchantment.incompatible,
              get experience() {
                return this.level * this.weight;
              }
            });
          }
          this.enchantments = enchantments;
          const items = enchantments.slice().sort((a, b) => b.items.length - a.items.length)[0].items;
          this.items = items;
          this.item = items[0];
        }
        finally {
          this.loading = false;
        }
      },
      addEnchantment() {
        const enchantment = this.enchantment;
        if (enchantment.name) {
          const temp = { ...enchantment };
          temp.level = +temp.level;
          temp.weight = +temp.weight;
          this.wantedList.push(temp);
        }
      },
      removeEnchantment(item) {
        if (item) {
          const wantedList = this.wantedList;
          const index = wantedList.indexOf(item);
          if (index > -1) {
            wantedList.splice(index, 1);
          }
        }
      },
      readSteps(steps) {
        function getRomanNumber(num, maxValue = 2000) {
          if (num > maxValue) { return num.toString(); }
          const arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
          const roman = ['M', "CM", 'D', "CD", 'C', "XC", 'L', "XL", 'X', "IX", 'V', "IV", 'I'];
          let i = 0;
          let result = '';
          while (num > 0) {
            while (num >= arabic[i]) {
              num -= arabic[i];
              result += roman[i];
            }
            i++;
          }
          return result;
        }
        function readEnchantment(enchantment) {
          return `${enchantment.Name} ${getRomanNumber(enchantment.Level)}`;
        }
        const that = this;
        function readStep(step, index) {
          const builder = [];
          builder.push(`步骤 ${index}:`);
          const count = step.length;
          const half = Math.floor(count / 2);
          for (let i = half; i > 0; i--) {
            const flag = count === 2;
            const idx = (half * 2) - (i * 2);
            builder.push(
              ` ${flag ? '' : '('}${readEnchantment(step[idx])} + ${readEnchantment(step[idx + 1])}${flag ? '' : ')'}${idx + 2 === count ? '' : " +"}`
            );
          }
          if (count % 2 === 1) {
            builder.push(` ${readEnchantment(step[step.length - 1])}`);
          }
          return builder.join('');
        }
        return steps.map((x, i) => readStep(x, i + 1)).join('\n');
      },
      async listItemEnchantsAsync() {
        try {
          this.loading = true;
          const text = this.item;
          const enchantments = this.enchantments.filter(x => !x.hidden && x.items.some(i => i === text));
          if (enchantments.length) {
            const group = [];
            while (enchantments.length) {
              const enchantment = enchantments[0];
              let list = [enchantment];
              enchantments.splice(0, 1);
              if (enchantment.incompatible && enchantment.incompatible.length) {
                for (let i = enchantments.length; --i >= 0;) {
                  const temp = enchantments[i];
                  if (temp.incompatible && temp.incompatible.some(x => x === enchantment.name)) {
                    list.push(temp);
                    enchantments.splice(i, 1);
                  }
                }
                if (list.length) {
                  const tempList = [];
                  while (list.length) {
                    const temp = list[0];
                    list.splice(0, 1);
                    const temps = list.filter(x => x.level === temp.level && x.weight === temp.weight);
                    if (temps.length) {
                      const array = [...temps, temp].sort((a, b) => a.name.localeCompare(b.name));
                      tempList.push({
                        enchantments: array,
                        get level() {
                          return this.enchantments[0].level;
                        },
                        get weight() {
                          return this.enchantments[0].weight;
                        },
                        get name() {
                          return this.enchantments.map(x => x.name).join('/');
                        }
                      });
                      for (const enchantmentTemp of array) {
                        const idx = list.indexOf(enchantmentTemp);
                        if (idx > -1) { list.splice(idx, 1); }
                      }
                    }
                    else {
                      tempList.push([temp]);
                    }
                  }
                  list = tempList;
                }
              }
              group.push(list.flat());
            }
            function getAllEnchantmentPaths(group) {
              const result = [];
              function growing(depth, path) {
                if (depth === group.length) {
                  result.push([...path]);
                  return;
                }
                const next = depth + 1;
                for (const enchantment of group[depth]) {
                  path.push(enchantment);
                  growing(next, path);
                  path.pop();
                }
              }
              growing(0, []);
              return result;
            }
            const results = [];
            for (const list of getAllEnchantmentPaths(group)) {
              try {
                results.push(await this.orderingAsync(list, this.initialPenalty));
              }
              catch (ex) {
                console.warn(ex);
              }
            }
            this.results = results;
          }
        }
        finally {
          this.loading = false;
        }
      },
      async orderingWantListAsync() {
        try {
          this.loading = true;
          const wantedList = this.wantedList;
          if (wantedList.length) {
            this.results = [await this.orderingAsync(wantedList, this.initialPenalty)];
          }
        }
        finally {
          this.loading = false;
        }
      },
      async orderingAsync(wantedList, initialPenalty) {
        await this.initDotNetAsync();
        return this.exports.Ordering(wantedList, +initialPenalty);
      }
    },
    mounted() {
      this.initializeEnchantmentsAsync();
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
  }).component("value-change-host", {
    template: "#empty-slot-template",
    props: {
      valueName: String,
      eventName: String,
      modelValue: undefined
    },
    emits: ["update:modelValue"],
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
              this.$emit("update:modelValue", element[valueName]);
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
          this.$emit("update:modelValue", target[this.valueName]);
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
  }).component("settings-group", {
    template: "#settings-group-template"
  }).mount("#vue-app");
</script>

<style>
  #vue-app {
    --font-monospace: "Cascadia Code NF", "Cascadia Code PL", "Cascadia Code", "Cascadia Next SC", "Cascadia Next TC", "Cascadia Next JP", Consolas, "Courier New", "Liberation Mono", SFMono-Regular, Menlo, Monaco, monospace;
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
  #vue-app fluent-combobox::part(listbox),
  #vue-app fluent-select .listbox,
  #vue-app fluent-combobox .listbox {
    max-height: calc(var(--base-height-multiplier) * 30px);
  }

  pre.unset {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
    white-space: pre-wrap;
    background: none;
  }

  .text-button {
    fill: currentColor;
    border-radius: calc(var(--control-corner-radius) * 1px);
  }

  .text-button:hover {
    background: var(--neutral-fill-input-hover);
  }

  .text-button:active {
    background: var(--neutral-fill-input-active);
  }

  .text-button[disabled="true"] {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);
  }

  .text-button[disabled="true"]:active {
    background: none;
  }

  .svg-host {
    display: flex;
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
    text-decoration: default;
  }

  @media (max-width: 640px) {
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

  .settings-group {
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