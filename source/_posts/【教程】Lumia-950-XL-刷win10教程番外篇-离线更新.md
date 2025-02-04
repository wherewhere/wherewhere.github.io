---
title: 【教程】Lumia 950/XL 刷win10教程番外篇-离线更新
date: 2018-08-06 09:27:49
updated: 2018-08-06 22:27:00
updated_accuracy: minute
tags: [Lumia, Win10, WOA, 教程, 玩机]
categories: 玩机
banner: https://github.com/user-attachments/assets/206082f2-1c23-45e6-96f4-02096e0571fc
---
![【教程】Lumia 950/XL 刷win10教程番外篇-离线更新](https://github.com/user-attachments/assets/206082f2-1c23-45e6-96f4-02096e0571fc)

[#酷安夜话#](https://www.coolapk.com/t/酷安夜话) [#ROM杂谈#](https://www.coolapk.com/t/ROM杂谈) [#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [铺路根据地](https://www.coolapk.com/dyh/1480)

#### 在解锁之后，您的设备是无法在线更新Windows 10 Mobile的，所以这时就需要用的离线更新

![wp_ss_20180806_0003](https://github.com/user-attachments/assets/918baef0-0196-411b-9ab0-921a5876d965)
<figcaption class="figure">教程原文</figcaption>

1. 确保您的设备处于**10586.107**的未解锁状态

2. 下载OTC工具

   **下载地址: [http://uwp.cn/adv/statis/?uid=&u; ... s.aspx?id=56726](https://www.microsoft.com/en-us/download/details.aspx?id=56726)**

3. 运行 OTC 更新工具。在您看到此消息后，将您的设备连接到 PC。确保您的设备的日期时间正确，并且您的电脑必须连接到一个稳定的互联网连接。

   **OtcUpdater 8.2.0.0 Waiting for next device. Please connect a device via USB. Press q to quit.**

4. 将您的手机连接到 PC 后，工具将开始检查您手机上的更新。找到更新后，将开始将更新包下载到 OTC 升级工具的根安装目录中的文件夹中，名为 “`package`” 。

5. 下载完成后，手机将开始自动安装更新，然后重新启动。在设备重新启动后，关闭 OTC 更新应用程序并将软件包文件夹重命名为另一个名称 (最好的名称应该是主要 OS 版本，如**14393**、**15063**等)。

6. 更新安装完成后，您可以重复步骤 3 到 6 ，直到您完全更新完成。

7. 从所有存储的文件夹中删除 `UpdateDownloadInformation` 文件，或者将它们移到其他位置 (您不再需要它们)。

8. 在您获得了所有需要的更新后，你可以做您想做的事了。

9. 在您搞完事后，下载 `IUTool` 用来安装我们存储的脱机更新文件。

   **[https://download.microsoft.com/d ... CPTT_NT-x86-fre.msi](https://download.microsoft.com/download/8/1/6/816FE939-15C7-4185-9767-42ED05524A95/wdk/Installers/WP_CPTT_NT-x86-fre.msi)**

10. 安装 msi 文件。

11. 以管理员身份运行 cmd 并运行下面的命令:

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

    - **X64 system :**
      ```cmd
      cd "C:\Program Files (x86)\Windows Kits\10\Tools\bin\i386"
      ```
    - **X86 system :**
      ```cmd
      cd "C:\Program Files\Windows Kits\10\Tools\bin\i386"
      ```

12. 运行下面的命令:

    ```cmd
    iutool -v -p 离线更新文件所在文件夹的完整路径
    ```

13. 此命令将开始更新您的设备。您可以重复步骤12 的命令直到要停留在那里的更新。

更新愉快！

#### <font color="Red">相关链接：</font>

[【教程】Lumia 950/XL 刷win10教程第一步-解锁](/2018/08/04/【教程】Lumia-950-XL-刷win10教程第一步-解锁)

[【教程】Lumia 950/XL 刷win10教程第二步-部署](/2018/08/05/【教程】Lumia-950-XL-刷win10教程第二步-部署)

[【教程】Lumia 950/XL 刷win10教程第三步-开机](/2018/08/06/【教程】Lumia-950-XL-刷win10教程第三步-开机)

[【教程】Lumia 950 XL 刷win10教程第四步-优化](/2019/02/16/【教程】Lumia-950-XL-刷win10教程第四步-优化)

[【讨论】给大家提供两个群，刷win10的聚在一起好讨论](http://bbs.wfun.com/thread-1014280-1-1.html)

[【资源】Lumia 950/XL 刷 Windows 10 ARM64 资源汇总](https://www.coolapk.com/feed/7152050?shareKey=N2JhMTYwYzk4MDNhNjY0NDcxODE)

> [【教程】Lumia 950/XL 刷win10教程番外篇-离线更新](https://bbs.wfun.com/thread-1014293-1-1.html) 作者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2018年8月6日 发表于 [智机社区](https://bbs.wfun.com "WFun")，转载请注明出处
