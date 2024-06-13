---
title: 【教程】适用于Linux的Windows子系统使用教程——安装与配置
<!-- 发布时间精确到: 天 -->
date: 2020-02-28 09:45:00
<!-- 更新时间精确到: 分 -->
updated: 2020-02-28 18:57:00
tags: [Linux, Win10, WSL, 资源, 教程, 玩机]
categories: 玩机
---
#### <span style="color: RoyalBlue;">安装WSL</span>

1. 启用适用于Linux的Windows子系统

   - 使用`启用或关闭Windows功能`打开

     在搜索栏中搜索并打开`启用或关闭Windows功能`，勾选`适用于Linux的Windows子系统`项。

     ![批注 2020-02-28 172223](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/15513f05-5911-4e2c-b5d3-593605f45287)

   - 使用`PowerShell`打开

     管理员权限运行`PowerShell`并运行下面的命令：

     ```ps1
     Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
     ```

     ![批注 2020-02-28 172642](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/05218ba7-7c18-493a-8549-6da535692706)

2. 更改WSL版本号

   对于**Windows 10.0.18917**及以上的版本，微软新增了WSL2，具体有什么优势这里就不指出了

   管理员权限运行`PowerShell`并运行下面的命令：<!--more-->

   ```ps1
   Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
   ```

   ![批注 2020-02-28 172826](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/66853a28-649c-4f5c-93a7-6c0bd5280019)

   或在`启用或关闭Windows功能`，勾选`虚拟机平台`项。

   ![批注 2020-02-28 174514](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/d6a02934-0b9e-4fca-a40d-eff01d6c4382)

   输入 `wsl -l` 可以查看已安装的Linux

   ![批注 2020-02-28 172900](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/2dedd776-48fd-4a6c-96e2-f49b0b52bab9)

   输入 `wsl --set-version Ubuntu 2` 可以更改Ubuntu为WSL2(Ubuntu可改为你正在使用的版本)(如果想换回1，只需把2改为1再运行一次)

   输入 `wsl --set-default-version 2` 可以默认安装Linux为WSL2(如果想换回1，只需把2改为1再运行一次)

3. 安装Linux

   在Microsoft Store搜索 Linux，可以看到一系列 Linux 发行版，根据自己需要选择适合自己的发行版，这里以Ubuntu为例，下载完成后启动，等待安装完成，输入账户和密码。（这里默认会安装到C盘，有安装到其它盘的方法，这里就不指出了）

#### <span style="color: #4169e1;">配置WSL</span>

1. 美化终端

   CMD是无可救药了，这里就给一个底色了

   ![批注 2020-02-28 111532](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/6766f827-d073-47eb-818f-7f4db4e8e062)

   推荐使用Windows Terminal，这里送上我自用的[配置文件](https://github.com/wherewhere/WindowsTerminalProfiles)

   ![批注 2020-02-28 174459](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/2cb1564f-882c-4e1c-8855-49770e9b7038)

2. 更换源并更新到最新版Ubuntu (以20.04为例)

   - 对于WSL1，可以直接在Windows下找到文件并修改

      直接编辑 `C:\Users\<Your Name>\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\etc\apt\sources.list` 为(文中 `https://mirrors.tuna.tsinghua.edu.cn/ubuntu/` 可换为你喜欢的源地址) (文中 focal 可换为你想要更新到的版本号)

      ```sh
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal universe
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal universe
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates universe
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates universe
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal partner
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal partner
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security universe
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security universe
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security multiverse
      ```

      ![批注 2020-02-28 173252](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/aa43e5ab-0eff-49b2-90ff-611c919d9293)

    - 对于WSL2，Windows是没有权限修改WSL的系统文件的，所以只能在WSL中修改

      在终端输入

      ```sh
      sudo nano /etc/apt/sources.list #(nano可换为你喜欢的文本编辑器，但是Ubuntu预装的是nano)
      ```

      将内容修改为上文

      ![批注 2020-02-28 173356](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/e9ad4c87-1560-4c73-a191-f69d5fa7c845)

    - 在终端输入

      ```sh
      sudo apt update
      ```

    - 完成后输入

      ```sh
      sudo apt dist-upgrade
      ```

    - 请坐和放宽

3. 更改语言为中文

   输入

   ```sh
   sudo dpkg-reconfigure locales
   ```

   ![批注 2020-02-28 173452](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/17af7a1c-bb53-4cba-a93f-dbb4cbbf9bca)

   选中 `zh_CN GB2312` 和 `zh_CN.UTF-8 UTF-8` 确定

   ![批注 2020-02-28 173531](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/c29fa217-af62-4910-8368-fe5ba28b3072)

   选择 `zh_CN.UTF-8` 确定

   ![批注 2020-02-28 173551](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/bc276409-0235-444a-895f-d4a9cde64043)

   重启终端

> [【教程】适用于Linux的Windows子系统使用教程——安装与配置](https://bbs.wfun.com/thread-1024317-1-1.html) 作者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2020年2月28日 发表于 [智机社区](https://bbs.wfun.com "WFun")，转载请注明出处
