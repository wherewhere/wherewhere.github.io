---
title: 【教程】Lumia 950 XL 刷win10教程第四步-优化
date: 2019-02-16 19:40:00
date_accuracy: minute
updated: 2019-02-18 21:07:00
updated_accuracy: minute
tags: [Lumia, Win10, WOA, 教程, 玩机]
categories: 玩机
---
#### <span style="color: #3E65FF;">前言</span>

本教程续接[【教程】Lumia 950/XL 刷win10教程第三步-开机](/2018/08/06/【教程】Lumia-950-XL-刷win10教程第三步-开机)，部分内容取自[IT之家学院：微软Lumia 950 XL刷Win10 ARM64教程增补进阶版](https://www.ithome.com/0/407/902.htm)，转载请注明出处。

![屏幕截图(56)](https://github.com/user-attachments/assets/9bf3d229-0613-4ca1-a150-30511a52a266)

按照上一篇教程，我们应该已经能够成功双引导启动 Windows 10 ARM64 和 Windows 10 Mobile 了，但是 Windows 10 ARM64 部分仍不支持 GPU 和 OTG，部分不支持有线充电，本教程将着重讲解如何开启上述功能。

**<span style="color: red;">本教程仅适用于 Lumia 950 XL ，其它设备勿入。</span>**

**<span style="color: red;">适用于 Lumia 的 WOA 安装工具已更换地址，请点击[链接](https://github.com/WOA-Project/WoA-Installer-Rpi)下载最新版。</span>**

![wp_ss_20190216_0001](https://github.com/user-attachments/assets/1a66d14f-91e7-4112-b61e-40220174afcd)

废话不多说，教程现在开始<!--more-->

重启 Lumia 950 XL 并进入 `Mass Storage` 模式

#### <span style="color: #3E65FF;">第一部分，开启GPU</span>

请确认已经开启双系统引导<b><span style="color: red;">（未开启请进入下图界面开启，很重要）</span></b>，并确保设备已经进入 `Mass Storage` 模式

![屏幕截图(39)](https://github.com/user-attachments/assets/62c642c5-d0ae-42b9-b5b4-eb445b6f93f7)

打开 `WOA Deployer Lumia` ，转到 `Advanced` 页面

![屏幕截图(38)](https://github.com/user-attachments/assets/03c2aba8-a95d-4431-9636-9e5785a172c2)

点击 `Install GPU`

![屏幕截图(40)](https://github.com/user-attachments/assets/639a4545-acdf-4888-8576-a8958f8c2be6)

安装完成后重新启动到 **Windows 10 ARM64** 系统，打开`设备管理器`

![屏幕截图(24)](https://github.com/user-attachments/assets/0621a489-1f92-4338-8591-9eab70e4f683)

在未知设备下查找 `ACPI\MSHW1004\0` 描述的设备<b><span style="color: green;">（一般是第六个未知设备）</span></b>

![屏幕截图(15)](https://github.com/user-attachments/assets/2524959e-0252-4185-a721-9f762e6848c7)

选择更新驱动程序，在驱动程序更新向导中，选择 `浏览我的计算机以查找驱动程序软件`

![屏幕截图(16)](https://github.com/user-attachments/assets/88685e5b-9ff1-4b42-8143-dc3ec26b4d5c)

输入如图路径<b><span style="color: red;">（请确保该目录下有相关驱动）</span></b>

![屏幕截图(17)](https://github.com/user-attachments/assets/b7f58083-992b-4bb3-919b-71f31878422d)

选择后可能会出现一个红色的警告对话框，请选择通过<b><span style="color: green;">（因为驱动程序没有可信签名）</span></b>

![20190130_150037_501](https://github.com/user-attachments/assets/ec9a2845-2f43-40d5-ad7e-24bb0399be42)

在确认安装驱动程序后，Lumia 950 XL的屏幕将变黑一段时间，过后将自动重新显示。

![屏幕截图(18)](https://github.com/user-attachments/assets/d7c49d3f-85dd-447c-9d59-9ad3aa1c5ff2)

重启此时该设备已经具有了图形加速能力，如下图所示。

![屏幕截图(19)](https://github.com/user-attachments/assets/bf01923a-ffe9-4fd7-be95-629ac2019bf4)

#### <span style="color: #3E65FF;">第二部分，修复有线充电</span>

重启 Lumia 950 XL 并进入 `Mass Storage` 模式

从此处下载文件
[百度网盘](https://pan.baidu.com/s/1byeNbsgygUdp80fbMjM0og) 提取码：`48ja`

![wp_ss_20190216_0010](https://github.com/user-attachments/assets/67db5d71-36e9-4fb9-a93a-928b72784d41)

复制文件，替换至

> WindowsARM\Windows\System32\drivers

![屏幕截图(36)](https://github.com/user-attachments/assets/2243c78e-ff6d-405c-b3c3-593727331df8)

重启，<b><span style="color: red;">注意备份文件，若发现蓝屏恢复原版即可</span></b>

![屏幕截图(41)](https://github.com/user-attachments/assets/f1393859-0468-4a75-84f3-bdaa6e8bdc54)

#### <span style="color: #3E65FF;">第三部分，开启 OTG 功能（需要外部供电，如使用Lumia 950/XL 官方扩展坞）</span>

启动至 **Windows 10 ARM64** ，打开`设备管理器`

![屏幕截图(24)](https://github.com/user-attachments/assets/0621a489-1f92-4338-8591-9eab70e4f683)

找到 `通用串行总线控制器` 并展开它

![屏幕截图(27)](https://github.com/user-attachments/assets/ef11f5a0-2c97-43c9-96af-beb4fb2fbd98)

找到 `USB xHCI Compliant Host Controller`

![屏幕截图(30)](https://github.com/user-attachments/assets/358a2e49-7da4-4751-98a8-ca5126861ea2)

选择`更新驱动程序`，在驱动程序更新向导中，选择 `浏览我的计算机以查找驱动程序软件`

![屏幕截图(31)](https://github.com/user-attachments/assets/e553a595-1e2a-4281-b9e7-08a595e7ad1d)

选择 `让我从计算机上的可用驱动程序列表中选取`

![屏幕截图(32)](https://github.com/user-attachments/assets/775f0fa4-d48e-4978-9b27-024dbb49209b)

然后你会看到两个驱动

![屏幕截图(33)](https://github.com/user-attachments/assets/dfa914ab-c4e4-416b-bc66-772bd77f37a5)

选择 `Qualcomm USB XHCI Filter Device`

![屏幕截图(34)](https://github.com/user-attachments/assets/036e558c-ff83-45f7-b972-e331d4a21ede)

选择后可能会出现一个红色的警告对话框，请选择通过。

![20190130_150037_501](https://github.com/user-attachments/assets/ec9a2845-2f43-40d5-ad7e-24bb0399be42)

等待出现下图界面

![屏幕截图(35)](https://github.com/user-attachments/assets/0fd9dd6d-7f21-4349-a955-19bd5b09bc0b)

一切完成后即可使用 OTG 功能<b><span style="color: green;">（暂不支持 HDMI）</span></b>

#### <span style="color: #3E65FF;">第四部分，更新 Windows 10 ARM64</span>

1. 大版本号更新

   将 Lumia 950 XL 重启至 `Mass Storage` 模式

   格式化 `WindowsARM` 分区

   ![屏幕截图(43)](https://github.com/user-attachments/assets/eebc4197-23d9-46e4-987b-7e6c2fabc21c)

   打开`命令提示符（管理员）`输入命令

   ```cmd
   dism /apply-image /imagefile:"WIM映像路径" /index:1 /applydir:"WindowsARM 盘符"
   ```

   > 例：`dism /apply-image /imagefile:E:\install.wim /index:1 /applydir:H:`

   ![屏幕截图(48)](https://github.com/user-attachments/assets/2b206111-e6c7-49db-b89c-1bf434fbb557)

   **<span style="color: green;">部署时间比较长，请坐和放宽</span>**

   然后进行驱动安装，输入命令

   ```cmd
   dism /image:"WindowsARM盘符"\ /add-driver /driver:"驱动目录路径" /recurse /forceunsigned
   ```

   > 例：`dism /image:H:\ /add-driver /driver:E:\Windows10ARM64\驱动\950 /recurse /forceunsigned`

   ![屏幕截图(49)](https://github.com/user-attachments/assets/c850f19b-322c-48a1-ad3a-888650e1bcb9)

   完成后继续往下操作 <b><span style="color: green;">（ 注：若部署的install映像已含驱动，无需执行驱动安装）</span></b>

   **<span style="color: green;">若没在电脑上找到命令提示符，就在开始菜单右键，打开 Windows powershell（管理员）并输入</span>**

   ```ps1
   cmd
   ```

   重启设备，若准备就绪蓝屏那就重启等待再次报错 `Windows无法在此硬件上安装配置`，报错也许有所偏差，然后手动触摸确定按钮实验触摸是否有效，若触摸无效请重新开始，若触摸有效，请再次进入大容量储存模式，连接电脑，打开 `注册表编辑器` <b><span style="color: green;">（注册表编辑器打开方法，在开始菜单右键，选择运行，输入 `regedit` 并运行）</span></b>然后定位到

   > “HKEY_LOCAL_MACHINE”

   ![屏幕截图(50)](https://github.com/user-attachments/assets/e9ed6c1d-c4fe-4529-b25a-cf3735b37be6)

   然后点击左上角的文件，选择`加载配置单元`加载路径为 `WindowsARM` 分区下 `Windows\System32\config\SYSTEM` 挂载需要命名，请随意输入，例如：`123`

   ![屏幕截图(51)](https://github.com/user-attachments/assets/32073416-cbe4-4fba-a0a9-974499b24098)

   挂载成功后，展开挂载的注册表项，定位到 `setup根目录` ，把所有带数字的项改为 `0`，然后定位到挂载的根目录<b><span style="color: green;">（如定位到 123）</span></b>，然后点击左上角文件，卸载配置单元 

   ![屏幕截图(52)](https://github.com/user-attachments/assets/b3482dbd-6e64-4a7b-a7d5-588e17a6d0b1)

   之后打开 `DISM++`，选择 `WindowsARM` 分区并确认，等待加载完成后打开会话，选择 “`工具箱`” 中的账户管理，选择并启用账户 `Administrator` 和 `WDAGUtilityAccount`

   ![屏幕截图(53)](https://github.com/user-attachments/assets/33427b14-74b9-4df2-ba3e-30c708b8e59f)

   完成后重启即可直接进入桌面

2. 小版本号更新

   将Lumia 950 XL重启至`Mass Storage`模式并连接电脑，使用 `Dism++` 的更新管理里添加相应格式的每月更新包即可

   ![屏幕截图(45)](https://github.com/user-attachments/assets/cc847d2f-4d28-4531-be3b-975161d95305)

3. Adobe Flash Player 及 Windows Defender 的补丁可直接更新

   ![屏幕截图(47)](https://github.com/user-attachments/assets/2d200902-84d1-461b-8fe3-a901297e8883)

#### <font color="Red">相关链接</font>

[【教程】Lumia 950/XL 刷win10教程第一步-解锁](/2018/08/04/【教程】Lumia-950-XL-刷win10教程第一步-解锁)

[【教程】Lumia 950/XL 刷win10教程第二步-部署](/2018/08/05/【教程】Lumia-950-XL-刷win10教程第二步-部署)

[【教程】Lumia 950/XL 刷win10教程第三步-开机](/2018/08/06/【教程】Lumia-950-XL-刷win10教程第三步-开机)

[【教程】Lumia 950/XL 刷win10教程番外篇-离线更新](/2018/08/06/【教程】Lumia-950-XL-刷win10教程番外篇-离线更新)

[【讨论】给大家提供两个群，刷win10的聚在一起好讨论](http://bbs.wfun.com/thread-1014280-1-1.html)

[【资源】Lumia 950/XL 刷 Windows 10 ARM64 资源汇总](https://www.coolapk.com/feed/7152050?shareKey=N2JhMTYwYzk4MDNhNjY0NDcxODE)

> [【教程】Lumia 950 XL 刷win10教程第四步-优化](https://bbs.wfun.com/thread-1020998-1-1.html) 作者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2019年2月16日 发表于 [智机社区](https://bbs.wfun.com "WFun")，转载请注明出处
