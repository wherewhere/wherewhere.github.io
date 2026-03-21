---
title: 【UWP】使用 Vue/Vite 编写 WinJS/UWP
date: 2026-03-21 09:56:00
tags: [UWP, JS, WinJS, Web, 开发, 教程]
categories: 开发
---
如今微软网页套壳越来越变本加厉，到处都是一人一个浏览器，套壳大小已经成百上千，但殊不知微软曾经有过对网页套壳的原生支持，打包大小只按k记，那就是 MSAppHost 了，不过更为人所知的是其控件库 WinJS，所以这里就用 WinJS 代指 JS/HTML 模式的 UWP 了。WinJS/UWP 本质就是直接让 Edge (过去为 IE) 的 WebView 直接打开打包好的网页，同时给这个环境加上 WinRT 支持，由于 MSAppHost 是系统组件，所以只用打包 Web 资源就行了。WinJS 曾作为 WSA (Windows Store App) 的主推平台，甚至 Win8 应用商店都是 JS/HTML 开发的，不过在进入 Win10 之后，有了 .NET Native 的加持，C#/UWP 逐渐变为主流，MSAppHost 基本上只剩下了作为 PWA 的用途。然而随着 Edge HTML 的停更，Windows 再也没有了原生的 HTML 渲染平台，微软也在 VS 2019 中彻底删除了对 WinJS 的支持。

