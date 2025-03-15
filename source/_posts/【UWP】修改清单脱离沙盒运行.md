---
title: 【UWP】修改清单脱离沙盒运行
date: 2024-05-03 16:37:00
updated: 2024-05-03 18:05:00
tags: [UWP, .NET, C#, 开发, 教程]
categories: 开发
---
众所周知，UWP 是运行在沙盒里面的，所有权限都有严格限制，和沙盒外交互也需要特殊的通道，所以从根本杜绝了 UWP 毒瘤的存在。但是实际上 UWP 只是一个应用模型，本身是没有什么权限管理的，权限管理全靠 App Container 沙盒控制，如果我们脱离了这个沙盒，UWP 就会放飞自我了。那么有没有这种可能呢？

我们打开设置应用，通过任务管理器查看进程，就会发现它并没有 Runtime Broker 存在，这个进程是用来在沙盒间代理的，这说明微软给 UWP 开了一个后门。

![任务管理器](https://github.com/user-attachments/assets/b08540d0-de83-4afe-9a7c-c4e02decde4c)

那么我们是不是也有办法脱离沙盒运行呢？[Ahmed Walid](https://twitter.com/AhmedWalid605 "@AhmedWalid605") 在 2023年2月 发表了这样一个[帖子](https://twitter.com/AhmedWalid605/status/1622010165053607943 "推文")：<!--more-->

![推文](https://github.com/user-attachments/assets/d403d7b3-f172-4be9-96e9-73d738f8989c)

同时他还提交了一个名为 [Added a remark about uap10:TrustLevel](https://github.com/MicrosoftDocs/winrt-related/pull/ "Added a remark about uap10:TrustLevel") 的 PR，在这个 PR 中明确提到了如何通过设置 Custom Capability 来修改 UWP 的 TrustLevel

> Setting `uap10:TrustLevel="mediumIL"` while `uap10:RuntimeBehavior="windowsApp"` requires the `Microsoft.coreAppActivation_8wekyb3d8bbwe` Custom Capability.
>
> This is also true if `uap10:TrustLevel="mediumIL"` and `EntryPoint` is any other value than `"windows.fullTrustApplication"` or `"windows.partialTrustApplication"`.
>
> You can read more about this custom capability here in [Custom Capabilities](https://learn.microsoft.com/zh-cn/windows/uwp/packaging/app-capability-declarations#custom-capabilities "Custom Capabilities").

如今这个 PR 已经合并，现在可以直接在微软文档[《应用程序 (Windows 10)》](https://learn.microsoft.com/zh-cn/uwp/schemas/appxpackage/uapmanifestschema/element-application#combinations-of-activation-info-attributes "激活信息属性的组合")中找到了

根据文档描述，我们需要添加一个名为 `Microsoft.coreAppActivation_8wekyb3d8bbwe` 的自定义权限，然后将 `uap10:TrustLevel` 设置为 `mediumIL` 即可

首先我们在清单中加入权限

```xml
<?xml version="1.0" encoding="utf-8"?>
<Package
  ...
  xmlns:uap4="http://schemas.microsoft.com/appx/manifest/uap/windows10/4"
  xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities"
  IgnorableNamespaces="... uap4 rescap">
  ...
  <Capabilities>
    ...
    <!-- runFullTrust 权限是必不可少的 -->
    <rescap:Capability Name="runFullTrust" />
    <uap4:CustomCapability Name="Microsoft.coreAppActivation_8wekyb3d8bbwe" />
  </Capabilities>
</Package>
```

Custom Capability 不同于其他权限，这是用来给 OEM 自定义使用的，需要 SCCD 文件来证明你有使用权限的资格，所以想上架是基本没可能了，相关内容可以查看教程 [\[UWP\] Custom Capability的使用](https://www.cnblogs.com/cjw1115/p/7884876.html "[UWP] Custom Capability的使用")

我们在项目根目录新建一个名为 `CustomCapability.SCCD` 的文件，在其中写入

```xml
<?xml version="1.0" encoding="utf-8"?>
<CustomCapabilityDescriptor xmlns="http://schemas.microsoft.com/appx/2018/sccd" xmlns:s="http://schemas.microsoft.com/appx/2018/sccd">
  <CustomCapabilities>
    <CustomCapability Name="Microsoft.coreAppActivation_8wekyb3d8bbwe"></CustomCapability>
  </CustomCapabilities>
  <AuthorizedEntities AllowAny="true"/>
  <Catalog>FFFF</Catalog>
</CustomCapabilityDescriptor>
```

然后将该文件设置为内容，或者选择复制到输出，只要最后能出现在安装包里面就行了

最后我们将 `uap10:TrustLevel` 设置为 `mediumIL`

```xml
<?xml version="1.0" encoding="utf-8"?>
<Package
  ...
  xmlns:uap10="http://schemas.microsoft.com/appx/manifest/uap/windows10/10"
  IgnorableNamespaces="... uap10">
  ...
  <Applications>
    <Application
      ...
      uap10:TrustLevel="mediumIL">
      ...
    </Application>
  </Applications>
  ...
</Package>
```

我们调用`Process.GetProcesses()`获取进程列表（`UAP 10.0.15138.0`虽然加入了`Process`支持，但是并没有实现`Process`.`GetProcesses()`，所以这里是运行在 .NET 8.0 上的

```cs
using Microsoft.UI.Xaml.Controls;
using System.Diagnostics;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace FullTrustUWP.Pages
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage() => InitializeComponent();

        public void Test()
        {
            // 这里使用了 Windows App SDK，实际上 WAS 是支持 UWP 的
            Content = new ItemsView
            {
                // 必须使用 .NET Core App，因为微软没有给 .NET Core 5.0 实现这个方法
                ItemsSource = Process.GetProcesses()
            };
        }
    }
}
```

运行效果

![Snipaste_2024-05-03_17-46-15](https://github.com/user-attachments/assets/7a0c3308-1f7e-4ebb-a702-5bf51eab8705)

如果没有设置`uap10:TrustLevel` 为 `mediumIL`，则依然运行在沙盒中，`Process.GetProcesses()`只能获取到沙盒中的进程

![无权限](https://github.com/user-attachments/assets/c102c39f-d48f-4115-8d0c-5725e5f38a1f)

> [【UWP】修改清单脱离沙盒运行](https://www.cnblogs.com/wherewhere/p/18171253) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2024年4月17日 发表于 [博客园](https://home.cnblogs.com "CNBlogs")，转载请注明出处
