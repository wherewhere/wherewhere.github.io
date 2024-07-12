---
title: 哔哩哔哩卡片
sitemap: false
---
<script src="https://cdn.jsdelivr.net/npm/hexo-tag-bilibili-card/components/bilibili-card/bilibili-card.js" data-pjax
  async></script>
<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentAccordion,
    fluentAccordionItem,
    fluentAnchor,
    fluentButton,
    fluentCombobox,
    fluentOption,
    fluentTextArea,
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
      fluentCombobox(),
      fluentOption(),
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
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/card_ui_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 class="unset">卡片 ID</h4>
      </template>
      <template #description>
        输入卡片所需的哔哩哔哩 {{ type }} ID。
      </template>
      <fluent-text-field v-model="id" placeholder="BV1y54y1a768"></fluent-text-field>
    </settings-card>
    <settings-card>
      <template #icon>
        <svg-host :src="getTypeIcon(type)"></svg-host>
      </template>
      <template #header>
        <h4 class="unset">卡片类型</h4>
      </template>
      <template #description>
        选择生成卡片的类型。
      </template>
      <value-change-host v-model="type" value-name="current-value">
        <fluent-combobox placeholder="video" value="vedio" style="width: 100%; min-width: unset;">
          <fluent-option v-for="type in types" :value="type">{{ type }}</fluent-option>
        </fluent-combobox>
      </value-change-host>
    </settings-card>
    <settings-expander expanded="true">
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/database_arrow_down_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 class="unset">获取数据</h4>
      </template>
      <template #description>
        从哔哩哔哩获取 JSON 数据。(由于跨域限制无法自动获取信息，请手动在下方填入 JSON 数据)
      </template>
      <div class="setting-expander-content-grid">
        <input-label label="输入 JSON">
          <template #action>
            <div class="stack-horizontal" style="width: unset; column-gap: 4px;">
              <fluent-button @click="() => getApiAsync()">自动</fluent-button>
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
        <h4 class="unset">图片代理</h4>
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
        <h4 class="unset">信息类型</h4>
      </template>
      <template #description>
        设置卡片显示信息的类型。
      </template>
      <fluent-text-field v-model="infoTypes" placeholder="views danmakus"></fluent-text-field>
    </settings-card>
    <div class="settings-card" style="padding: var(--settings-card-padding);">
      <input-label label="预览">
        <template #action>
          <fluent-button @click="() => createExample(json, imageProxy, id, type, infoTypes)">生成卡片</fluent-button>
        </template>
        <div ref="example" style="max-width: 100%;"></div>
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
      <slot name="action"></slot>
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
  <fluent-accordion class="settings-expander" style="width: 100%;">
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
  import * as JSONBig from "https://cdn.jsdelivr.net/npm/json-bigint/+esm";
  import { HighlightJS as hljs } from "https://cdn.jsdelivr.net/npm/highlight.js/+esm";
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
      async getApiAsync() {
        if (!id) { return; }
        json = await fetch(this.getApi(id, type))
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
            return this.getTypeIcon("video");
        }
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
            pre.style.marginTop = "calc(var(--design-unit) * 1px)";
            pre.style.marginBottom = "unset";
            pre.style.borderRadius = "6px";
            const code = document.createElement("code");
            code.innerText = element;
            pre.appendChild(code);
            example.appendChild(pre);
            hljs.highlightElement(code);
          }
        }
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
    font-family: "Segoe UI Variable", "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }

  #vue-app * {
    --settings-card-padding: 16px;
    --settings-expander-header-padding: 4px 0px 4px 8px;
    --settings-expander-item-padding: 0px 36px 0px 50px;
  }

  #vue-app .stack-vertical {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 10px;
    width: 100%;
  }

  #vue-app .stack-horizontal {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 10px;
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
</style>