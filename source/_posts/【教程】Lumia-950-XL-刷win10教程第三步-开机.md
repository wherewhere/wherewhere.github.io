---
title: 【教程】Lumia 950/XL 刷win10教程第三步-开机
date: 2018-08-06 21:24:10
<!-- 更新时间精确到: 分 -->
updated: 2018-08-06 23:15:00
tags: [Lumia, Win10, WOA, 教程, 玩机]
categories: 玩机
banner: https://github.com/user-attachments/assets/206082f2-1c23-45e6-96f4-02096e0571fc
---
![【教程】Lumia 950/XL 刷win10教程第三步-开机](https://github.com/user-attachments/assets/206082f2-1c23-45e6-96f4-02096e0571fc)

[#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [#酷安夜话#](https://www.coolapk.com/t/酷安夜话) [#ROM杂谈#](https://www.coolapk.com/t/ROM杂谈) [铺路根据地](https://www.coolapk.com/dyh/1480)

至此，我认为看此教程的已经安装完成win10了

本教程只包括部署完成后的开机和配置，不包括之前的一切操作

#### 好的，教程开始

现在，按下电源键**10**秒，退出大容量模式后开机

开机后，一切都变了，首先是如同PC般的Windows Boot Manager，当然，用工程机的肯定不陌生，音量键选择，相机键确定，所以要确保这些按键能用

<img src="https://github.com/user-attachments/assets/3a04eb53-74eb-4562-b153-6751b900006d" alt="WP_20180806_10_42_24_Pro">
<figcaption>Windows Boot Manager</figcaption>

在开机之前，我们先感受一下第二个选项，`Developer Menu`<!--more-->

<img src="https://github.com/user-attachments/assets/2037ffbd-66f1-47aa-9b3b-c27d3e8de159" alt="WP_20180806_10_44_08_Pro">
<figcaption>Developer Menu</figcaption>

我没用过工程机，自然不知道其他操作是干嘛的，高级菜单我就不管了，先看看大容量模式菜单

<img src="https://github.com/user-attachments/assets/e8714c8c-5e94-4e46-ad8a-7a523820d623" alt="WP_20180806_10_46_07_Pro">
<figcaption>UEFI Mass Storage Mode</figcaption>

好像没什么好看的，不过这样是不是方便很多，长按**10**秒电源键即可退出。现在回到正题

<img src="https://github.com/user-attachments/assets/3a04eb53-74eb-4562-b153-6751b900006d" alt="WP_20180806_10_42_24_Pro">
<figcaption>Windows Boot Manager</figcaption>

在选择win10并确定之后，便可以进入boot界面了，第一次启动非常非常长，所以可以玩玩

<img src="https://github.com/user-attachments/assets/94745934-2cf5-4cbe-94e6-9c4282f4aef1" alt="WP_20180806_11_32_09_Pro">
<figcaption>开机</figcaption>

随意的触摸屏幕，会生成一些代码，表示触控的位置，这样可以测试触控是否正常，当然只是在uefi boot里正不正常。

<img src="https://github.com/user-attachments/assets/71177c27-592d-4676-930e-20dfa6b32173" alt="WP_20180806_11_32_17_Pro">
<figcaption>代码</figcaption>

转圈之后再摸就不会有反应了，因为已经进入win10了，随后慢慢的蓝屏的出现

<img src="https://github.com/user-attachments/assets/103af46d-413d-4635-be2b-b376b9901f1e" alt="IMG_20180810_193235">
<figcaption>准备就绪</figcaption>

一般在第一次启动的时候都会出现蓝屏，不用管他抠下电池重启即可，当然确保蓝屏是`SDBUS_INTERNAL_ERROR`，这个问题似乎在**rs5**后期就没有了，遇到其他问题一律重刷

<img src="https://github.com/user-attachments/assets/50a41cfb-15ff-4382-8c32-93afb76e9735" alt="IMG_20180810_175959">
<figcaption>蓝屏</figcaption>

然后就没什么事了，正常会慢慢的慢慢的慢慢的慢慢的……配置完成，然后就进入OOBE了

<img src="https://github.com/user-attachments/assets/51c2585e-2457-482d-9f36-4abe0a97c253" alt="IMG_20180810_175933">
<figcaption>设置语言</figcaption>

正常走完流程，如果不能触控就重刷，确保驱动正确

<img src="https://github.com/user-attachments/assets/9ac32d19-e078-4df6-9edc-8a70f4fe43fa" alt="IMG_20180810_194140">
<figcaption>“霸王条款”</figcaption>

然后就进系统了，字很小，注意别点飘了，下图是折腾完之后的开始屏幕

<img src="https://github.com/user-attachments/assets/702f3948-fc86-457b-9fec-910953cd6d49" alt="屏幕截图(70)">
<figcaption>开始屏幕</figcaption>

为了更好的触控，进入`设备`→`显示`，将缩放比设置为**170%**(PC)或**273%**(Phone)

<img src="https://github.com/user-attachments/assets/44d62fda-8a63-42f2-aec6-ef0656b27c4f" alt="屏幕截图(56)">
<figcaption>高级缩放设置</figcaption>

然后进入`控制面板`，找到`电源`，关闭`快速启动`，这样关机就很正常了

<img src="https://github.com/user-attachments/assets/5e119ce3-f603-4caa-b882-d4e1a2d3d619" alt="屏幕截图(68)">
<figcaption>控制面板</figcaption>

接着找到键盘，连接手机，按`win加X`，或者使劲蹭`win键`，触发长按右键效果

<img src="https://github.com/user-attachments/assets/3e604984-2e26-45c7-b81a-d307c7253395" alt="屏幕截图(69)">
<figcaption>更多</figcaption>

找到`命令提示符(管理员)`，以管理员身份打开命令提示符，输入以下内容

```cmd
bcdedit.exe /set nointegritychecks on
```

如果需要上网，用蓝牙上网，具体请自行搜索

<img src="https://github.com/user-attachments/assets/6cc1686c-1a69-4a80-b4de-66455c9c7b8b" alt="屏幕截图(71)">
<figcaption>蓝牙</figcaption>

激活随缘，没有一个好的网络激活都没办法

<img src="https://github.com/user-attachments/assets/4e57334b-8181-4cc6-b3b8-7f272b3e963c" alt="20180803_174556_822">
<figcaption>激活</figcaption>

觉得玩好了，重启，进入`Windows Boot Manager`

<img src="https://github.com/user-attachments/assets/3a04eb53-74eb-4562-b153-6751b900006d" alt="WP_20180806_10_42_24_Pro">
<figcaption>Windows Boot Manage</figcaption>

选择`Developer Menu`

<img src="https://github.com/user-attachments/assets/2037ffbd-66f1-47aa-9b3b-c27d3e8de159" alt="WP_20180806_10_44_08_Pro">
<figcaption>Developer Menu</figcaption>

选择`USB Mass Storage Mode`

<img src="https://github.com/user-attachments/assets/e8714c8c-5e94-4e46-ad8a-7a523820d623" alt="WP_20180806_10_46_07_Pro">
<figcaption>UEFI Mass Storage</figcaption>

连接电脑，打开`Woa Installer for Lumia 950s`

<img src="https://github.com/user-attachments/assets/b302fb2a-14ee-4aed-844f-1566bd8ad173" alt="42969544-c8a0660a-8ba6-11e8-84ab-487e3c0b8bb7">
<figcaption>Woa Installer for Lumia 950s</figcaption>

点击`Inject Drivers`，转完后，进入`Dual Boot`页面

<img src="https://github.com/user-attachments/assets/18c78fdb-166d-4654-af7d-d7e518a06eee" alt="屏幕截图(44)">
<figcaption>Dual Boot</figcaption>

点击`Check Dual Boot Status`，转完以后点击`Enable Dual Boot`

<img src="https://github.com/user-attachments/assets/82b5553b-579a-4696-9cab-379dff2c64f8" alt="IMG_20180810_180406">
<figcaption>Dual Boot</figcaption>

现在基本可以玩了，如果不行，可以下载Dism++做其他的操作

<img src="https://github.com/user-attachments/assets/eea24cec-e4e3-416f-b3b4-5cc3d98d2c73" alt="20180803_174556_397">
<figcaption>Dism++</figcaption>

在win10，你可以做很多事情，最后附上我的设备的分区表

<img src="https://github.com/user-attachments/assets/3bef9320-3715-49c9-a167-1b96c65d64c9" alt="屏幕截图(73)">
<figcaption>Disk Genius</figcaption>

<img src="https://github.com/user-attachments/assets/ddfdd126-0295-4d7a-ad9d-721ac5b00933" alt="屏幕截图(60)">
<figcaption>磁盘管理</figcaption>

祝大家玩的愉快！

#### <font color="Red">相关链接：</font>

[【教程】Lumia 950/XL 刷win10教程第一步-解锁](/2018/08/04/【教程】Lumia-950-XL-刷win10教程第一步-解锁)

[【教程】Lumia 950/XL 刷win10教程第二步-部署](/2018/08/05/【教程】Lumia-950-XL-刷win10教程第二步-部署)

[【教程】Lumia 950 XL 刷win10教程第四步-优化](/2019/02/16/【教程】Lumia-950-XL-刷win10教程第四步-优化)

[【教程】Lumia 950/XL 刷win10教程番外篇-离线更新](/2018/08/06/【教程】Lumia-950-XL-刷win10教程番外篇-离线更新)

[【讨论】给大家提供两个群，刷win10的聚在一起好讨论](http://bbs.wfun.com/thread-1014280-1-1.html)

[【资源】Lumia 950/XL 刷 Windows 10 ARM64 资源汇总](https://www.coolapk.com/feed/7152050?shareKey=N2JhMTYwYzk4MDNhNjY0NDcxODE)

> [【教程】Lumia 950/XL 刷win10教程第三步-开机](https://bbs.wfun.com/thread-1014318-1-1.html) 作者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2018年8月6日 发表于 [智机社区](https://bbs.wfun.com "WFun")，转载请注明出处
