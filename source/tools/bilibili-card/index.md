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
      fluentOption(),
      fluentSelect(),
      fluentTextArea(),
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
<div id="vue-app">
  <div class="stack-vertical" style="row-gap: 0.3rem;">
    <settings-card>
      <template #icon>
        <svg-host :src="getTypeIcon(type)"></svg-host>
      </template>
      <template #header>
        <h4 id="card-type" class="unset">卡片类型</h4>
      </template>
      <template #description>
        选择卡片显示内容的类型。
      </template>
      <fluent-select placeholder="video" v-model="type" style="min-width: calc(var(--base-height-multiplier) * 11.25px);">
        <fluent-option v-for="(value, key) in types" :value="key">{{ value }}</fluent-option>
      </fluent-select>
    </settings-card>
    <settings-card>
      <template #icon>
        <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/card_ui_20_regular.svg"></svg-host>
      </template>
      <template #header>
        <h4 id="card-id" class="unset">卡片 ID</h4>
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
        <h4 id="get-data" class="unset">获取数据</h4>
      </template>
      <template #description>
        从哔哩哔哩获取 JSON 数据。(由于跨域限制无法自动获取信息，请手动在下方填入 JSON 数据)
      </template>
      <div class="setting-expander-content-grid">
        <input-label label="输入 JSON">
          <template #action>
            <div class="stack-horizontal" style="width: unset; column-gap: calc(var(--design-unit) * 1px);">
              <fluent-button title="这个按钮并不能正常使用" :disabled="!id" @click="() => getApiAsync()">自动</fluent-button>
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
        <h4 id="image-proxy" class="unset">图片代理</h4>
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
        <h4 id="info-types" class="unset">信息类型</h4>
      </template>
      <template #description>
        设置卡片显示信息的类型。(views, danmakus, comments, favorites, coins, likes)
      </template>
      <fluent-text-field v-model="infoTypes" :placeholder="getDefaultInfoTypes(type)"></fluent-text-field>
    </settings-card>
    <div class="settings-card"
      :style="{ paddingTop: 'calc(var(--design-unit) * 4px)', paddingRight: 'calc(var(--design-unit) * 4px)', paddingBottom: example ? 'calc(var(--design-unit) * 4px)' : 'calc(var(--design-unit) * 3px)', paddingLeft: 'calc(var(--design-unit) * 4px)' }">
      <input-label label="预览">
        <template #action>
          <div class="stack-horizontal"
            style="width: unset; column-gap: calc(var(--design-unit) * 1px);">
            <fluent-button v-show="example" @click="e => onCopyClicked(e, example)">复制代码</fluent-button>
            <fluent-button @click="() => createExample(json, imageProxy, id, type, infoTypes)">生成卡片</fluent-button>
          </div>
        </template>
        <div ref="example" v-show="example" style="max-width: 100%;"> </div>
      </input-label>
    </div>
  </div>
</div>

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
      <div class="icon-holder" v-check-solt="getSlot('icon')">
        <slot name="icon"></slot>
      </div>
      <div class="header-panel">
        <span v-check-solt="getSlot('header')">
          <slot name="header"></slot>
        </span>
        <span class="description" v-check-solt="getSlot('description')">
          <slot name="description"></slot>
        </span>
      </div>
    </div>
    <div class="content-presenter" v-check-solt="getSlot('default')">
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
      <slot></slot>
    </fluent-accordion-item>
  </fluent-accordion>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js";
  import { HighlightJS as hljs } from "https://cdn.jsdelivr.net/npm/highlight.js/+esm";
  createApp({
    data() {
      return {
        id: null,
        type: "video",
        json: null,
        imageProxy: null,
        infoTypes: null,
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
        example: null
      }
    },
    methods: {
      getApiUrl() {
        const id = this.id;
        if (!id) { return null; }
        else { return this.getApi(id, this.type); }
      },
      async getApiAsync() {
        const id = this.id;
        if (!id) { return; }
        json = await fetch(this.getApi(id, this.type))
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
            return "1720863137";
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
          })
      },
      createExample(json, imageProxy, id, type, infoTypes) {
        this.updateExample(this.createCard(JSON.parse(json), imageProxy, id, type, infoTypes));
      },
      updateExample(element) {
        const example = this.$refs.example;
        if (example instanceof HTMLElement) {
          if (!element) {
            example.innerHTML = this.example = '';
          }
          else {
            example.innerHTML = this.example = element;
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
            const code = id?.slice(0, 2).toLowerCase();
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
            const code = id?.slice(0, 2).toLowerCase();
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
              const result = {
                vid: data.card?.desc?.dynamic_id_str,
                type: "dynamic",
                author: data.card?.desc?.user_profile?.info?.uname,
                views: this.formatLargeNumber(data.card?.desc?.view),
                comments: this.formatLargeNumber(data.card?.desc?.comment),
                likes: this.formatLargeNumber(data.card?.desc?.like)
              };
              const card = JSON.parse(data.card?.card);
              switch (data.card?.desc?.type) {
                case 1:
                case 4:
                  return {
                    ...result,
                    title: card?.item?.content,
                    cover: card?.user?.face,
                  }
                case 2:
                  return {
                    ...result,
                    title: card?.item?.description,
                    cover: card?.item?.pictures?.[0]?.img_src,
                  };
                case 8:
                  return {
                    ...result,
                    title: card?.dynamic,
                    cover: card?.pic,
                  }
                case 64:
                  return {
                    ...result,
                    title: card?.title,
                    cover: card?.image_urls?.[0],
                  }
                default:
                  return {
                    ...result,
                    title: `${data.card?.desc?.user_profile?.info?.uname} 的动态`,
                    cover: data.card?.desc?.user_profile?.info?.face
                  }
              }
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
        const type = id?.slice(0, 2).toUpperCase();
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
        console.log(second);
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
  }).directive("check-solt",
    (element, binding) => {
      if (element instanceof HTMLElement) {
        const solt = binding.value;
        if (solt !== binding.oldValue) {
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
          if (typeof solt === "function") {
            let value = solt();
            if (value instanceof Array) {
              value = value[0];
              if (typeof value === "object") {
                if (typeof value.type === "symbol") {
                  value = value.children;
                  if (value instanceof Array) {
                    setDisplay(value.length > 0);
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
  ).component("svg-host", {
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
    methods: {
      getSlot(name) {
        return this.$slots[name];
      }
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
    font-family: var(--body-font);
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    font-weight: var(--font-weight);
    color: var(--neutral-foreground-rest);
  }

  #vue-app * {
    --settings-card-padding: calc(var(--design-unit) * 4px);
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

  #vue-app fluent-select::part(listbox) {
    max-height: calc(var(--base-height-multiplier) * 30px);
  }

  #vue-app fluent-select .listbox {
    max-height: calc(var(--base-height-multiplier) * 30px);
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
    --settings-card-description-font-size: var(--type-ramp-minus-1-font-size);
    --settings-card-header-icon-max-size: var(--type-ramp-base-line-height);
    --settings-card-header-icon-margin: 0 calc((var(--base-horizontal-spacing-multiplier) * 6 + var(--design-unit) * 0.5) * 1px) 0 calc((var(--base-horizontal-spacing-multiplier) * 6 - var(--design-unit) * 4) * 1px);
    --settings-card-vertical-header-content-spacing: calc(var(--design-unit) * 2px) 0 0 0;
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

  .settings-card div.content-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .settings-expander * {
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

  .settings-expander .presenter {
    padding: var(--settings-expander-header-padding);
  }

  .settings-expander div.setting-expander-content-grid {
    padding: var(--settings-expander-item-padding);
  }
</style>