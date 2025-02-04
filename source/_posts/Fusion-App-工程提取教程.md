---
title: Fusion App 工程提取教程
date: 2018-04-15 21:45:35
tags: [Lua, Fusion App, 开发, 逆向, 教程]
categories: 开发
banner: https://github.com/user-attachments/assets/c6591bdc-d19c-442b-8dce-285965051026
---
![Fusion App 工程提取教程](https://github.com/user-attachments/assets/c6591bdc-d19c-442b-8dce-285965051026)

[#酷安夜话#](https://www.coolapk.com/t/酷安夜话) [#FusionApp#](https://www.coolapk.com/t/FusionApp) [#玩机技巧#](https://www.coolapk.com/t/玩机技巧)

第一次写图文，欢迎大家指正，也期望大家能够关注我[@wherewhere](https://www.coolapk.com/u/wherewhere)，这里提供一个tg群<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(滑稽).png" alt="滑稽" />（[https://t.me/FusionApp](https://t.me/FusionApp)）

Fusion App是什么我在这里就不重复了，实际上这篇教程我很早就想写了，结果因为酷安的一个小bug把我的兴致全弄没了，酷安写图文没有定时保存机制，结果酷安自动换了主题，我写的东西就全没了<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(阴险).png" alt="阴险" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(阴险).png" alt="阴险" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(阴险).png" alt="阴险" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(阴险).png" alt="阴险" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(泪).png" alt="泪" />。

废话不多说，正文开始<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />。

Fusion App发布已经有很长时间了，这期间也出现了很多优秀的作品，有些作者在发布的时候一到把工程文件发了出来，也有些作者没有，但如何取得工程文件呢？有些酷友肯定会直接找作者要源码，实际上不需要这么复杂，还有可能会被拒绝<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />，实际上只需要拿到他发的apk安装包就行了<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/[doge原谅ta].png" alt="doge原谅ta" />。

<style>
  img.emoji {
    height: 20px;
    width: 20px;
    margin-bottom: -4px !important;
    display: inline;
  }
</style>
<!--more-->
<style>
  figcaption.figure {
    color: #999;
    font-size: 0.875em;
    font-weight: bold;
    line-height: 1;
    margin: 5px auto 15px;
    text-align: center;
  }

  p+figcaption.figure,
  p+div.code-line+.figure {
    margin: -15px auto 15px;
  }

  @media (max-width: 567px) {
    .post-body p+figcaption.figure {
      margin: -5px auto 15px;
    }
  }
</style>

![对话](https://github.com/user-attachments/assets/9ed46191-15f3-49dd-bcd3-cedcf3e4c419)
<figcaption class="figure">有人找我要代码，可是我是抄的哇！😕</figcaption>

好，现在正文真的开始了。<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(稽滑).png" alt="稽滑" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(斗鸡眼滑稽).png" alt="斗鸡眼滑稽" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(滑稽).png" alt="滑稽" /></p>

需要的工具：

- 一个可以打开zip压缩包的设备（这里以Android设备为例）；
- 一个可以用来打开zip压缩包的软件（这里以MT文件管理器为例）；
- 一个用Fusion App做的应用（以我做的APKMirror 为例）<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />；
- 一些时间🤓。

正文真的开始了，第一步，找到那个用Fusion App做的应用的apk安装包

![安装包](https://github.com/user-attachments/assets/8ee40f4e-653d-42bd-ba28-0f7df0ad3b56)
<figcaption class="figure">安装包长这样🏵️🐔</figcaption>

翻到`/assets/`

![/assets/](https://github.com/user-attachments/assets/4519c036-6ae0-466d-82e7-be078fe2bd6c)
<figcaption class="figure">翻到<code>/assets/</code>（这张图就是我上次打算写教程时截的，结果全没了😫😫😫😫😫😫😫😫😫😫😫😫😫）</figcaption>

到这里大家应该就清楚是怎么回事了，是不是感觉有点熟悉？/滑稽

![项目](https://github.com/user-attachments/assets/c9b17f27-97b8-479f-b462-25ed803b0c7e)
<figcaption class="figure">还是上次截的😓</figcaption>

没错，这就是fs的工程目录里放的东西，没看出来也没关系，我们继续  
把这些文件直接倒到`/storage/emulated/0/FusionApp/Project/**********`（这里的名称可以随便填，只要和其他的不一样但是位数一样就行了，以`1522415531`为例）

![复制](https://github.com/user-attachments/assets/3eb0200d-ee78-482c-a404-4c5417741877)
<figcaption class="figure">复制过去</figcaption>

到这里就结束了，打开Fusion App，你要的东西已经静静的待在那里了，如果没有，就结束进程再进去，如果报错，那就是作者的问题了。

![完成](https://github.com/user-attachments/assets/c3438d2a-2ece-4ab1-bec4-2f1a8713113e)
<figcaption class="figure">最后一个就是刚刚加的</figcaption>

如果有什么问题，可以直接评论，也可以加这个tg群（[https://t.me/FusionApp](https://t.me/FusionApp)），如果我看到了会回复的，当然得是我能解决的。

最后感谢[@寒歌](https://www.coolapk.com/u/寒歌)为我们带来了Fusion App，[@pandecheng](https://www.coolapk.com/u/pandecheng)顺道感谢一下吧/滑稽

> [Fusion App 工程提取教程](https://www.coolapk.com/feed/6170506?shareKey=MzQzMzNiNDgxOWRkNjYzMTI0MWU) 作者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2018年4月15日 发表于 [酷安](https://www.coolapk.com "Coolapk")，转载请注明出处