![屏幕截图(911)](https://images.weserv.nl/?url=https://img2024.cnblogs.com/blog/2662465/202603/2662465-20260318191241607-1755884115.png)

不过 MSAppHost 框架作为系统组件并没有被删除，利用 [`electron-windows-msix`](https://www.npmjs.com/package/electron-windows-msix "electron-windows-msix") 插件，我们可以轻松打包一个 NPM 项目，我们只需要将清单改为 MSAppHost 模式即可。接下来我们将演示如何新建一个 Vue/UWP 项目。<!--more-->

首先我们根据 [Vue 官方教程](https://cn.vuejs.org/guide/quick-start "quick-start")新建一个空白 Vue 项目：

```bash
npm create vue@latest
```

进入项目文件夹后安装依赖：

```bash
npm i
```

然后我们测试一下它是否可以正常运行：

```bash
npm run dev
```

![Snipaste_2026-03-18_16-39-44](https://images.weserv.nl/?url=https://img2024.cnblogs.com/blog/2662465/202603/2662465-20260318164033943-1972265517.png)

由于 MSAppHost 永远留在了 Edge HTML 18，所以我们需要把 JS 编译到 Edge 18 兼容的版本，安装 [`@vitejs/plugin-legacy`](https://www.npmjs.com/package/@vitejs/plugin-legacy "@vitejs/plugin-legacy")：

```bash
npm i --save-dev @vitejs/plugin-legacy
```

在 `vite.config.ts` 配置插件，由于 `vite` 使用到了新版 ESM 模块特性，所以 Edge 只能使用 Legacy 模式，注意 `base` 一定要设置为 `./`，因为打包插件会把编译结果打包进 `app` 文件夹：

```ts
import legacy from '@vitejs/plugin-legacy'
...
export default defineConfig({
  base: './',
  plugins: [
    ...
    legacy({
      targets: 'Edge >= 18',
      polyfills: true,
      renderModernChunks: false
    })
  ],
  ...
})
```

验证可以正常运行后，我们安装 [`electron-windows-msix`](https://www.npmjs.com/package/electron-windows-msix "electron-windows-msix") 插件：

```bash
npm i --save-dev electron-windows-msix
```

然后编写打包脚本，可以参考 [`package.mjs`](https://github.com/wherewhere/VueForUWP/blob/main/package.mjs "package.mjs")：

```js
import { packageMSIX } from "electron-windows-msix";

/** @type {import("electron-windows-msix").WindowsSignOptions} */
let windowsSignOptions = undefined;
const certificateFileIndex = process.argv.indexOf("--certificateFile");
if (certificateFileIndex != -1) {
    windowsSignOptions = {
        certificateFile: process.argv[certificateFileIndex + 1]
    };
    const certificatePasswordIndex = process.argv.indexOf("--certificatePassword");
    if (certificatePasswordIndex != -1) {
        windowsSignOptions.certificatePassword = process.argv[certificatePasswordIndex + 1];
    }
    const timestampServerIndex = process.argv.indexOf("--timestampServer");
    if (timestampServerIndex != -1) {
        windowsSignOptions.timestampServer = process.argv[timestampServerIndex + 1];
    }
}

const { msixPackage } = await packageMSIX({
    appManifest: "AppxManifest.xml",
    appDir: "dist",
    packageAssets: "assets",
    outputDir: "appx",
    packageName: "VueForUWP.msix",
    windowsKitVersion: "10.0.26100.0",
    windowsSignOptions,
    sign: !!windowsSignOptions
});
console.log(`MSIX package created at: ${msixPackage}`);
```

其中 `appManifest` 是 Appx 清单的路径；`appDir` 是 `vite` 编译结果文件夹；`packageAssets` 是 Appx 资源文件夹，如果不设置会使用插件默认的资源，下面的 Appx 清单使用的就是默认资源；`windowsKitVersion` 需要选择已安装的 Windows SDK 版本。

由于默认清单是 FullTrust Win32 打包项目，所以我们需要手动编写清单，新建 [`AppxManifest.xml`](https://github.com/wherewhere/VueForUWP/blob/main/AppxManifest.xml "AppxManifest.xml") 文件：

```xml
<?xml version="1.0" encoding="utf-8"?>

<Package
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest"
  xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
  xmlns:uap5="http://schemas.microsoft.com/appx/manifest/uap/windows10/5"
  IgnorableNamespaces="uap uap5 mp">

  <Identity Name="wherewhere.VueForUWP"
    Publisher="CN=where"
    Version="0.0.1.0" />

  <mp:PhoneIdentity PhoneProductId="2d5eb3c5-2697-7f48-4085-ba24fba35ad1"
    PhonePublisherId="00000000-0000-0000-0000-000000000000" />

  <Properties>
    <DisplayName>VueForUWP</DisplayName>
    <PublisherDisplayName>wherewhere</PublisherDisplayName>
    <Logo>assets\icon.png</Logo>
  </Properties>

  <Dependencies>
    <TargetDeviceFamily Name="Windows.Universal" MinVersion="10.0.18362.0"
      MaxVersionTested="10.0.26100.0" />
  </Dependencies>

  <Resources>
    <Resource Language="en-us" />
  </Resources>

  <Applications>
    <Application Id="VueForUWP" StartPage="ms-appx-web:///app/index.html">
      <uap:VisualElements
        DisplayName="VueForUWP"
        Description="UWP running with vue.js 3.0"
        BackgroundColor="transparent"
        Square150x150Logo="assets\Square150x150Logo.png"
        Square44x44Logo="assets\Square44x44Logo.png">
        <uap:DefaultTile
          Wide310x150Logo="assets\Wide310x150Logo.scale-200.png">
          <uap:ShowNameOnTiles>
            <uap:ShowOn Tile="square150x150Logo" />
          </uap:ShowNameOnTiles>
        </uap:DefaultTile>
        <uap:SplashScreen Image="assets\SplashScreen.scale-200.png" uap5:Optional="true" />
        <uap:InitialRotationPreference>
          <uap:Rotation Preference="landscape" />
          <uap:Rotation Preference="portrait" />
          <uap:Rotation Preference="landscapeFlipped" />
          <uap:Rotation Preference="portraitFlipped" />
        </uap:InitialRotationPreference>
      </uap:VisualElements>
      <uap:ApplicationContentUriRules>
        <uap:Rule Match="ms-appx-web:///" Type="include" WindowsRuntimeAccess="all" />
      </uap:ApplicationContentUriRules>
    </Application>
  </Applications>

  <Capabilities>
    <Capability Name="internetClient" />
  </Capabilities>
</Package>
```

然后编写部署脚本，可以参考 [`deploy.mjs`](https://github.com/wherewhere/VueForUWP/blob/main/deploy.mjs "deploy.mjs")：

```js
import { powershell } from "electron-windows-msix/lib/powershell.js";

const results = await powershell("Add-AppxPackage -Path appx/msix_layout/AppxManifest.xml -Register");
console.log(results);
```

 最后在 `package.json` 中添加打包和部署指令：

```json
{
  ...
  "scripts": {
    ...
    "pack": "npm run build && node package.mjs",
    "deploy": "node deploy.mjs"
  },
  ...
}
```

现在我们可以通过执行 `npm run pack` 打包项目，用 `npm run deploy` 部署项目了。

![Snipaste_2026-03-18_17-41-16](https://images.weserv.nl/?url=https://img2024.cnblogs.com/blog/2662465/202603/2662465-20260318174954021-79782670.png)

由于 MSAppHost 永远留在了 Edge HTML 18，所以新的 Vue 样式库基本上都无法使用，为了符合 Windows 样式，还是建议使用 WinJS 控件库，可以在这里找到示例：[https://github.com/wherewhere/VueForUWP](https://github.com/wherewhere/VueForUWP "VueForUWP")

![Snipaste_2026-03-18_17-54-28](https://images.weserv.nl/?url=https://img2024.cnblogs.com/blog/2662465/202603/2662465-20260318175449819-154943467.png)

> [【UWP】使用 Vue/Vite 编写 WinJS/UWP](https://www.cnblogs.com/wherewhere/p/19430420) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2026年3月21日 发表于 [博客园](https://www.cnblogs.com "CNBlogs")，转载请注明出处
