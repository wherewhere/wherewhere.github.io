---
title: 【开源】APK Installer —— 一个适用于 Windows 的 Android 应用安装程序
date: 2022-01-05 14:50:37
updated: 2022-02-13 14:43:29
tags: [WAS, WPF, WOA, Win11, APK, 资源]
categories: 资源
---
# APK Installer

一个适用于 WIndows 的 Android 应用安装程序

[![Crowdin](https://badges.crowdin.net/APKInstaller/localized.svg)](https://crowdin.com/project/APKInstaller) [![Crowdin](https://badges.crowdin.net/APK-Installer-Classic/localized.svg)](https://crowdin.com/project/APK-Installer-Classic)

## 注意

- 本应用已上架应用商店，请认准作者为 wherewhere，请不要使用来历不明的版本，如果因为使用不明版本而出现的故障请自行解决。
- 本应用分为 [WinUI3版](https://github.com/Paving-Base/APK-Installer) 和 [WPF版](https://github.com/Paving-Base/APK-Installer-Classic)，请根据需要选取

## 下载链接

[![APK 安装程序 - WinUI 3](https://img.shields.io/badge/download-%e4%b8%8b%e8%bd%bd-magenta.svg?label=APK%20%E5%AE%89%E8%A3%85%E7%A8%8B%E5%BA%8F%20-%20WinUI%203&logo=Microsoft&style=for-the-badge&color=11a2f8)](https://www.microsoft.com/store/apps/9P2JFQ43FPPG "APK 安装程序 - WinUI 3") [![APK 安装程序 - WPF](https://img.shields.io/badge/download-%e4%b8%8b%e8%bd%bd-magenta.svg?label=APK%20%E5%AE%89%E8%A3%85%E7%A8%8B%E5%BA%8F%20-%20WPF&logo=Microsoft&style=for-the-badge&color=11a2f8)](https://www.microsoft.com/store/apps/9N3HJLJP8V15 "APK 安装程序 - WPF")<!--more-->

## 如何安装应用

### 最低需求

- Windows 10 Build 18362及以上
- 设备需支持ARM64/x86/x64
- 至少400MB的空余储存空间(用于储存安装包与安装应用)

### 使用应用安装脚本安装应用

- 下载并解压最新的[安装包`(APKInstaller (Package)_x.x.x.0_Test.rar)`](https://github.com/Tangent-90/Coolapk-UWP/releases/latest "下载安装包")
- 如果没有应用安装脚本，下载[`Install.ps1`](Install.ps1)到目标目录  
  ![Install.ps1](https://raw.githubusercontent.com/Paving-Base/APK-Installer/main/Images/Guides/Snipaste_2019-10-12_22-49-11.png)
- 右击`Install.ps1`，选择“使用PowerShell运行”
- 应用安装脚本将会引导您完成此过程的剩余部分

### 使用应用安装程序安装应用

- 下载并解压最新的[安装包`(APKInstaller (Package)_x.x.x.0_Test.rar)`](https://github.com/Tangent-90/Coolapk-UWP/releases/latest "下载安装包")
- [开启旁加载模式](https://www.windowscentral.com/how-enable-windows-10-sideload-apps-outside-store)
  - 如果您想开发UWP应用，您可以开启[开发人员模式](https://docs.microsoft.com/zh-cn/windows/uwp/get-started/enable-your-device-for-development)，**对于大多数不需要做UWP开发的用户来说，开发人员模式是没有必要的**
- 安装`Dependencies`文件夹下的适用于您的设备的所有依赖包  
  ![Dependencies](https://github.com/Paving-Base/APK-Installer-Classic/raw/main/Images/Guides/Snipaste_2019-10-13_15-51-33.png)
- 安装`*.cer`证书到`本地计算机`→`受信任的根证书颁发机构`
  - 这项操作需要用到管理员权限，如果您安装证书时没有用到该权限，则可能是因为您将证书安装到了错误的位置或者您使用的是超级管理员账户  
    ![安装证书](https://github.com/Paving-Base/APK-Installer-Classic/raw/main/Images/Guides/Snipaste_2019-10-12_22-46-37.png)  
    ![导入本地计算机](https://raw.githubusercontent.com/Paving-Base/APK-Installer/main/Images/Guides/Snipaste_2019-10-19_15-28-58.png)  
    ![储存到受信任的根证书颁发机构](https://raw.githubusercontent.com/Paving-Base/APK-Installer/main/Images/Guides/Snipaste_2019-10-20_23-36-44.png)
- 双击`*.appxbundle`，单击安装，坐和放宽  
  ![安装](https://raw.githubusercontent.com/Paving-Base/APK-Installer/main/Images/Guides/Snipaste_2019-10-13_12-42-40.png)

### 更新应用

- 下载并解压最新的[安装包`(APKInstaller (Package)_x.x.x.0_x86_x64_arm_arm64.appxbundle)`](https://github.com/Tangent-90/Coolapk-UWP/releases/latest "下载安装包")
- 双击`*.appxbundle`，单击更新，坐和放宽  
  ![更新](https://raw.githubusercontent.com/Paving-Base/APK-Installer/main/Images/Guides/Snipaste_2019-10-13_16-01-09.png)

## 屏幕截图

- WinUI3版  
  ![安装](https://raw.githubusercontent.com/Paving-Base/APK-Installer/main/Images/Screenshots/Snipaste_2021-10-22_21-00-14.png)
- WPF版  
  ![安装](https://raw.githubusercontent.com/Paving-Base/APK-Installer-Classic/main/Images/Screenshots/Snipaste_2022-01-03_01-07-53.png)

## 使用到的模块

- [WinUI](https://github.com/microsoft/microsoft-ui-xaml "WinUI")
- [AAPTForNet](https://github.com/canheo136/QuickLook.Plugin.ApkViewer "AAPTForNet")
- [Advanced Sharp Adb Client](https://github.com/yungd1plomat/AdvancedSharpAdbClient "Advanced Sharp Adb Client")
- [Windows Community Toolkit](https://github.com/CommunityToolkit/WindowsCommunityToolkit "Windows Community Toolkit")

> [【开源】APK Installer —— 一个适用于 Windows 的 Android 应用安装程序](https://www.52pojie.cn/thread-1571754-1-1.html) 作者 [@wherewhere](https://www.52pojie.cn/home.php?mod=space&uid=1092941) 2022年1月5日 发表于 [吾爱破解](https://www.52pojie.cn)，转载请注明出处
