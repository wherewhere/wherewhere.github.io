---
title: 魔法薇ㄦ的花盆
description: 铺路尚未成功，同志仍需努力！
sitemap: false
---
<script type="importmap" data-pjax>
  {
    "imports": {
			"@fluentui/web-components": "https://cdn.jsdelivr.net/npm/@fluentui/web-components/+esm",
			"@vue/devtools-api": "https://cdn.jsdelivr.net/npm/@vue/devtools-api/+esm",
			"marked": "https://cdn.jsdelivr.net/npm/marked/+esm",
			"marked-highlight": "https://cdn.jsdelivr.net/npm/marked-highlight/+esm",
			"highlight.js": "https://cdn.jsdelivr.net/npm/highlight.js/+esm",
      "vue": "https://cdn.jsdelivr.net/npm/vue/dist/vue.esm-browser.prod.js",
			"vue-router": "https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.esm-browser.js"
    }
  }
</script>

<script type="module" data-pjax>
  import {
    provideFluentDesignSystem,
    fluentProgressRing,
    fluentTextField,
    fluentTreeItem,
    fluentTreeView,
    accentBaseColor,
    SwatchRGB,
    fillColor,
    neutralLayerFloating,
    baseLayerLuminance,
    StandardLuminance
  } from "@fluentui/web-components";
  provideFluentDesignSystem()
    .register(
      fluentProgressRing(),
      fluentTextField(),
      fluentTreeItem(),
      fluentTreeView()
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
  <router-view></router-view>
</div>

<template id="home-view-template">
  <page-title title="主页"></page-title>
  <div class="stack-vertical" style="row-gap: 8px;" v-if="posts.length">
    <post-card v-for="post of posts" :post="post"></post-card>
  </div>
  <fluent-progress-ring v-else></fluent-progress-ring>
  <table-of-contents hidden="true"></table-of-contents>
</template>

<template id="posts-view-template">
  <page-title v-if="post" :title="post.title" :subtitle="subtitle"></page-title>
  <post-detail-card v-if="post" :post="post" ref="content"></post-detail-card>
  <fluent-progress-ring v-else></fluent-progress-ring>
  <table-of-contents ref="toc"></table-of-contents>
</template>

<template id="cates-view-template">
  <page-title :title="title" :subtitle="subtitle"></page-title>
  <div v-if="$route.params.slug">
    <div class="stack-vertical" style="row-gap: 8px;" v-if="posts.length">
      <post-card v-for="post of posts" :post="post"></post-card>
    </div>
  </div>
  <div v-else>
    <div v-if="cates.length" class="stack-vertical" style="row-gap: 8px;">
      <div class="clickable-card" v-for="cate of cates"
        @click="() => $router.push(`/${$route.params.type}/${cate.slug}`)">
        {{ cate.name }}
      </div>
    </div>
    <fluent-progress-ring v-else></fluent-progress-ring>
  </div>
  <table-of-contents hidden="true"></table-of-contents>
</template>

<template id="archives-view-template">
  <page-title :title="title" :subtitle="subtitle"></page-title>
  <div v-if="$route.params.year">
    <div class="stack-vertical" style="row-gap: 8px;" v-if="posts.length">
      <post-card v-for="post of posts" :post="post"></post-card>
    </div>
  </div>
  <div v-else>
    <fluent-tree-view v-if="archives.length" ref="tree">
      <fluent-tree-item v-for="year of archives" :data-year="year.year">
        {{ year.year }} 年
        <fluent-tree-item v-for="month of year.data" :data-year="year.year" :data-month="month.month">
          {{ month.month }} 月
        </fluent-tree-item>
      </fluent-tree-item>
    </fluent-tree-view>
    <fluent-progress-ring v-else></fluent-progress-ring>
  </div>
  <table-of-contents hidden="true"></table-of-contents>
</template>

<template id="search-view-template">
  <page-title title="搜索"></page-title>
  <fluent-text-field v-model="searchText" style="width: 100%;">
    <svg-host src="https://cdn.jsdelivr.net/npm/@fluentui/svg-icons/icons/search_16_regular.svg" slot="end"></svg-host>
  </fluent-text-field>
  <div v-if="resultItems.length" class="stack-vertical search-result-container" style="row-gap: 8px;" ref="container">
    找到 {{ resultItems.length }} 个搜索结果
    <div class="clickable-card" v-for="result of resultItems" v-html="result.item"></div>
  </div>
  <table-of-contents hidden="true"></table-of-contents>
</template>

<template id="pages-view-template">
  <page-title :title="title" :subtitle="subtitle"></page-title>
  <div v-if="$route.params.path">
    <post-detail-card v-if="page" :post="page" ref="content"></post-detail-card>
    <fluent-progress-ring v-else></fluent-progress-ring>
    <table-of-contents ref="toc"></table-of-contents>
  </div>
  <div v-else>
    <div v-if="pages.length" class="stack-vertical" style="row-gap: 8px;">
      <div class="clickable-card" v-for="page of pages" :lang="page.language"
        @click="() => $router.push(getUrl(page.url))">
        {{ page.title }}
      </div>
    </div>
    <fluent-progress-ring v-else></fluent-progress-ring>
    <table-of-contents hidden="true"></table-of-contents>
  </div>
</template>

<template id="svg-host-template">
  <div class="svg-host" v-html="innerHTML"></div>
</template>

<template id="post-card-template">
  <div class="post-card clickable-card" :lang="post.language" @click="() => $router.push(`/posts/${post.url}`)">
    <h2 style="margin-top: 20px;">{{ post.title }}</h2>
    <div v-html="post.excerpt"></div>
  </div>
</template>

<template id="post-detail-card-template">
  <div class="post-detail-card" :lang="post.language" v-html="parse(post.getContent())"></div>
</template>
{% endraw %}

<script type="module" data-pjax>
  import { createApp } from "vue";
  import { createRouter, createWebHashHistory } from "vue-router";
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  import { HighlightJS as hljs } from "highlight.js";
  createApp({
    data() {
      return {
        menus: null
      }
    },
    watch: {
      "$route.path"(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.registerActiveMenuItem();
        }
      }
    },
    methods: {
      registerActiveMenuItem() {
        switch (this.$route.path.split('/')[1]) {
          case '':
            this.menus[0].classList.toggle("menu-item-active", true);
            this.menus[1].classList.toggle("menu-item-active", false);
            this.menus[2].classList.toggle("menu-item-active", false);
            this.menus[3].classList.toggle("menu-item-active", false);
            this.menus[4].classList.toggle("menu-item-active", false);
            break;
          case "tags":
            this.menus[0].classList.toggle("menu-item-active", false);
            this.menus[1].classList.toggle("menu-item-active", true);
            this.menus[2].classList.toggle("menu-item-active", false);
            this.menus[3].classList.toggle("menu-item-active", false);
            this.menus[4].classList.toggle("menu-item-active", false);
            break;
          case "categories":
            this.menus[0].classList.toggle("menu-item-active", false);
            this.menus[1].classList.toggle("menu-item-active", false);
            this.menus[2].classList.toggle("menu-item-active", true);
            this.menus[3].classList.toggle("menu-item-active", false);
            this.menus[4].classList.toggle("menu-item-active", false);
            break;
          case "archives":
            this.menus[0].classList.toggle("menu-item-active", false);
            this.menus[1].classList.toggle("menu-item-active", false);
            this.menus[2].classList.toggle("menu-item-active", false);
            this.menus[3].classList.toggle("menu-item-active", true);
            this.menus[4].classList.toggle("menu-item-active", false);
            break;
          case "search":
            this.menus[0].classList.toggle("menu-item-active", false);
            this.menus[1].classList.toggle("menu-item-active", false);
            this.menus[2].classList.toggle("menu-item-active", false);
            this.menus[3].classList.toggle("menu-item-active", false);
            this.menus[4].classList.toggle("menu-item-active", true);
            break;
          default:
            this.menus[0].classList.toggle("menu-item-active", false);
            this.menus[1].classList.toggle("menu-item-active", false);
            this.menus[2].classList.toggle("menu-item-active", false);
            this.menus[3].classList.toggle("menu-item-active", false);
            this.menus[4].classList.toggle("menu-item-active", false);
            break;
        }
      }
    },
    mounted() {
      const siderbar = document.querySelector(".sidebar>.pjax");
      if (siderbar) {
        const inner = document.createElement("div");
        inner.className = "sidebar-inner animated fadeInUp";
        inner.style.padding = "18px 0 0 0"
        siderbar.appendChild(inner);
        const animated = document.createElement("div");
        animated.className = "animated";
        inner.appendChild(animated);
        const title = document.createElement("div");
        title.className = "links-of-blogroll-title";
        title.innerHTML = '<i class="fa fa-signs-post fa-fw"></i>导航';
        animated.appendChild(title);
        const menu = document.createElement("ul");
        menu.className = "main-menu menu";
        animated.appendChild(menu);
        const $router = this.$router;
        const menus = [];
        function createMenuItem(type, href, icon, content) {
          const item = document.createElement("li");
          item.className = `menu-item menu-item-${type} animated fadeInDown`;
          const a = document.createElement("a");
          a.rel = "section";
          a.innerHTML = `<i class="fa fa-${icon} fa-fw"></i>${content}`;
          a.addEventListener("click", () => $router.push(href));
          item.appendChild(a);
          if (type === "search") { item.style.display = "block"; }
          menus.push(a);
          return item;
        }
        menu.appendChild(createMenuItem("home", "/", "home", "首页"));
        menu.appendChild(createMenuItem("tags", "/tags", "tags", "标签"));
        menu.appendChild(createMenuItem("categories", "/categories", "th", "分类"));
        menu.appendChild(createMenuItem("archive", "/archives", "archive", "归档"));
        menu.appendChild(createMenuItem("search", "/search", "search", "搜索"));
        this.menus = menus;
        this.registerActiveMenuItem();
      }
    }
  }).use(createRouter({
    history: createWebHashHistory(),
    routes: [{
      path: '/',
      alias: ["/posts"],
      component: {
        template: "#home-view-template",
        data() {
          return {
            posts: []
          }
        },
        async mounted() {
          this.posts = [];
          const posts = await fetch("/api/posts.json").then(x => x.json());
          for (const page of posts.data.pages) {
            const info = await fetch(`/${page.api}`).then(x => x.json());
            this.posts.push(...info.data.posts);
          }
        }
      }
    }, {
      path: "/posts/:slug+",
      component: {
        template: "#posts-view-template",
        data() {
          return {
            post: null
          }
        },
        computed: {
          subtitle() {
            const date = new Date(this.post.date);
            let result = `发布时间：<time title="${date.toLocaleString()}" itemprop="dateCreated datePublished" datetime="${this.post.date}">${date.toLocaleDateString()}</time>`;
            const updated = new Date(this.post.updated);
            if (date.getFullYear() !== updated.getFullYear() ||
              date.getMonth() !== updated.getMonth() ||
              date.getDate() !== updated.getDate()) {
              result += `&ensp;|&ensp;最后更新：<time title="${updated.toLocaleString()}" itemprop="dateCreated datePublished" datetime="${this.post.updated}">${updated.toLocaleDateString()}</time>`;
            }
            if (this.post.categories.length) {
              result += `&ensp;|&ensp;分类于：${this.post.categories.map(x => `<a href="#/categories/${x.name}">${x.name}</a>`).join('、')}`;
            }
            return result;
          }
        },
        watch: {
          "$route.params.slug"(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.onupdate();
            }
          }
        },
        methods: {
          async onupdate() {
            const post = await fetch(`/api/posts/${this.$route.params.slug.join("/")}.json`).then(x => x.json());
            this.post = {
              ...post.data,
              getContent() {
                const raw = this.raw;
                let inRow = false;
                let time = 0, count = 0;
                let index = 0;
                for (; index < raw.length; index++) {
                  const c = raw[index];
                  if (inRow) {
                    if (c === '-') {
                      count++;
                    }
                    else {
                      if (count >= 3 && ++time == 2) {
                        return raw.substring(index);
                      }
                      else {
                        inRow = false;
                        count = 0;
                      }
                    }
                  }
                  else if (c === '-') {
                    inRow = true;
                    count++;
                  }
                }
                return raw;
              }
            };
            await this.$nextTick();
            const $el = this.$refs.content.$el;
            if (typeof pjax !== "undefined") {
              pjax.refresh($el);
            }
            this.$refs.toc.refresh($el);
          }
        },
        mounted() {
          return this.onupdate();
        }
      }
    }, {
      path: "/:type(tags|categories)/:slug?",
      component: {
        template: "#cates-view-template",
        data() {
          return {
            cates: [],
            posts: []
          }
        },
        computed: {
          title() {
            const params = this.$route.params;
            const title = params.type === "tags" ? "标签" : "分类"
            return params.slug ? `${title}：${params.slug}` : title;
          },
          subtitle() {
            const params = this.$route.params;
            return params.slug ? `目前共计 ${this.posts.length} 篇文章` : `目前共计 ${this.cates.length} 个${params.type === "tags" ? "标签" : "分类"}`
          }
        },
        watch: {
          "$route.params.type"(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.onupdate();
            }
          },
          "$route.params.slug"(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.onupdate();
            }
          }
        },
        methods: {
          async onupdate() {
            const params = this.$route.params;
            if (params.slug) {
              const cate = await fetch(`/api/${params.type}/${params.slug}.json`).then(x => x.json());
              this.posts = cate.data.posts;
            }
            else {
              const cates = await fetch(`/api/${params.type}.json`).then(x => x.json());
              this.cates = cates.data;
            }
          }
        },
        mounted() {
          return this.onupdate();
        }
      }
    }, {
      path: "/archives/:year(\\d+)?/:month(\\d+)?",
      component: {
        template: "#archives-view-template",
        data() {
          return {
            archives: [],
            posts: []
          }
        },
        computed: {
          title() {
            const params = this.$route.params;
            return params.year ? params.month ? `归档：${params.year} 年 ${+params.month} 月` : `归档：${params.year} 年` : "归档";
          },
          subtitle() {
            return this.$route.params.year ? `目前共计 ${this.posts.length} 篇文章` : '';
          }
        },
        watch: {
          "$route.params.year"(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.onupdate();
            }
          },
          "$route.params.month"(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.onupdate();
            }
          }
        },
        methods: {
          async onupdate() {
            const params = this.$route.params;
            if (params.year) {
              if (params.month) {
                const archive = await fetch(`/api/archives/${params.year}/${params.month.padStart(2, '0')}.json`).then(x => x.json());
                this.posts = archive.data.posts;
              }
              else {
                const archive = await fetch(`/api/archives/${params.year}.json`).then(x => x.json());
                this.posts = archive.data.posts;
              }
            }
            else {
              const archives = await fetch("/api/archives.json").then(x => x.json());
              this.archives = archives.data;
            }
          },
          onselectedchange(e) {
            const dataset = e.target.dataset;
            if (dataset.month) {
              this.$router.push(`/archives/${dataset.year}/${dataset.month.padStart(2, '0')}`);
            }
            else {
              this.$router.push(`/archives/${dataset.year}`);
            }
          }
        },
        mounted() {
          return this.onupdate();
        },
        updated() {
          const tree = this.$refs.tree;
          if (tree instanceof HTMLElement && !tree.dataset.mounted) {
            tree.dataset.mounted = true;
            const handleSelectedChange = tree.handleSelectedChange;
            tree.handleSelectedChange = this.onselectedchange;
          }
        }
      }
    }, {
      path: "/search",
      component: {
        template: "#search-view-template",
        data() {
          return {
            localSearch: null,
            searchText: '',
            resultItems: []
          }
        },
        watch: {
          searchText(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.inputEventFunction(newValue);
            }
          }
        },
        methods: {
          inputEventFunction(searchText) {
            const keywords = searchText.split(/[-\s]+/);
            let resultItems = [];
            if (searchText.length > 0) {
              resultItems = this.localSearch.getResultItems(keywords);
            }
            if (resultItems.length) {
              resultItems.sort((left, right) =>
                left.includedCount !== right.includedCount
                  ? right.includedCount - left.includedCount
                  : left.hitCount !== right.hitCount
                    ? right.hitCount - left.hitCount
                    : right.id - left.id);
            }
            this.resultItems = resultItems;
            if (typeof pjax !== "undefined") {
              this.$nextTick(() => pjax.refresh(this.$refs.container));
            }
          }
        },
        async mounted() {
          if (typeof LocalSearch !== "undefined") {
            const localSearch = new LocalSearch({
              path: CONFIG.path,
              top_n_per_article: CONFIG.localsearch.top_n_per_article,
              unescape: CONFIG.localsearch.unescape
            });
            this.localSearch = localSearch;
            await localSearch.fetchData();
          }
        }
      }
    }, {
      path: "/pages/:path*",
      component: {
        template: "#pages-view-template",
        data() {
          return {
            pages: [],
            page: null
          }
        },
        computed: {
          title() {
            return this.page ? this.page.title : "页面";
          },
          subtitle() {
            return this.page ? this.page.description : `目前共计 ${this.pages.length} 个页面`;
          }
        },
        watch: {
          "$route.params.path"(newValue, oldValue) {
            if (newValue !== oldValue) {
              this.onupdate();
            }
          }
        },
        methods: {
          async onupdate() {
            const path = this.$route.params.path;
            if (path instanceof Array) {
              const last = path[path.length - 1];
              const page = await (() => {
                if (last === "index.html") {
                  return fetch(`/api/pages/${path.slice(0, -1).join('/')}.json`).then(x => x.json());
                }
                else if (last.endsWith(".html")) {
                  return fetch(`/api/pages/${path.join('/').replace(/\.html$/, '')}.json`).then(x => x.json());
                }
                else {
                  return fetch(`/api/pages/${path.join('/')}.json`).then(x => x.json());
                }
              })();
              this.page = {
                ...page.data,
                getContent() {
                  const raw = this.raw;
                  let inRow = false;
                  let time = 0, count = 0;
                  let index = 0;
                  for (; index < raw.length; index++) {
                    const c = raw[index];
                    if (inRow) {
                      if (c === '-') {
                        count++;
                      }
                      else {
                        if (count >= 3 && ++time == 2) {
                          return raw.substring(index);
                        }
                        else {
                          inRow = false;
                          count = 0;
                        }
                      }
                    }
                    else if (c === '-') {
                      inRow = true;
                      count++;
                    }
                  }
                  return raw;
                }
              };
              await this.$nextTick();
              const $el = this.$refs.content.$el;
              if (typeof pjax !== "undefined") {
                pjax.refresh($el);
              }
              this.$refs.toc.refresh($el);
            }
            else {
              const pages = await fetch("/api/pages.json").then(x => x.json());
              this.pages = pages.data;
            }
          },
          getUrl(url) {
            return url.startsWith('/')
              ? `/pages${url}`
              : `/pages/${url}`;
          }
        },
        mounted() {
          return this.onupdate();
        }
      }
    }]
  })).component("svg-host", {
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
  }).component("page-title", {
    props: {
      title: String,
      subtitle: String,
      description: String
    },
    watch: {
      title(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.setTitle(newValue);
        }
      },
      subtitle(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.setSubtitle(newValue);
        }
      },
      description(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.setDescription(newValue);
        }
      }
    },
    methods: {
      setTitle(title) {
        title ||= "魔法薇ㄦ的花盆";
        document.title = title;
        const postTitle = document.querySelector(".post-title");
        if (postTitle instanceof HTMLElement) {
          postTitle.innerText = title;
        }
      },
      setSubtitle(subtitle) {
        const postDescription = document.querySelector(".post-description");
        if (postDescription instanceof HTMLElement) {
          postDescription.innerHTML = subtitle ?? '';
        }
      },
      setDescription(description) {
        const meta = document.querySelector("meta[name='description']");
        if (meta instanceof HTMLMetaElement) {
          meta.content = description || "铺路尚未成功，同志仍需努力！";
        }
      }
    },
    mounted() {
      this.setTitle(this.title);
      this.setSubtitle(this.subtitle);
      this.setDescription(this.description);
    }
  }).component("post-card", {
    template: "#post-card-template",
    props: {
      post: Object
    },
    watch: {
      async "post.excerpt"(newValue, oldValue) {
        if (newValue !== oldValue) {
          await this.$nextTick();
          this.onUpdate();
        }
      }
    },
    methods: {
      highlight(element) {
        if (!(element instanceof Element)) { return; }
        const figure = element.querySelectorAll("figure.highlight");
        figure.forEach(element => {
          // Skip pre > .mermaid for folding and copy button
          if (element.querySelector(".mermaid")) return;
          let span = element.querySelectorAll(".code .line span");
          if (span.length === 0) {
            // Hljs without line_number and wrap
            span = element.querySelectorAll("code.highlight span");
          }
          span.forEach(s => {
            s.classList.forEach(name => {
              if (!name.startsWith("hljs-")) {
                s.classList.replace(name, `hljs-${name}`);
              }
            });
          });
        });
      },
      fixImage(element) {
        if (element instanceof Element) {
          const images = element.querySelectorAll("img[data-src]:not([src])");
          if (typeof lozad === "undefined") {
            images.forEach(image => {
              const src = image.getAttribute("data-src");
              if (src) {
                image.removeAttribute("data-src");
                image.setAttribute("src", src);
              }
            });
          }
          else {
            lozad(images).observe();
          }
        }
      },
      onUpdate() {
        const $el = this.$el;
        if ($el instanceof Element) {
          this.highlight($el);
          this.fixImage($el);
          if (typeof pjax !== "undefined") {
            pjax.refresh($el);
          }
        }
      }
    },
    mounted() {
      this.onUpdate();
    }
  }).component("post-detail-card", {
    template: "#post-detail-card-template",
    props: {
      post: Object
    },
    data() {
      return {
        marked: new Marked(
          markedHighlight({
            langPrefix: "hljs language-",
            highlight(code, lang, info) {
              const language = hljs.getLanguage(lang) ? lang : "plaintext";
              return hljs.highlight(code, { language }).value;
            }
          })
        )
      }
    },
    methods: {
      parse(value) {
        return this.marked.parse(value);
      }
    }
  }).component("table-of-contents", {
    props: {
      hidden: Boolean
    },
    data() {
      return {
        sections: []
      }
    },
    watch: {
      $route(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (newValue.query.id) {
            const target = document.getElementById(newValue.query.id);
            if (target instanceof HTMLElement) {
              this.scrollTo(target);
            }
          }
        }
      },
      hidden(newValue, oldValue) {
        if (newValue !== oldValue && newValue && newValue !== "false") {
          this.updateSidebar(false);
        }
      }
    },
    methods: {
      refresh(article) {
        const toc = document.querySelector(".post-toc");
        if (toc instanceof HTMLElement) {
          const html = this.tocHelper(article);
          toc.innerHTML = html;
          if (typeof NexT !== "undefined") {
            const hasTOC = !!html;
            this.updateSidebar(hasTOC);
          }
          this.registerSidebarTOC(article);
          if (this.$route.query.id) {
            const target = article.querySelector(`#${this.$route.query.id}`);
            if (target instanceof HTMLElement) {
              this.scrollTo(target);
            }
          }
        }
      },
      updateSidebar(hasTOC) {
        document.querySelector(".sidebar-inner").classList.toggle("sidebar-nav-active", hasTOC);
        NexT.utils.activateSidebarPanel(hasTOC ? 0 : 1);
        NexT.utils.updateSidebarPosition();
      },
      tocHelper(article) {
        const data = this.queryDomForTocEntries(article);
        if (!data.length) return '';
        const className = "nav";
        const itemClassName = `${className}-item`;
        const linkClassName = `${className}-link`;
        const textClassName = `${className}-text`;
        const childClassName = `${className}-child`;
        const numberClassName = `${className}-number`;
        const levelClassName = `${className}-level`;
        const listNumber = true;
        let result = `<ol class="${className}">`;
        const lastNumber = [0, 0, 0, 0, 0, 0];
        let firstLevel = 0;
        let lastLevel = 0;
        for (let i = 0; i < data.length; i++) {
          const el = data[i];
          const { level, href, text } = el;
          lastNumber[level - 1]++;
          for (let i = level; i <= 5; i++) {
            lastNumber[i] = 0;
          }
          if (firstLevel) {
            for (let i = level; i < lastLevel; i++) {
              result += "</li></ol>";
            }
            if (level > lastLevel) {
              result += `<ol class="${childClassName}">`;
            }
            else {
              result += "</li>";
            }
          }
          else {
            firstLevel = level;
          }
          result += `<li class="${itemClassName} ${levelClassName}-${level}">`;
          if (href) {
            result += `<a class="${linkClassName}" href="${href}">`;
          }
          else {
            result += `<a class="${linkClassName}">`;
          }
          if (listNumber) {
            result += `<span class="${numberClassName}">`;
            for (let i = firstLevel - 1; i < level; i++) {
              result += `${lastNumber[i]}.`;
            }
            result += "</span> ";
          }
          result += `<span class="${textClassName}">${text}</span></a>`;
          lastLevel = level;
        }
        for (let i = firstLevel - 1; i < lastLevel; i++) {
          result += "</li></ol>";
        }
        return result;
      },
      queryDomForTocEntries(article) {
        if (!(article instanceof Element)) { return []; }
        const headings = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
        if (!headings.length) { return []; }
        const basePath = this.$route.path;
        function createAnchor(element) {
          return {
            level: +element.nodeName[1],
            text: element.innerText || element.textContent,
            href: `#${basePath}?id=${element.id}`,
            anchors: []
          };
        }
        const tocArray = [];
        let chapter = null, subchapter = null;
        for (const element of headings) {
          if (!element.id) {
            const anchorText = element.innerText || element.textContent;
            const elementId = anchorText.replaceAll(' ', '-', '/', '\\', '#', '$', '@', ':', ',').toLowerCase();
            element.id = elementId;
          }
          if (element.innerText || element.textContent) {
            tocArray.push(createAnchor(element));
          }
        }
        return tocArray;
      },
      registerSidebarTOC(article) {
        if (typeof NexT === "undefined") { return; }
        const basePath = this.$route.path;
        const sections = [...document.querySelectorAll(".post-toc:not(.placeholder-toc) li a.nav-link")].map(element => {
          const target = article.querySelector(`#${element.getAttribute("href").replace(`#${basePath}?id=`, '')}`);
          // TOC item animation navigate.
          element.addEventListener("click", event => {
            event.preventDefault();
            this.scrollTo(target, () => history.pushState(null, document.title, element.href));
          });
          return target;
        });
        if (typeof NexT !== "undefined") {
          NexT.utils.sections = sections;
          NexT.utils.updateActiveNav();
        }
      },
      scrollTo(target, complete) {
        const offset = target.getBoundingClientRect().top + window.scrollY;
        window.anime({
          targets: document.scrollingElement,
          duration: 500,
          easing: "linear",
          scrollTop: offset,
          complete: complete
        });
      }
    },
    mounted() {
      if (this.hidden && this.hidden !== "false") {
        this.updateSidebar(false);
      }
    },
  }).mount("#vue-app");
