---
title: 【教程】Lumia 950/XL 刷win10教程第二步-部署
date: 2018-08-05 21:08:51
updated: 2018-08-07 13:31:00
updated_accuracy: minute
tags: [Lumia, Win10, WOA, 教程, 玩机]
categories: 玩机
banner: https://github.com/user-attachments/assets/206082f2-1c23-45e6-96f4-02096e0571fc
---
![【教程】Lumia 950/XL 刷win10教程第二步-部署](https://github.com/user-attachments/assets/206082f2-1c23-45e6-96f4-02096e0571fc)

[#酷安夜话#](https://www.coolapk.com/t/酷安夜话) [#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [#ROM杂谈#](https://www.coolapk.com/t/ROM杂谈) [铺路根据地](https://www.coolapk.com/dyh/1480)

### 首先，我认为看到这个教程的已经解锁成功了

本教程只包含 **Woa Installer for Lumia 950s** 使用教程，不包括刷完后如何开机

请不要在**RX-130**上尝试此工具

**Lumia 950**的`uefi`移植自**Lumia 950 XL**，且驱动尚未完成，请考虑再三后决定是否开始

#### 用什么安装Windows 10

Woa Installer for Lumia 950s

<img src="https://github.com/user-attachments/assets/037332f2-bb06-4eed-aa7d-8bba217c9405" alt="屏幕截图(42)">
<figcaption>Woa Installer for Lumia 950s</figcaption><!--more-->

#### 什么是Woa Installer for Lumia 950s

这是一个自动化的Windows 10安装工具，目前可以安装部署Windows，添加开发者选项，添加双系统引导，解压驱动文件等

#### 在哪获取Woa Installer for Lumia 950s

没有

#### Woa Installer for Lumia 950s介绍完毕

安装实际上很简单，通过Woa Installer for Lumia 950s，您可以很轻松的安装Windows 10，在安装之前，请先安装`Windows Device Recovery Tool`，并确保您的设备可以正常进入大容量模式。

这里没有什么好确保的了，确保您的设备<b>100%</b>有电，屏幕能亮，电源键，音量键，特别是相机键能够使用

前往<a href="https://uup.rg-adguard.net/index.php">UUP (Unified Update Platform) Generation Project (v2.2.2)</a>，下载Windows10镜像文件

<img src="https://github.com/user-attachments/assets/25798b62-e0c5-4814-8758-710944362e2e" alt="wp_ss_20180805_0004">
<figcaption>UUP (Unified Update Platform) Generation Project (v2.2.2)</figcaption>

打开zip包，解压，以管理员身份运行任意一个脚本，注意解压目录不要有空格和中文等非法字符

![IMG_20180808_131343](https://github.com/user-attachments/assets/9addc4b0-2023-4efe-819b-22e349671793)

等待脚本跑完，找到生成的镜像文件，打开它

找到`Source`文件夹，搜索`install.wim`文件，并复制到能够找到它的地方

<img src="https://github.com/user-attachments/assets/9c2e6999-ab58-4b79-8e5d-581da772569f" alt="屏幕截图(63)">
<figcaption>install.wim</figcaption>

在确保一切准备完毕之后，打开`WPinternals`，把设备连接电脑

<img src="https://github.com/user-attachments/assets/25a0487a-3011-4b4a-b393-f64320cbbff2" alt="f4c0b4e20a69e88f565d8bcd8b66713a15a2cfa1">
<figcaption>连接电脑</figcaption>

打开`Manual mode`选项，选择`Mass Storage Mode`

<img src="https://github.com/user-attachments/assets/d3445417-a2d7-4bee-9fbc-4f4df53f1840" alt="IMG_20180808_112401">
<figcaption>重启到大容量储存模式</figcaption>

这时手机会重启至`大容量储存模式`

<img src="https://github.com/user-attachments/assets/c5d5c3ee-e172-42bc-9c67-6353864be7f8" alt="MVIMG_20180805_145224">
<figcaption>黑屏</figcaption>

确保设备已经连接电脑，打开`Woa Installer for Lumia 950s`

<img src="https://github.com/user-attachments/assets/b302fb2a-14ee-4aed-844f-1566bd8ad173" alt="42969544-c8a0660a-8ba6-11e8-84ab-487e3c0b8bb7">
<figcaption>Woa Installer for Lumia 950s</figcaption>

选择您设备所在的型号

<img src="https://github.com/user-attachments/assets/09d6c126-ef8c-4f3f-9748-0b0250becf15" alt="屏幕截图(43)">
<figcaption>选择型号</figcaption>

点击`browse`按钮，找到您之前复制的`wim`文件

<img src="https://github.com/user-attachments/assets/c45659ad-8555-4943-a65b-abf60139ba8e" alt="屏幕截图(65)">
<figcaption>找到install.wim</figcaption>

点击`Full`按钮，安装开始，大约需要半个小时

<img src="https://github.com/user-attachments/assets/7f5b61c6-6f4f-4d04-94df-20828747545d" alt="IMG_20180715_105304">
<figcaption>开始</figcaption>

完成后，重启即可

<img src="https://github.com/user-attachments/assets/035575d0-3ab7-4b4f-841d-1ccdcf65940d" alt="IMG_20180805_114754">
<figcaption>完成</figcaption>

### <font color="red">问题汇总</font>

#### 找不到驱动或者驱动不正确

<img src="https://github.com/user-attachments/assets/978abc23-a834-4a2d-a6fe-bdecd8b8ceb0" alt="IMG_20180805_114228">
<figcaption>找不到文件夹</figcaption>

不要乱动驱动，在**1.0**时所以文件需要自己准备，而在**1.0**后期到**1.1**时只需准备驱动文件，在**1.2**时加入了Lumia 950的支持并不需要准备文件了，有时候错误的驱动可能会导致无法开机和无法触控的灾难，所以第一次刷入时不要更改内置的驱动

#### 一些文件夹出了问题

<img src="https://github.com/user-attachments/assets/6d7f71cc-6219-4144-8b6b-b83101b56962" alt="IMG_20180808_112544">
<figcaption>驱动有误</figcaption>

重下一遍，或者重启，或者换个电脑，在这方面较劲是不划来的

#### 无法改动分区

<img src="https://github.com/user-attachments/assets/3f9317ce-ae01-498c-b008-4856979c48be" alt="6366917022808290767517002">
<figcaption>无法更改分区大小</figcaption>

既然不能自动，那么就手动

下载`Disk Genius`自行压缩`data`分区，压缩多少随意，确保压缩后的空间够Windows 10 Moblie使用并且压缩出来的空间够Windows 10使用，建议`data`分区大小为**7.5G**，我压缩的大小为**2G**

<img src="https://github.com/user-attachments/assets/3bef9320-3715-49c9-a167-1b96c65d64c9" alt="屏幕截图(73)">
<figcaption>Disk Genius</figcaption>

#### 其他杂七杂八的问题

<img src="https://github.com/user-attachments/assets/1d5cab82-ec38-459a-9000-28c6ad405076" alt="085a5328b164787699b58098f830a7d34f2d4e14">
<figcaption>其他问题</figcaption>

啥都别管，先重试(点`Full`)，不行重下，不行重启，不行换电脑

最后祝大家刷机愉快！

### <font color="Red">相关链接：</font>

[【教程】Lumia 950/XL 刷win10教程第一步-解锁](/2018/08/04/【教程】Lumia-950-XL-刷win10教程第一步-解锁)

[【教程】Lumia 950/XL 刷win10教程第三步-开机](/2018/08/06/【教程】Lumia-950-XL-刷win10教程第三步-开机)

[【教程】Lumia 950 XL 刷win10教程第四步-优化](/2019/02/16/【教程】Lumia-950-XL-刷win10教程第四步-优化)

[【教程】Lumia 950/XL 刷win10教程番外篇-离线更新](/2018/08/06/【教程】Lumia-950-XL-刷win10教程番外篇-离线更新)

[【讨论】给大家提供两个群，刷win10的聚在一起好讨论](http://bbs.wfun.com/thread-1014280-1-1.html)

[【资源】Lumia 950/XL 刷 Windows 10 ARM64 资源汇总](https://www.coolapk.com/feed/7152050?shareKey=N2JhMTYwYzk4MDNhNjY0NDcxODE)

> [【教程】Lumia 950/XL 刷win10教程第二步-部署](https://bbs.wfun.com/thread-1014281-1-1.html) 作者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2018年8月5日 发表于 [智机社区](https://bbs.wfun.com "WFun")，转载请注明出处
