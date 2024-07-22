---
title: 【教程】启用刷了Windows 10 ARM64的Lumia 950 XL的WIFI和GPU
date: 2019-01-19 11:12:39
<!-- 更新时间精确到: 分 -->
updated: 2019-01-20 17:49:00
tags: [Lumia, Win10, WOA, 资源, 教程, 玩机]
categories: 玩机
---
### 原文

![wp_ss_20190119_0007](https://github.com/user-attachments/assets/e25766ea-4bf7-42c1-93d2-3034a0a586b0)

### 开启WIFI

#### 对于已刷入Windows 10 ARM64的设备

下载新的 `UEFI.efi` 和 `BootShim.efi`

- 进入**Windows 10 ARM64**
- 打开文件资源管理器
- 复制 `UEFI.efi` 至以下目录，选择覆盖
  > MainOS: EFIESP
- 复制 `BootShim.efi` 至以下目录，选择覆盖
  > MainOS: EFIESP\EFI\boot
- 重启，如果没有什么问题，WiFi已经可以使用了<!--more-->

#### 对于未刷入Windows 10 ARM64的设备

- 按照正常步骤安装，使用新的文件即可

#### 效果图

![20190118_151708_495](https://github.com/user-attachments/assets/b153e8b0-25fd-4c64-948d-5e9a8f78d3fd)

### GPU install procedure for 950 XL

- 确保您使用的是新的 UEFI 和引导程序 (带有 WiFi 的) 和 **0.1.0.1** 驱动程序
- 使用 `DISM` 安装 `QCDX` (Display 驱动程序，在驱动包的 `Supplemental/GPU/Display` 目录) 。无论是否完成了 OOBE 都行。请勿注入 **OEM Panel 驱动程序**!
- 使用 @SuperJMN 的安装工具启用双引导 (或手动重置 `WOABOOT` 的 GUID)
- 打开设备管理器，`查看` > `显示隐藏的设备`
- 找到 `Qualcomm TrEE`，手动从本地更新驱动，驱动在 `Supplemental` 文件夹下的 “`Tree with NV services enabled`” 文件夹内。重新 启动。
- 找到未知设备 (ID 为 `MSHW1004`，一般在第六个未知设备左右，一定要确保是 `MSHW1004`，驱动安装完成后会显示为 `Nokia Panel`)，并将 `OEM Panel 驱动程序` (在驱动包的 `Supplemental/GPU/设备名` 目录下，**Lumia 950** 为 `Talkman` ，**Lumia 950 XL** 为 `Cityman` ，**RX-130** 为 `Hapanero`) 安装到该设备上。设备可能会崩溃或做其他奇怪的事情。重新启动，然后你就有 GPU 了!

### 资源下载

[百度网盘](https://pan.baidu.com/s/1hydYf9iiLUBzMXqPaoD7fg) 提取码：`gb4j`

> [【教程】启用刷了Windows 10 ARM64的Lumia 950 XL的WIFI和GPU](https://bbs.wfun.com/thread-1020694-1-1.html) 作者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2019年1月19日 发表于 [智机社区](https://bbs.wfun.com "WFun")，转载请注明出处
