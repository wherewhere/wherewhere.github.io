---
title: 哔哩哔哩卡片
sitemap: false
---
<script src="https://cdn.jsdelivr.net/npm/hexo-tag-bilibili-card/components/bilibili-card/bilibili-card.js" data-pjax
  async></script>
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAnchor,
    fluentButton,
    fluentCombobox,
    fluentOption,
    fluentTab,
    fluentTabPanel,
    fluentTabs,
    fluentTextArea,
    fluentTextField,
    baseLayerLuminance,
    StandardLuminance
  } from "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm";
  provideFluentDesignSystem()
    .register(
      fluentAnchor(),
      fluentButton(),
      fluentCombobox(),
      fluentOption(),
      fluentTab(),
      fluentTabPanel(),
      fluentTabs(),
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
  <div class="stack-vertical">
    <fluent-tabs>
      <fluent-tab id="auto">自动</fluent-tab>
      <fluent-tab id="manual">手动</fluent-tab>
      <fluent-tab-panel id="autoPanel">
        <div class="stack-vertical">
          <fluent-text-field v-model="id" placeholder="BV1y54y1a768">哔哩哔哩 ID</fluent-text-field>
          <input-label label="卡片类型">
            <value-change-host v-model="type" value-name="current-value">
              <fluent-combobox placeholder="video" value="vedio" style="min-width: unset;">
                <fluent-option v-for="type in types" :value="type">{{ type }}</fluent-option>
              </fluent-combobox>
            </value-change-host>
          </input-label>
          <fluent-text-field v-model="imageProxy" placeholder="https://images.weserv.nl/?url=">图片代理</fluent-text-field>
          <fluent-text-field v-model="infoTypes" placeholder="views danmakus">显示信息类型</fluent-text-field>
          <fluent-button @click="() => createExampleAsync(imageProxy, id, type, infoTypes)">生成卡片</fluent-button>
        </div>
      </fluent-tab-panel>
      <fluent-tab-panel id="manualPanel">
        <div class="stack-vertical">
          <fluent-text-field v-model="id" placeholder="BV1y54y1a768">哔哩哔哩 ID</fluent-text-field>
          <input-label label="卡片类型">
            <value-change-host v-model="type" value-name="current-value">
              <fluent-combobox placeholder="video" value="vedio" style="min-width: unset;">
                <fluent-option v-for="type in types" :value="type">{{ type }}</fluent-option>
              </fluent-combobox>
            </value-change-host>
          </input-label>
          <fluent-anchor :href="getApiUrl()" target="_blank">获取 JSON</fluent-anchor>
          <fluent-text-area v-model="json" resize="both">输入 JSON</fluent-text-area>
          <fluent-text-field v-model="imageProxy" placeholder="https://images.weserv.nl/?url=">图片代理</fluent-text-field>
          <fluent-text-field v-model="infoTypes" placeholder="views danmakus">显示信息类型</fluent-text-field>
          <fluent-button @click="() => createExample(json, imageProxy, id, type, infoTypes)">生成卡片</fluent-button>
        </div>
      </fluent-tab-panel>
    </fluent-tabs>
    <div ref="example" style="max-width: 100%;"></div>
  </div>
</div>

<template id="empty-slot-template">
  <div>
    <slot></slot>
  </div>
</template>

<template id="input-label-template">
  <div class="input-label">
    <label class="fluent-input-label">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import * as JSONBig from "https://cdn.jsdelivr.net/npm/json-bigint/+esm";
  import { HighlightJS as hljs } from "https://cdn.jsdelivr.net/npm/highlight.js/+esm";
  createApp({
    data() {
      return {
        id: null,
        type: "video",
        json: null,
        imageProxy: null,
        infoTypes: null,
        types: ["video", "article", "user", "live", "bangumi", "audio", "dynamic", "favorite", "album"]
      }
    },
    methods: {
      getApiUrl() {
        const id = this.id;
        if (!id) { return null; }
        else { return this.getApi(id, this.type); }
      },
      createExampleAsync(imageProxy, id, type, infoTypes) {
        return this.createCardAsync(imageProxy, id, type, infoTypes).then(x => this.updateExample(x));
      },
      createExample(json, imageProxy, id, type, infoTypes) {
        this.updateExample(this.createCard(JSONBig.parse(json), imageProxy, id, type, infoTypes));
      },
      updateExample(element) {
        const example = this.$refs.example;
        if (example instanceof HTMLElement) {
          if (!element) {
            example.innerHTML = '';
          }
          else {
            example.innerHTML = element;
            const pre = document.createElement("pre");
            pre.className = "highlight html language-html";
            pre.style.marginTop = "1rem";
            pre.style.borderRadius = "6px";
            const code = document.createElement("code");
            code.innerText = element;
            pre.appendChild(code);
            example.appendChild(pre);
            hljs.highlightElement(code);
          }
        }
      },
      async createCardAsync(imageProxy, id, type, infoTypes) {
        if (!id) { return ''; }
        const token = await fetch(this.getApi(id, type))
          .then(x => x.text())
          .then(x => JSONBig.parse(x))
          .catch(ex => {
            console.error(ex);
            return {
              vid: id,
              type: type,
              title: `出错了！${ex}`
            };
          });
        return this.createCard(token, imageProxy, id, type, infoTypes);
      },
      createCard(token, imageProxy, id, type, infoTypes) {
        if (!token) { return ''; }
        let message;
        switch (type) {
          case "video":
            message = this.getVideoMessage(id, token);
            break;
          case "article":
            message = this.getArticleMessage(id, token);
            break;
          case "user":
            message = this.getUserMessage(id, token);
            break;
          case "live":
            message = this.getLiveMessage(id, token);
            break;
          case "bangumi":
            message = this.getBangumiMessage(id, token);
            break;
          case "audio":
            message = this.getAudioMessage(id, token);
            break;
          case "dynamic":
            message = this.getDynamicMessage(id, token);
            break;
          case "favorite":
            message = this.getFavoriteMessage(id, token);
            break;
          case "album":
            message = this.getAlbumMessage(id, token);
            break;
          default:
            const code = id.slice(0, 2).toLowerCase();
            switch (code) {
              case "cv":
                return this.createCard(token, imageProxy, id, "article");
              case "md":
                return this.createCard(token, imageProxy, id, "bangumi");
              case "au":
                return this.createCard(token, imageProxy, id, "audio");
              case "bv":
              case "av":
              default:
                return this.createCard(token, imageProxy, id, "video");
            }
        }
        return this.createElement(imageProxy, infoTypes, message);
      },
      getApi(id, type) {
        switch (type) {
          case "video":
            const vid = this.getVid(id);
            return `https://api.bilibili.com/x/web-interface/view?${vid.type}=${vid.id}`;
          case "article":
            const cvid = id.slice(0, 2).toLowerCase() === "cv" ? id.slice(2) : id;
            return `https://api.bilibili.com/x/article/viewinfo?id=${cvid}`;
          case "user":
            return `https://api.bilibili.com/x/web-interface/card?mid=${id}`;
          case "live":
            return `https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${id}`;
          case "bangumi":
            const mdid = id.slice(0, 2).toLowerCase() === "md" ? id.slice(2) : id;
            return `https://api.bilibili.com/pgc/review/user?media_id=${mdid}`;
          case "audio":
            const auid = id.slice(0, 2).toLowerCase() === "au" ? id.slice(2) : id;
            return `https://api.bilibili.com/audio/music-service-c/web/song/info?sid=${auid}`;
          case "dynamic":
            return `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail?dynamic_id=${id}`;
          case "favorite":
            return `https://api.bilibili.com/x/v3/fav/folder/info?media_id=${id}`;
          case "album":
            return `https://api.vc.bilibili.com/link_draw/v1/doc/detail?doc_id=${id}`;
          default:
            const code = id.slice(0, 2).toLowerCase();
            switch (code) {
              case "cv":
                return this.getApi(id, "article");
              case "md":
                return this.getApi(id, "bangumi");
              case "au":
                return this.getApi(id, "audio");
              case "bv":
              case "av":
              default:
                return this.getApi(id, "video");
            }
        }
      },
      getVideoMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              return {
                vid: data.bvid,
                type: "video",
                title: data.title,
                author: data.owner?.name,
                cover: data.pic,
                duration: this.formatSecondsToTime(data.duration),
                views: this.formatLargeNumber(data.stat?.view),
                danmakus: this.formatLargeNumber(data.stat?.danmaku),
                comments: this.formatLargeNumber(data.stat?.reply),
                favorites: this.formatLargeNumber(data.stat?.favorite),
                coins: this.formatLargeNumber(data.stat?.coin),
                likes: this.formatLargeNumber(data.stat?.like)
              };
            }
            else {
              console.warn(`Failed to get bilibli video ${id}`);
              return {
                vid: id,
                type: "video",
                title: "出错了！"
              }
            }
          case -400:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "video",
              title: `出错了！${token.code}`
            };
          case -403:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "video",
              title: `权限不足！${token.code}`
            };
          case -404:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "video",
              title: `视频不存在！${token.code}`
            };
          case 62002:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "video",
              title: `稿件不可见！${token.code}`
            };
          case 62004:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "video",
              title: `稿件审核中！${token.code}`
            };
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "video",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli video ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getArticleMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              return {
                vid: id,
                type: "article",
                title: data.title,
                author: data.author_name,
                cover: data.banner_url,
                views: this.formatLargeNumber(data.stat?.view),
                comments: this.formatLargeNumber(data.stat?.reply),
                favorites: this.formatLargeNumber(data.stat?.favorite),
                coins: this.formatLargeNumber(data.stat?.coin),
                likes: this.formatLargeNumber(data.stat?.like)
              };
            }
            else {
              console.warn(`Failed to get bilibli article ${id}`);
              return {
                vid: id,
                type: "article",
                title: "出错了！"
              }
            }
          case -400:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "article",
              title: `出错了！${token.code}`
            };
          case -404:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "article",
              title: `专栏不存在！${token.code}`
            };
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "article",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli article ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getUserMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              return {
                vid: data.card?.mid,
                type: "user",
                title: `${data.card?.name}\n${data.card?.sign}`,
                author: data.card?.name,
                cover: data.card?.face,
                views: this.formatLargeNumber(data.card?.fans),
                likes: this.formatLargeNumber(data.like_num)
              };
            }
            else {
              console.warn(`Failed to get bilibli article ${id}`);
              return {
                vid: id,
                type: "user",
                title: "出错了！"
              }
            }
          case -400:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "user",
              title: `出错了！${token.code}`
            };
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "user",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli user ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getLiveMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              return {
                vid: data.room_id,
                type: "live",
                title: data.title,
                cover: data.user_cover,
                views: this.formatLargeNumber(data.online)
              };
            }
            else {
              console.warn(`Failed to get bilibli live ${id}`);
              return {
                vid: id,
                type: "live",
                title: "出错了！"
              }
            }
          case 1:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "live",
              title: `房间不存在！${token.code}`
            };
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "live",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli live ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getBangumiMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.result;
            if (data) {
              return {
                vid: data.media?.media_id,
                type: "bangumi",
                title: data.media?.title,
                author: data.media?.type_name,
                cover: data.media?.horizontal_picture,
                favorites: data.media?.rating?.score
              };
            }
            else {
              if (log) {
                log.warn(`Failed to get bilibli article ${id}`);
              }
              return {
                vid: id,
                type: "bangumi",
                title: "出错了！"
              }
            }
          case -400:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "bangumi",
              title: `出错了！${token.code}`
            };
          case -404:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "bangumi",
              title: `番剧不存在！${token.code}`
            };
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "bangumi",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli user ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getAudioMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              return {
                vid: data.id,
                type: "audio",
                title: data.title,
                author: data.author,
                cover: data.cover,
                duration: this.formatSecondsToTime(data.duration),
                views: this.formatLargeNumber(data.statistic?.play),
                comments: this.formatLargeNumber(data.statistic?.comment),
                favorites: this.formatLargeNumber(data.statistic?.collect),
                coins: this.formatLargeNumber(data.coin_num)
              };
            }
            else {
              if (log) {
                log.warn(`Failed to get bilibli audio ${id}`);
              }
              return {
                vid: id,
                type: "audio",
                title: "出错了！"
              }
            }
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "audio",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli audio ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getDynamicMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              const card = JSON.parse(data.card?.card);
              return {
                vid: data.card?.desc?.dynamic_id,
                type: "dynamic",
                title: card?.item?.description,
                author: data.card?.desc?.user_profile?.info?.uname,
                cover: card?.item?.pictures[0]?.img_src,
                views: this.formatLargeNumber(data.card?.desc?.view),
                comments: this.formatLargeNumber(data.card?.desc?.comment),
                likes: this.formatLargeNumber(data.card?.desc?.like)
              };
            }
            else {
              console.warn(`Failed to get bilibli dynamic ${id}`);
              return {
                vid: id,
                type: "dynamic",
                title: "出错了！"
              }
            }
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "dynamic",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli dynamic ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getFavoriteMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              return {
                vid: data.id,
                type: "favorite",
                title: data.title,
                author: data.upper?.name,
                cover: data.cover,
                views: this.formatLargeNumber(data.cnt_info?.play),
                favorites: this.formatLargeNumber(data.cnt_info?.collect)
              };
            }
            else {
              console.warn(`Failed to get bilibli favorite ${id}`);
              return {
                vid: id,
                type: "favorite",
                title: "出错了！"
              }
            }
          case -400:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "favorite",
              title: `出错了！${token.code}`
            };
          case -403:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "favorite",
              title: `权限不足！${token.code}`
            };
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "favorite",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli favorite ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      getAlbumMessage(id, token) {
        switch (token?.code) {
          case 0:
            const data = token?.data;
            if (data) {
              return {
                vid: data.item?.doc_id,
                type: "album",
                title: data.item?.title,
                author: data.user?.name,
                cover: data.item?.pictures[0]?.img_src,
                views: this.formatLargeNumber(data.item?.view_count),
                comments: this.formatLargeNumber(data.item?.comment_count),
                favorites: this.formatLargeNumber(data.item?.collect_count),
                likes: this.formatLargeNumber(data.item?.like_count)
              };
            }
            else {
              console.warn(`Failed to get bilibli album ${id}`);
              return {
                vid: id,
                type: "album",
                title: "出错了！"
              }
            }
          case 110001:
            warn(token.code, token.message);
            return {
              vid: id,
              type: "album",
              title: `相册不存在！${token.code}`
            };
          default:
            warn(token?.code, token?.message);
            return {
              vid: id,
              type: "album",
              title: `出错了！${token?.code}`
            };
        }
        function warn(code, message) {
          console.warn(`Failed to get bilibli album ${id}: { code: ${code}, message: ${message} }`);
        }
      },
      createElement(imageProxy, infoTypes, { vid, type, title, author, cover, duration, views, danmakus, comments, favorites, coins, likes }) {
        const attributes = ["bilibili-card"];
        if (vid) {
          attributes.push(`vid="${vid}"`);
        }
        if (type) {
          attributes.push(`type="${type}"`);
        }
        if (title) {
          attributes.push(`title="${title}"`);
        }
        if (author) {
          attributes.push(`author="${author}"`);
        }
        if (cover) {
          attributes.push(`cover="${cover}"`);
        }
        if (duration) {
          attributes.push(`duration="${duration}"`);
        }
        if (views) {
          attributes.push(`views="${views}"`);
        }
        if (danmakus) {
          attributes.push(`danmakus="${danmakus}"`);
        }
        if (comments) {
          attributes.push(`comments="${comments}"`);
        }
        if (favorites) {
          attributes.push(`favorites="${favorites}"`);
        }
        if (coins) {
          attributes.push(`coins="${coins}"`);
        }
        if (likes) {
          attributes.push(`likes="${likes}"`);
        }
        if (infoTypes) {
          attributes.push(`info-types="${infoTypes}"`);
        }
        if (imageProxy) {
          attributes.push(`image-proxy="${imageProxy}"`);
        }
        return `<${attributes.join(' ')}></bilibili-card>`;
      },
      getVid(id) {
        const type = id.slice(0, 2).toUpperCase();
        if (type === "BV") {
          return { id: id, type: "bvid" };
        }
        else if (type === "AV") {
          return { id: id.slice(2), type: "aid" };
        }
        else {
          const num = Number(id);
          if (isNaN(num)) {
            return { id: `BV${id}`, type: "bvid" };
          }
          else {
            return { id: num, type: "aid" };
          }
        }
      },
      formatLargeNumber(num) {
        return (num >= 1E8)
          ? `${(num / 1E8).toFixed(1)}亿`
          : (num >= 1E4)
            ? `${(num / 1E4).toFixed(1)}万`
            : num;
      },
      formatSecondsToTime(second) {
        const sec = second % 60;
        const min = Math.floor(second / 60) % 60;
        const hour = Math.floor(second / 3600);
        const times = [];
        if (hour) {
          times.push(hour);
        }
        times.push(min);
        times.push(sec);
        return times.map(n => n.toString().padStart(2, 0)).join(':');
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
  }).component("input-label", {
    template: "#input-label-template",
    props: {
      label: String
    }
  }).mount("#vue-app");
</script>

<style>
  @import 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-blazor@dev/src/Core/Components/Label/FluentInputLabel.razor.css';

  #vue-app {
    font-family: "Segoe UI Variable", "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
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
</style>