---
title: 【UAP】使用 .NET Core App 编写 UAP
date: 2025-03-13 18:44:00
tags: [UAP, .NET, C#, 开发, 教程]
categories: 开发
---
众所周知，2024年9月微软正式宣布了 .NET Core App 的 UWP 支持，至此我们终于可以在新版 csproj 用 .NET 8 及以上编写 UWP 了，那么我们可不可以通过修改清单的方式来让 UWP 变成 UAP 呢？

![屏幕截图(785)](https://github.com/user-attachments/assets/d8bdc64a-7a57-4c7c-861d-3a0b8b0f91ef)

UWP 和 UAP 使用的是同一套 WinRT API ，Windows 区分 UAP 和 UWP 的方式是看清单，只要是用 UAP 的清单就会仿真成 Win8.1 模式，于是我们只需要将清单变成 UAP 的样子就行了。所以首先我们新建一个 .NET 9 Native AOT 的 UWP 项目

![Snipaste_2025-03-13_17-52-59](https://github.com/user-attachments/assets/4b9220a9-8fb6-4486-9f84-be58c4ed2c87)

然后我们修改清单，Win8 App 清单如下，内容按需填写，Win8.1 App 的清单可以通过在 Github 搜索 `OSMaxVersionTested language:XML` 找到，`6.2` 是 Win8，`6.3` 是 Win8.1 (`$targetentrypoint$` 需配合 `ApplicationEntryPoint` 使用)<!--more-->

```xml
<?xml version="1.0" encoding="utf-8"?>

<Package xmlns="http://schemas.microsoft.com/appx/2010/manifest">

  <Identity
    Name="wherewhere.CoreAppUAP"
    Publisher="CN=where"
    Version="0.0.1.0" />

  <Properties>
    <DisplayName>CoreAppUAP</DisplayName>
    <PublisherDisplayName>wherewhere</PublisherDisplayName>
    <Logo>Assets\StoreLogo.png</Logo>
  </Properties>

  <Prerequisites>
    <OSMinVersion>6.2.0</OSMinVersion>
    <OSMaxVersionTested>6.3.0</OSMaxVersionTested>
  </Prerequisites>

  <Resources>
    <Resource Language="x-generate"/>
  </Resources>

  <Applications>
    <Application Id="App"
      Executable="$targetnametoken$.exe"
      EntryPoint="$targetentrypoint$">
      <VisualElements
        DisplayName="CoreAppUAP"
        Logo="Assets\MediumTile.png"
        SmallLogo="Assets\AppIcon.png"
        Description="CoreAppUAP"
        ForegroundText="light"
        BackgroundColor="transparent">
        <DefaultTile WideLogo="Assets\WideTile.png"/>
        <SplashScreen Image="Assets\SplashScreen.png"/>
        <InitialRotationPreference>
          <Rotation Preference="landscape"/>
          <Rotation Preference="portrait"/>
          <Rotation Preference="landscapeFlipped"/>
          <Rotation Preference="portraitFlipped"/>
        </InitialRotationPreference>
        <LockScreen Notification="badgeAndTileText" BadgeLogo="Assets\BadgeLogo.png"/>
      </VisualElements>
    </Application>
  </Applications>

  <Capabilities>
    <Capability Name="internetClient" />
  </Capabilities>
</Package>
```

然后我们在 `csproj` 中添加以下内容来取消引用 `VC++` 和 `TargetDeviceFamily`

```xml
<PropertyGroup>
  <AddMicrosoftVCLibsSDKReference>False</AddMicrosoftVCLibsSDKReference>
  <EnableAppxWindowsUniversalTargetDeviceFamilyItem>False</EnableAppxWindowsUniversalTargetDeviceFamilyItem>
</PropertyGroup>
```

不过删除了这些引用仍然会在清单生成 `Dependencies` 标签，如果 `Dependencies` 是空的注册时会报错，所以我们需要添加任务来删除清单中的 `Dependencies` 元素

```xml
<UsingTask
  TaskName="RemoveDependencies"
  TaskFactory="CodeTaskFactory"
  AssemblyFile="$(MSBuildToolsPath)\Microsoft.Build.Tasks.Core.dll">
  <ParameterGroup>
    <AppxManifestPath ParameterType="System.String" Required="true" />
  </ParameterGroup>
  <Task>
    <Reference Include="System.Xml" />
    <Reference Include="System.Xml.Linq" />
    <Using Namespace="System.Linq" />
    <Using Namespace="System.Xml.Linq" />
    <Code Type="Fragment" Language="cs">
      <![CDATA[
          try
          {
              var xdoc = XDocument.Load(AppxManifestPath);
              var ns = xdoc.Root.Name.Namespace;
              var dependencies = xdoc.Root.Descendants(ns + "Dependencies");
              if (dependencies != null)
              {
                  foreach (var node in dependencies.ToArray())
                  {
                      if (!node.HasElements)
                      {
                          node.Remove();
                      }
                  }
              }
              xdoc.Save(AppxManifestPath);
          }
          catch
          {
              Log.LogError("Failed to load Appx Manifest.");
              _Success = false;
          }
      ]]>
    </Code>
  </Task>
</UsingTask>

<Target
  Name="RemoveDependencies"
  AfterTargets="AfterGenerateAppxManifest">
  <Message Importance="high" Text="RemoveDependencies" />
  <RemoveDependencies AppxManifestPath="%(FinalAppxManifest.Identity)" />
</Target>
```

由于 XAML 编译器编译 `App.xaml` 时生成的入口点会使用 `DispatcherQueueSynchronizationContext` 来注册线程上下文，这是 `16299` 才加入的 API，UAP 在获取 `DispatcherQueue` 时会返回 `null`，所以我们需要手动生成入口点和注册线程上下文

首先我们需要添加 `DISABLE_XAML_GENERATED_MAIN` 来注释自动生成的入口点

```xml
<DefineConstants>$(DefineConstants);DISABLE_XAML_GENERATED_MAIN</DefineConstants>
```

然后手动编写程序入口点

```cs
public static class Program
{
    public static void Main(string[] args) => Application.Start(static p => _ = new App());
}
```

接着我们需要手动创建一个使用 `CoreDispatcher` 的线程上下文

```cs
/// <summary>
/// Provides a synchronization context for <see cref="CoreDispatcher"/>.
/// </summary>
/// <param name="dispatcher">The <see cref="CoreDispatcher"/> to associate this <see cref="CoreDispatcherSynchronizationContext"/> with.</param>
public sealed class CoreDispatcherSynchronizationContext(CoreDispatcher dispatcher) : SynchronizationContext
{
    /// <inheritdoc />
    public override void Post(SendOrPostCallback d, object? state)
    {
        ArgumentNullException.ThrowIfNull(d);
        _ = dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => d.Invoke(state));
    }

    /// <inheritdoc />
    public override SynchronizationContext CreateCopy() => new CoreDispatcherSynchronizationContext(dispatcher);

    /// <inheritdoc />
    public override void Send(SendOrPostCallback d, object? state) => throw new NotSupportedException("'SynchronizationContext.Send' is not supported.");
}
```

并在合适的时间注册线程上下文，比如 `OnWindowCreated`

```cs
protected override void OnWindowCreated(WindowCreatedEventArgs e)
{
    if (SynchronizationContext.Current == null)
    {
        CoreDispatcherSynchronizationContext context = new(e.Window.Dispatcher);
        SynchronizationContext.SetSynchronizationContext(context);
    }
    base.OnWindowCreated(e);
}
```

然后就可以点运行运行了

![Snipaste_2025-03-13_18-19-11](https://github.com/user-attachments/assets/9f1e235a-ac73-4477-bb24-a12942b5e1ba)

经测试，热重载等调试功能正常，UAP 可以调用一些与 UI 无关的新 WinRT API，甚至可以扩展标题栏，不过打包后无法成功在 Win8.1 安装，原因未知

![Snipaste_2025-03-13_18-23-46](https://github.com/user-attachments/assets/c40b031f-2f83-4349-9b76-6971c99555e3)

最后附上示例应用：https://github.com/wherewhere/CoreAppUAP

> [【UAP】使用 .NET Core App 编写 UAP](https://www.cnblogs.com/wherewhere/p/18770443) 作者 [@where-where](https://home.cnblogs.com/u/wherewhere) 2025年3月13日 发表于 [博客园](https://www.cnblogs.com "CNBlogs")，转载请注明出处
