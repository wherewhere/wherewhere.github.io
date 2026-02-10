---
title: Hash 加密
description: 使用 <fluent-anchor appearance="hypertext" href="https://github.com/Daninet/hash-wasm/"
  target="_blank">hash-wasm</fluent-anchor> 进行 MD5、Sha1、Sha2、Sha3、Bcrypt 等文本加密
sitemap: false
---
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
    fluentButton,
    fluentNumberField,
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
      fluentNumberField(),
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
        <h3 id="crypto-type" class="unset">加密类型</h3>
      </template>
      <template #description>
        选择加密的类型。
      </template>
      <fluent-select v-model="type" style="min-width: calc(var(--base-height-multiplier) * 15.625px);">
        <fluent-option value="adler32">Adler-32</fluent-option>
        <fluent-option value="blake2b">BLAKE2b</fluent-option>
        <fluent-option value="blake2s">BLAKE2s</fluent-option>
        <fluent-option value="blake3">BLAKE3</fluent-option>
        <fluent-option value="crc32">CRC32</fluent-option>
        <fluent-option value="crc32c">CRC32C</fluent-option>
        <fluent-option value="keccak">Keccak</fluent-option>
        <fluent-option value="md2">MD2</fluent-option>
        <fluent-option value="md4">MD4</fluent-option>
        <fluent-option value="md5">MD5</fluent-option>
        <fluent-option value="ripemd160">RIPEMD-160</fluent-option>
        <fluent-option value="sha1">SHA-1</fluent-option>
        <fluent-option value="sha2">SHA-2</fluent-option>
        <fluent-option value="sha3">SHA-3</fluent-option>
        <fluent-option value="sm3">SM3</fluent-option>
        <fluent-option value="whirlpool">Whirlpool</fluent-option>
        <fluent-option value="xxhash32">xxHash32</fluent-option>
        <fluent-option value="xxhash64">xxHash64</fluent-option>
        <fluent-option value="xxhash3">xxHash3</fluent-option>
        <fluent-option value="xxhash128">xxHash128</fluent-option>
        <fluent-option value="scrypt">Scrypt</fluent-option>
        <fluent-option value="argon2i">Argon2i</fluent-option>
        <fluent-option value="argon2d">Argon2d</fluent-option>
        <fluent-option value="argon2id">Argon2id</fluent-option>
        <fluent-option value="bcrypt">Bcrypt</fluent-option>
      </fluent-select>
    </settings-card>
    <settings-card v-show="typeof option.bits !== 'undefined'">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/code_circle_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="crypto-bit" class="unset">Bit 位</h3>
      </template>
      <template #description>
        选择加密的类型。
      </template>
      <fluent-select v-if="option.isEnum" v-model="option.bits" style="min-width: 0;">
        <fluent-option value="224">224</fluent-option>
        <fluent-option value="256">256</fluent-option>
        <fluent-option value="384">384</fluent-option>
        <fluent-option value="512">512</fluent-option>
      </fluent-select>
      <fluent-number-field v-else v-model="option.bits"></fluent-number-field>
    </settings-card>
    <settings-card v-show="typeof option.key !== 'undefined'">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/key_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="crypto-key" class="unset">Key</h3>
      </template>
      <template #description>
        输入加密的钥匙。<span v-if="type === 'blake3'">(必须 32 字节长)</span>
      </template>
      <fluent-text-field v-model="option.key"></fluent-text-field>
    </settings-card>
    <settings-expander v-show="typeof option.seed !== 'undefined'" expanded="true">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/tree_deciduous_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="crypto-seed" class="unset">Seed</h3>
      </template>
      <template #description>
        输入加密种子。
      </template>
      <div class="setting-expander-content-grid stack-vertical" style="align-items: stretch;">
        <div v-if="typeof option.seed === 'object'" class="stack-vertical"
          style="gap: calc(var(--base-horizontal-spacing-multiplier) * 1px); align-items: stretch;">
          <fluent-number-field v-model="option.seed.low">Low</fluent-number-field>
          <fluent-number-field v-model="option.seed.high">High</fluent-number-field>
        </div>
        <fluent-text-field v-else v-model="option.seed"></fluent-text-field>
      </div>
    </settings-expander>
    <settings-card v-show="typeof option.salt !== 'undefined'">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/cube_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="crypto-salt" class="unset">Salt</h3>
      </template>
      <template #description>
        <span>输入加密的盐。</span>
        <span v-if="type.startsWith('argon')">(至少 8 字节长)</span>
        <span v-else-if="type === 'bcrypt'">(必须 16 字节长)</span>
      </template>
      <fluent-text-field v-model="option.salt"></fluent-text-field>
    </settings-card>
    <settings-card v-show="typeof option.secret !== 'undefined'">
      <template #icon>
        <svg-host
          src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/lock_closed_key_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="crypto-secret" class="unset">Secret</h3>
      </template>
      <template #description>
        输入加密的密钥。
      </template>
      <fluent-text-field v-model="option.secret"></fluent-text-field>
    </settings-card>
    <settings-expander v-show="typeof option.others === 'object'" expanded="true">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/options_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="crypto-others" class="unset">其他</h3>
      </template>
      <template #description>
        其他加密选项。
      </template>
      <div class="setting-expander-content-grid stack-vertical"
        style="gap: calc(var(--base-horizontal-spacing-multiplier) * 1px); align-items: stretch;">
        <fluent-number-field v-for="(_, key) in option.others" v-model="option.others[key]">{{ key
          }}</fluent-number-field>
      </div>
    </settings-expander>
    <settings-card class="settings-nowarp" v-show="verify.enabled">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/autocorrect_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h3 id="crypto-verify-auto" class="unset">自动验证</h3>
      </template>
      <template #description>
        修改内容时自动执行验证。
      </template>
      <value-change-host v-model="verify.auto" value-name="checked" event-name="change"
        style="display: flex; justify-content: flex-end;">
        <fluent-switch>{{ verify.auto ? '开' : '关' }}</fluent-switch>
      </value-change-host>
    </settings-card>
    <settings-card class="settings-nowarp">
      <template #icon>
        <svg-host
          :src="`https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/${isFile ? 'document' : 'textbox'}_20_regular.svg`"></svg-host>
      </template>
      <template #header>
        <h3 id="base-file" class="unset">是否为文件</h3>
      </template>
      <template #description>
        加密{{ isFile ? '一个文件' : '一段文本' }}。
      </template>
      <value-change-host v-model="isFile" value-name="checked" event-name="change">
        <fluent-switch>{{ isFile ? '是' : '否' }}</fluent-switch>
      </value-change-host>
    </settings-card>
    <div class="split-view">
      <div class="split-content">
        <input-label :label="isFile ? '文件' : '明文'" v-fill-color="fillColor"
          style="flex: 1; display: flex; flex-direction: column;">
          <template #action>
            <fluent-button @click="encodeAsync">加密</fluent-button>
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
            <div v-fill-color="fillColor"
              style="min-height: calc((var(--base-height-multiplier) + var(--density)) * var(--design-unit) * 1px);">
              <div class="stack-horizontal" v-if="verify.enabled" style="width: auto; column-gap: 4px;">
                <svg-host v-if="verify.verified === false" title="不匹配"
                  src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/dismiss_circle_20_filled.svg"
                  style="fill: var(--error);"></svg-host>
                <svg-host v-else-if="verify.verified === true" title="匹配"
                  src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/checkmark_circle_20_filled.svg"
                  style="fill: var(--success);"></svg-host>
                <fluent-button @click="verifyAsync">验证</fluent-button>
              </div>
            </div>
          </template>
          <fluent-text-area v-model="encoded" resize="vertical" :readonly="!verify.enabled"
            style="width: 100%;"></fluent-text-area>
        </input-label>
      </div>
    </div>
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
  import * as hash from "https://cdn.jsdelivr.net/npm/hash-wasm@4.11.0/+esm";
  import * as md2 from "https://cdn.jsdelivr.net/npm/js-md2/+esm";
  createApp({
    data() {
      return {
        type: "md5",
        option: {},
        encoded: null,
        decoded: null,
        isFile: false,
        file: null,
        verify: {
          enabled: false,
          auto: true,
          verified: null
        },
        fillColor: neutralFillInputRest
      }
    },
    watch: {
      type(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.updateOption(newValue);
          this.updateVerify(newValue);
        }
      },
      encoded(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.onWatchVerify();
        }
      },
      decoded(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.onWatchVerify();
        }
      },
      file(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.onWatchVerify();
        }
      },
      "option.secret"(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.onWatchVerify();
        }
      }
    },
    methods: {
      updateOption(type) {
        switch (type) {
          case "blake2b":
            this.option = {
              bits: 512,
              key: this.option.key ?? null
            };
            break;
          case "blake2s":
          case "blake3":
            this.option = {
              bits: 256,
              key: this.option.key ?? null
            };
            break;
          case "keccak":
          case "sha2":
          case "sha3":
            this.option = {
              isEnum: true,
              bits: "512"
            };
            break;
          case "xxhash32":
            this.option = {
              seed: 0
            }
            break;
          case "xxhash64":
          case "xxhash3":
          case "xxhash128":
            const seed = this.option.seed;
            this.option = {
              seed: typeof seed === "object"
                ? seed
                : {
                  low: 0,
                  high: 0
                }
            };
            break;
          case "scrypt":
            this.option = {
              salt: this.option.salt ?? "This is the salt for scrypt.",
              others: {
                "Cost Factor": 1024,
                "Block Size": 8,
                Parallelism: 1,
                "Hash length": 32
              }
            }
            break;
          case "argon2i":
          case "argon2d":
          case "argon2id":
            this.option = {
              salt: this.option.salt ?? "This is the salt for argon2.",
              secret: this.option.secret ?? null,
              others: {
                Iterations: 10,
                Parallelism: 1,
                "Memory Size": 1024,
                "Hash length": 32
              }
            }
            break;
          case "bcrypt":
            this.option = {
              salt: this.option.salt ?? "This bcrypt salt",
              others: {
                "Cost Factor": 10
              }
            }
            break;
          default:
            this.option = {};
            break;
        }
      },
      updateVerify(type) {
        switch (type) {
          case "argon2i":
          case "argon2d":
          case "argon2id":
          case "bcrypt":
            this.verify.enabled = true;
            break;
          default:
            this.verify.enabled = false;
            break;
        }
      },
      onWatchVerify() {
        const verify = this.verify;
        if (verify.enabled) {
          if (verify.auto) {
            this.verifyAsync();
          }
          else {
            verify.verified = null;
          }
        }
      },
      async encodeAsync() {
        const type = this.type;
        const decoded = this.isFile ? await this.getFileArrayAsync(this.file) : this.decoded;
        try {
          switch (type) {
            case "adler32":
            case "crc32":
            case "md4":
            case "md5":
            case "ripemd160":
            case "sha1":
            case "sm3":
            case "whirlpool":
              this.encoded = await hash[type](decoded);
              break;
            case "blake2b":
            case "blake2s":
            case "blake3":
              this.encoded = await hash[type](decoded, +this.option.bits, this.option.key || undefined);
              break;
            case "keccak":
            case "sha3":
              this.encoded = await hash[type](decoded, +this.option.bits);
              break;
            case "sha2":
              this.encoded = await hash[`sha${this.option.bits}`](decoded);
              break;
            case "xxhash32":
              this.encoded = await hash[type](decoded, +this.option.seed);
              break;
            case "xxhash64":
            case "xxhash3":
            case "xxhash128":
              this.encoded = await hash[type](decoded, +this.option.seed.low, +this.option.seed.high);
              break;
            case "scrypt":
              this.encoded = await hash[type]({
                password: decoded,
                salt: this.option.salt,
                costFactor: +this.option.others["Cost Factor"],
                blockSize: +this.option.others["Block Size"],
                parallelism: +this.option.others.Parallelism,
                hashLength: +this.option.others["Hash length"]
              });
              break;
            case "argon2i":
            case "argon2d":
            case "argon2id":
              this.encoded = await hash[type]({
                password: decoded,
                salt: this.option.salt,
                secret: this.option.secret || undefined,
                iterations: +this.option.others.Iterations,
                parallelism: +this.option.others.Parallelism,
                memorySize: +this.option.others["Memory Size"],
                hashLength: +this.option.others["Hash length"],
                outputType: "encoded"
              });
              break;
            case "bcrypt":
              this.encoded = await hash[type]({
                password: decoded,
                salt: this.option.salt,
                costFactor: +this.option.others["Cost Factor"],
                outputType: "encoded"
              });
              break;
            case "md2":
              this.encoded = md2.default(decoded instanceof Uint32Array ? new TextDecoder().decode(decoded) : decoded);
              break;
          }
        }
        catch (ex) {
          console.error(ex);
          this.encoded = null;
        }
      },
      async verifyAsync() {
        const type = this.type;
        const decoded = this.isFile ? await this.getFileArrayAsync(this.file) : this.decoded;
        try {
          switch (type) {
            case "argon2i":
            case "argon2d":
            case "argon2id":
              this.verify.verified = await hash.argon2Verify({
                password: decoded,
                secret: this.option.secret || undefined,
                hash: this.encoded
              });
              break;
            case "bcrypt":
              this.verify.verified = await hash.bcryptVerify({
                password: decoded,
                hash: this.encoded
              });
          }
        }
        catch (ex) {
          console.error(ex);
          this.verify.verified = false;
        }
      },
      getFileArrayAsync(file) {
        return new Promise((resolve, reject) => {
          if (file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => resolve(new Uint32Array(reader.result));
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
          }
          else {
            resolve(undefined);
          }
        });
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
      eventName: String,
      valueName: String,
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
      registerEvent(eventName, valueName) {
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
            element.addEventListener(eventName, this.onValueChanged);
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
      const { eventName, valueName } = this;
      if (valueName && eventName) {
        this.registerEvent(eventName, valueName);
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
  @import "https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/Components/Label/FluentInputLabel.razor.css";

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

  #vue-app fluent-select::part(listbox) {
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
    box-shadow: var(--elevation-shadow-card-active);
  }

  .settings-expander fluent-accordion-item.expander::part(region) {
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