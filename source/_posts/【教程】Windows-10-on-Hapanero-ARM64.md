---
title: 【教程】Windows 10 on Hapanero ARM64
date: 2018-05-21 20:10:44
updated: 2018-08-06 23:15:00
updated_accuracy: minute
tags: [Lumia, Win10, WOA, 教程, 玩机, 转载, 翻译]
categories: 玩机
banner: https://protobetatest.com/wp-content/uploads/2018/05/IMG_1503.jpg
---
![【教程】Windows 10 on Hapanero ARM64](https://protobetatest.com/wp-content/uploads/2018/05/IMG_1503.jpg)

[#酷安夜话#](https://www.coolapk.com/t/酷安夜话) [#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [#ROM杂谈#](https://www.coolapk.com/t/ROM杂谈)

[Windows 10 on Hapanero ARM64](http://protobetatest.com/2018/05/21/windows-10-on-hapanero-arm64/)

您可能最近在许多设备 (包括 `Hapanero`) 上看到了 Windows 10 的图片。本文将指导您如何在 Hapanero 上运行 Windows 10 与一些驱动程序工作。

![IMG_1505](https://protobetatest.com/wp-content/uploads/2018/05/IMG_1505.jpg)

我们不负责本教程所造成的任何损害，但是如果您仔细阅读所有内容并具有所有匹配的先决条件，则可以安全地执行此项工作。重要说明: 您必须遵循本教程，不做任何其他或不同的事去安装此 **ROM**，否则事情可能会非常糟糕。

项目状态

这是一个未适配清单，其它所有未提到的内容都可运行。<!--more-->

- 声音 (由于 `QCSUBSYS` 没有被装载)
- **GPU 加速度**和**3D 渲染 + 着色器** (由于 `QCDX` 和 `QCSUBSYS`)
- 任何类型的**蜂窝功能**
- **充电**可能随机工作
- 如果由于驱动程序故障而无法接通电源，则手机可能无法通电，请将其插上以防万一。(更新: 请参阅指南末尾的变通方法)
- **Windows 恢复环境**中的**驱动程序**无法正常工作
- 更新操作系统可能会损坏驱动程序
- **指纹传感器**
- **摄像头** (由于 `QCDX` 和 `QCSUBSYS`)
- `EN-US` / `Microsoft Windows 10 Pro for Workstations Insider Preview build 17672` only for now (如果需要您可以正常安装语言包)

FAQ
- 此支持哪些设备？
  - 只有**Hapanero / RX130 (EB2.0+)**
- 我可以安装这个在**950**或**520**或全新的 **Lumia XXX** 或**惠普**/**阿尔卡特**上？
  - 你能不能看看上边那条……
- 能充电吗？
  - 只有部分，你一定需要一个单独的万能冲来冲它
- 我可以很容易地回到 **ARM32** 在刷过这个后吗？
  - 有些人成功地遵循了本教程，但是用旧的备份交换了大的 img 文件，但是有些没有 (我们无法确认他们是否真的遵循了这封信的指示)。在进入 `EDL` 之前，您可能需要从`BDS` -> `UEFI` 中清除 `RT/BS/ftpm`。
- 你们会发布此项目的频繁更新吗？
  - 我们不能保证我们会发布频繁的更新，但我们会尝试。
- 我在哪里能买到 Hapanero？
  - 去咸鱼等或者去****那里抢！

要求
- 一个 **Hapanero** 设备 **(RX-130) EB2.0** 和更高 (您可以在背面贴纸上检查此) (早期的修订无法使用此!)
- 运行 **Windows 7** 或更高的工作计算机
- `Win32DiskImager`
- `Thor2.exe` + `WinUsb 驱动程序` (都安装了 `windows 设备恢复工具`) `Ffutool.exe` (附带 `WPCPTT`-仅需要一个特定的固件) `usb 3.0` 缆线 (`micro b`) 首选，或 `usb 2.0` 作为最后的手段
- [HapaneroARM64 与 “Windows 10 桌面和驱动程序” img 文件](https://drive.google.com/open?id=16qExYNoZkqC_L5Hvo_GtWtrfcuWCRSSU)
- [Hapanero/RM-1085 的紧急/制造文件](http://protobetatest.com/download/lumia-emergency-files/)
- 7-zip
- 一个良好的互联网连接，下载所需的文件 (大小约 **7.32GB**) 
- 时间和耐心

先决条件

确保你得到了上面列出的任何安装/提取。您将需要检查您的 RX130 上有哪些操作系统。这里有一个简单的图表来指导您:

**ARM64** 固件: 
- 我看到一个高通骁龙的引导徽标
- 我的手机附带了一个坏的 **Windows 手机版本**和/或带有一个**没有工作的桌面镜像**

**9867**固件: 
- 我的手机运行在看起来像 **Windows Phone 8.1**操作系统但有新的功能，如高/宽瓷砖和键盘光标

其他固件: 
- 我的手机运行 **Windows 10 移动固件** (任何 OS 版本)

一旦您发现您的手机上当前安装了哪一个固件，您就需要使用 `Win32DiskImager` 备份当前的手机状态。为此，请参阅以下与固件匹配的说明: 

首先，确保您的电池充电到**100%**。

**ARM64** 固件: 
- 长按电源按钮，一旦你看到高通启动徽标时，只开机。当你看不到文字时，你应该这样做。下一步进入大容量存储模式。如果您看不到大容量存储模式的选项，请双击 `USB 启动设置`，并确保它们已关闭。

**9867**固件: 
- 按下音量按钮 (可能是音量下降，如果你看不到正确的东西，按下音量)，直到你看到一个闪电齿轮。打开计算机上的管理员命令提示符，转到 `ffutool.exe` 中的某个位置，然后运行 `ffutool.exe` 大容量
- 重要说明: 您需要使用 `USB 2` 与此固件，以使用大容量存储和通信与 `ffuloader` (闪电齿轮)

其他固件: 
- 长按电源按钮，一旦你看到微软启动徽标时，只开机。当你看不到文字时，你应该这样做。下一步进入大容量存储模式。如果您看不到大容量存储模式的选项，请双击 `USB 启动设置`，并确保它们已关闭。

在大容量存储模式下，打开 `Win32Diskimager`。

从带有驱动器号的下拉列表中，选择与您的电话 `MainOS` 分区驱动器号匹配的一个，然后按 “读取” 将分区备份到该工具中指定的文件。

备份完成后，使用 `7-zip` 打开结果 img 文件。

摘要:
- DPP.img
- MODEM_FS1.img
- MODEM_FS2.img
- MODEM_FSG.img
- SSD.img

把这些东西丢在一个安全的地方放会。

进入紧急下载模式 (**9008**)

以下步骤取决于您的手机上安装的固件，如果尚未完成，请参阅 “先决条件” 部分，了解您的手机上有哪些固件，然后按照正确的说明进行操作: 

首先，确保您的电池充电到**100%**。

**ARM64** 固件: 
- 启动设备
- 在您看到高通徽标出现之前，请按下电源并向上音量，直到您看到 “工商服务服务” 菜单
- 继续，直到你看到 `EDL` 选项
- 选择 `EDL` 选项

**9867**和其他固件: 
- 关闭时将手机连接计算机
- 当您听到 Windows 连接声音运行以下命令:
  ```cmd
  thor2 -mode rnd -bootflashapp -skip_gpt_check
  ```
- 然后运行:
  ```cmd 
  thor2 -mode rnd -boot_edmode -skip_gpt_check
  ```

进入 `Flashapp`

运行以下命令 (您可以在本指南前面链接的紧急文件包的 `RM1085` 目录下找到这两个文件):

```cmd
thor2 -mode emergency -hexfile "path to\MPRG8994_fh.ede" -edfile "path to\RM1085_fh.edp"
```

命令将抛出一条错误消息，只要在手机屏幕上看到 `Flashapp`，就会出现这种情况。

刷入 img 文件

运行以下命令:
```cmd
thor2 -mode uefiflash -imagefile "path to\main big img.img" -startsector 0
thor2 -mode uefiflash -partitionname DPP -partitionimagefile "path to\DPP.img"
thor2 -mode uefiflash -partitionname MODEM_FSG -partitionimagefile "path to\MODEM_FSG.img"
thor2 -mode uefiflash -partitionname MODEM_FS1 -partitionimagefile "path to\MODEM_FS1.img"
thor2 -mode uefiflash -partitionname MODEM_FS2 -partitionimagefile "path to\MODEM_FS2.img"
thor2 -mode uefiflash -partitionname SSD -partitionimagefile "path to\SSD.img"
thor2 -mode rnd -bootnormalmode
```

如果手机在刷入镜像后没有开机的解决方法 (推荐)

此修复程序仅在电话成功启动前应用时才起作用。如果是这样，您可以使用与前面相同的步骤重新映像手机，然后继续修复。

- 当您看到高通引导徽标而没有文本时，按住电源按钮，直到看到开发人员菜单。
- 选择 “`大容量存储模式`” 选项。
- 转到 `(Desktop OS):\Windows\System32\config\`
- 您可以用在[此处](https://drive.google.com/open?id=1zHAg3uxfpo8pmRMoAdoNDHSVEo_5fPLl)找到的文件替换系统和软件。
- 重新启动设备。

> [【教程】Windows 10 on Hapanero ARM64](https://bbs.wfun.com/thread-1012396-1-1.html) 转载者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2018年5月21日 转载于 [智机社区](https://bbs.wfun.com "WFun")
