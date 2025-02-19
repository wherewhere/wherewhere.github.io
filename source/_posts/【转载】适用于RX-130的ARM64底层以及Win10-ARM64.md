---
title: 【转载】适用于RX-130的ARM64底层以及Win10 ARM64
date: 2018-04-16 20:48:47
tags: [Lumia, Win10, WOA, 资源, 玩机, 快讯, 转载]
categories: 玩机
banner: https://github.com/user-attachments/assets/127aff91-65a0-463b-b2ea-54d88eaffb35
copyright_reprint: true
---
![【转载】适用于RX-130的ARM64底层以及Win10 ARM64](https://github.com/user-attachments/assets/127aff91-65a0-463b-b2ea-54d88eaffb35)

[#酷安夜话#](https://www.coolapk.com/t/酷安夜话) [#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [#ROM杂谈#](https://www.coolapk.com/t/ROM杂谈)

#### 原帖地址:

[Microsoft Hapanero RX-130 ARM64](https://tieba.baidu.com/p/5650553455)

#### 转载授权:

![转载授权](https://github.com/user-attachments/assets/29615a9a-395d-4fb7-bdb0-647138f9952d)
<figcaption class="figure">转载授权（原帖地址：<a herf="https://tieba.baidu.com/p/5650553455">https://tieba.baidu.com/p/5650553455</a>）</figcaption>

#### 再次提醒:

1. 注意！本版本仅仅适用于**RX-130**原型机，在**950XL**上面刷入将导致显示芯片损毁！

2. 一旦您刷入**ARM64**，您将很有可能无法回到**ARM32**版本的原始系统，目前我们正在加紧研究在不拆换eMMC的情况下刷回ARM32版本的Win10M的方法。

3. 由于ARM64底层自身的问题，BDS菜单中的`UEFI Mass Storage`选项不可用。

4. 目前Windows 10 ARM for **MSM8994**大量驱动不完善，您尚无法在系统中使用触摸功能能以及任何USB设备

#### 内容:

<style>
  figcaption.figure {
    color: #999;
    font-size: 0.875em;
    font-weight: bold;
    line-height: 1;
    margin: 5px auto 15px;
    text-align: center;
  }

  p+figcaption.figure,
  p+div.code-line+.figure {
    margin: -15px auto 15px;
  }

  @media (max-width: 567px) {
    .post-body p+figcaption.figure {
      margin: -5px auto 15px;
    }
  }
</style>
<!--more-->

这一底层备份来自于于微软一款代号为`Hapanero`的实验性工程机的一台ARM64测试机。  
对于Lumia 950XL，由于其同样使用高通骁龙**MSM8994SoC**，虽然底层由于显示驱动不匹配会招致烧毁屏幕上的芯片的不良后果，但其仍可运行。  
对于RX-130，在刷入之前，请检查你的设备背部电池仓的型号贴纸的Build一栏，此次放出的底层仅有**EB2.X**可以使用，**EB1.0**暂时无法刷入，经测试会导致无限重启。刷机前请务必备份原有底层0-3分区（`DPP`、`MODEM_FSG`、`MODEM_FS1`、`MODEM_FS2`）以在刷回ARM32后还原基带。  
你可以在使用任何一种方式使你的RX-130设备进入到`MassStorage`大容量存储模式后，使用**WinHex**刷入此份备份；或者直接使用`thor2`刷入完整备份（命令示例：`thor2 -mode uefiflash -imagefile <文件名称> -startsector 0`）。  
刷入完成后，请重新启动你的设备，本底层并不带有开机振动，请注意。  
如果在刷入后需要进入`MassStorage`模式，请下载文后提供的SD卡启动，并将其内文件解压到SD卡根目录。将处理过的SD卡插入设备后启动设备，系统将自动进入菜单。  
经测试，由于RX-130的特殊性，其在不刷带bl更新的安卓底层的前提下，已无砖可言（9008救砖方法将随后放出）。

下载地址：
- 底层备份本体（带有Build **14822**的ARM64架构W10M）：
  链接：[网盘链接](https://pan.baidu.com/s/1d6UktLuIYuPk2qeq2eL3QA?pwd=ylcg) 密码：`ylcg`
- 已安装由imbushuo提供证书的系统整合包（后续驱动据计划也将以该证书提供）：
  链接：[网盘链接](https://pan.baidu.com/s/1EQ7OC9h3xSvVT8WzvUzdyA?pwd=96gk) 密码：`96gk`
- SD卡启动（ARM64）：
  链接：[网盘链接](https://pan.baidu.com/s/17DqccVMqJmLgAtMnlcXjrw?pwd=kgo8) 密码：`kgo8`
- 打包转存：
  [网盘链接](https://pan.baidu.com/s/1x9mSjDlXVIgbL-5sJmUSmw?pwd=dbzz") 密码：`dbzz`

感谢imbushuo、JerryYin、五块二等人对于完善这一方式所作出的贡献。  
若有后续发现及研究成果，将在本吧进行发布。欢迎各位对其进行测试及研究，希望能有更多人加入到适配的行列中来。

到目前为止已经有人成功刷入了，并且给出了照片

![登录界面](https://github.com/user-attachments/assets/2f8b1634-5e16-471a-ad1f-73ba0d3a72d3)
<figcaption class="figure">登录界面</figcaption>

![关于](https://github.com/user-attachments/assets/823bf306-2652-41d0-aec1-5ed97b890089)
<figcaption class="figure">关于</figcaption>

![桌面](https://github.com/user-attachments/assets/095d7be6-15e2-43bf-90aa-00628d7de630)
<figcaption class="figure">桌面</figcaption>

#### 英文版：

This is a low-level backup comes from an ARM64 test machine made by Microsoft, codenamed `Hapanero`.  
For the Lumia 950XL, since it also uses the Qualcomm Snapdragon **MSM8994** SoC, the bottom layer can still operate but the display driver are not the same. Running on the Luumia950XL will damage the Amoled driver IC.  
For the RX-130, please check the HW Build number of the model, the sticker is on the back of your device. Only **EB2.X** can be use this file, **EB1.0** can‘t flash those file for the moment, and will causes an infinite boot loop. Before flashing, be sure to back up the original low-level 0-3 partition (`DPP`, `MODEM_FSG`, `MODEM_FS1`, `MODEM_FS2`) with Winhex. 
You need to restore the baseband after flash back to the ARM32. After the flashing is completed, please restart your device. Please notice that the bottom layer does not have start-up vibration.  
If you need to enter the `Mass Storage` mode, download the provided file into the SD card and extract the files in it to the root directory of the SD card. After the SD card is inserted into the device and the device is started, the system will automatically enter the menu.  
After testing, due to the particularity of RX-130, it has no bricks at all, expect flash the android bootloader (how to unbrick the device in 9008 mode will public later).

Download link:
- (with Windows10 Mobile with build **14822** in ARM64)Bootloader backup image: [Link](https://pan.baidu.com/s/1d6UktLuIYuPk2qeq2eL3QA?pwd=ylcg) PASSWORD: `ylcg`
- Full system backup image(with certificate provided by imbushuo): [Link](https://pan.baidu.com/s/1EQ7OC9h3xSvVT8WzvUzdyA?pwd=96gk) PASSWORD: `96gk`
- SD card boot file(ARM64): [Link](https://pan.baidu.com/s/17DqccVMqJmLgAtMnlcXjrw?pwd=kgo8) PASSWORD：`kgo8`

Thanks to imbushuo, JerryYin and other people make contribute to this project.  
We will keep this project updated once we got any breakthrough

> [【转载】适用于RX-130的ARM64底层以及Win10 ARM64](https://www.coolapk.com/feed/6181480?shareKey=NTljN2E1NzZmOGU1NjY0MjYwMDM) 转载者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2018年4月16日 转载于 [酷安](https://www.coolapk.com "Coolapk")