</script>

<style>
  #vue-app {
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

  #vue-app .search-result-container li {
    list-style: none;
  }

  #vue-app .search-result-container p {
    margin: 0;
  }

  .svg-host {
    display: flex;
  }

  .clickable-card {
    cursor: pointer;
    display: block;
    box-sizing: border-box;
    padding: calc(var(--design-unit) * 4px);
    background: var(--neutral-fill-input-rest);
    color: var(--neutral-foreground-rest);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-rest);
    border-radius: calc(var(--control-corner-radius) * 1px);
    box-shadow: var(--elevation-shadow-card-rest);
    text-decoration: inherit;
  }

  .clickable-card:hover {
    background: var(--neutral-fill-input-hover);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-hover);
    box-shadow: var(--elevation-shadow-card-hover);
  }

  .clickable-card:active {
    background: var(--neutral-fill-input-active);
    border: calc(var(--stroke-width) * 1px) solid var(--neutral-stroke-layer-active);
    box-shadow: var(--elevation-shadow-card-pressed);
  }

  .post-card img.emoji,
  .post-detail-card img.emoji {
    height: 18px;
    width: 18px;
  }

  .post-card figcaption,
  .post-detail-card figcaption {
    color: var(--neutral-foreground-hint);
    font-size: 0.875em;
    font-weight: bold;
    line-height: 1;
    margin: auto auto 15px;
    text-align: center;
  }
</style>