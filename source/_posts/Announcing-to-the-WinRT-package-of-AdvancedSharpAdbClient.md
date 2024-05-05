---
title: Announcing to the WinRT package of AdvancedSharpAdbClient
date: 2023-07-19 15:37:25
updated: 2023-07-24 05:16:44
tags: [.NET, WinRT, ADB, 公告, 资源, 教程]
categories: 公告
---
##  Announcing
We have packaged this project into winrt. With the winrt version, we can use it in cpp/winrt and other projects. You can find the winrt version in [`winrt branch`](https://github.com/yungd1plomat/AdvancedSharpAdbClient/tree/winrt).

## How to use it
There are two way to reference it.

- Reference to the project directly

  Fork this repository and change the branch to `winrt`.

  - If your project is face to uwp, add this to your `.vcproj`
    ```xml
    <ProjectReference Include="\path\to\AdvancedSharpAdbClient.WinRT.csproj">
      <Project>{083cdc04-9cc2-46e4-84c2-55b645be9d50}</Project>
      <SetTargetFramework>TargetFramework=uap10.0</SetTargetFramework>
    </ProjectReference>
    ```

  - If your project is face to desktop, add this to your `.vcproj`
    ```xml
    <ProjectReference Include="\path\to\AdvancedSharpAdbClient.WinRT.csproj">
      <Project>{083cdc04-9cc2-46e4-84c2-55b645be9d50}</Project>
      <SetTargetFramework>TargetFramework=net6.0-windows10.0.17763.0</SetTargetFramework>
    </ProjectReference>
    ```

- Reference to the nuget package

  Download [AdvancedSharpAdbClient.WinRT.zip](https://github.com/yungd1plomat/AdvancedSharpAdbClient/files/12092217/AdvancedSharpAdbClient.WinRT.0.0.1.zip).

  Unzip it into `nupkgs` folder of the root path of your project
  ![image](https://github.com/yungd1plomat/AdvancedSharpAdbClient/assets/27689196/da648eb2-d505-4fd2-ac78-f534f1ad018b)

  Create `nuget.config` into the root path of your project and add
  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <configuration>
    <packageSources>
      <add key="Offline Nugets" value="nupkgs" />
    </packageSources>
  </configuration>
  ```

  Open the manager of nuget and you will find it. Just install it like a normal nuget.
  ![image](https://github.com/yungd1plomat/AdvancedSharpAdbClient/assets/27689196/7d2ce405-5879-42e1-a27d-191a37ebb8f4)

After that, if your project is not packaged into appx or misx, remember to create `ProjectName.exe.manifest` in the root of your project to register winrt class.
```xml
<?xml version="1.0" encoding="utf-8"?>
<assembly manifestVersion="1.0" xmlns="urn:schemas-microsoft-com:asm.v1">
  <assemblyIdentity version="1.0.0.0" name="ProjectName"/>
  <file name="WinRT.Host.dll">
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.AdbClient"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.AdbCommandLineClient"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.AdbServer"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.AdbServerFeatures"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.AdbSocket"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.CrossPlatformFunc"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.DateTimeHelper"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.DeviceMonitor"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.Factories"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.SyncCommandConverter"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.SyncService"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.TcpSocket"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.DeviceCommands.LinuxPath"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.DeviceCommands.PackageManager"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
    <activatableClass
      name="AdvancedSharpAdbClient.WinRT.Logs.LogReader"
      threadingModel="both"
      xmlns="urn:schemas-microsoft-com:winrt.v1" />
  </file>
</assembly>
```

> [Announcing to the WinRT package of AdvancedSharpAdbClient](https://github.com/SharpAdb/AdvancedSharpAdbClient/issues/63) 作者 [@wherewhere](https://github.com/wherewhere "where where") 2023年7月19日 发表于 [GitHub](https://github.com)，转载请注明出处
