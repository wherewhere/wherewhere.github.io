---
title: Windows + Linux ≈ 1 ―― Windows运行Linux应用(GUI)教程
date: 2018-06-07 20:50:06
tags: [Linux, Win10, WSL, 资源, 教程, 玩机]
categories: 玩机
banner: https://github.com/user-attachments/assets/6099d70a-0be9-4025-ac1d-6e7837fcd0fa
---
![Windows + Linux ≈ 1 ―― Windows运行Linux应用(GUI)教程](https://github.com/user-attachments/assets/6099d70a-0be9-4025-ac1d-6e7837fcd0fa)

<style>
  img.emoji {
    height: 20px;
    width: 20px;
    margin-bottom: -4px !important;
    display: unset;
  }
</style>

[#电脑玩家#](https://www.coolapk.com/t/电脑玩家) [#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [#酷安夜话#](https://www.coolapk.com/t/酷安夜话)
 
欢迎关注铺路根据地：[查看链接»](https://www.coolapk.com/dyh/1480)

<img src="https://github.com/user-attachments/assets/92102dcd-529e-483f-bc65-db990f04739f" alt="屏幕截图(12)2" />
<figcaption>Windows-Linux</figcaption>

看到这个，很多人会问我：“咦？你从哪搞的高仿Windows主题？”或者“咦？你从哪搞的Linux主题？”当然，这都是小白<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />，仔细看了的都会发现任务栏上有一个Ubuntu图标和一个Xming图标。没错，这就是适用于Linux的Windows子系统了<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />。

那么这是怎么做到的呢？你可以去看 [查看链接»](https://www.ithome.com/html/win10/217734.htm) 和 [查看链接»](https://www.ithome.com/html/win10/353700.htm) 或者继续往下看<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />。

实际上很简单，不过首先你需要一台Windows设备<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />，商店里Linux很多，光Ubuntu就有三个了<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />，[查看链接»](https://www.microsoft.com/zh-cn/store/p/ubuntu/9nblggh4msv6)，这是最稳定的Ubuntu，当然你也可以选择其他的Linux<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />。

<img src="https://github.com/user-attachments/assets/f8a4985f-abcd-4922-ad54-b73815c115fb" alt="20180601_073605_905" />
<figcaption>三个Ubuntu</figcaption>

下载就不用我说了，打开Linux，第一次进入需要先配置一下，说是几分钟，我似乎等了有一个小时<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(阴险).png" alt="阴险" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(阴险).png" alt="阴险" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(阴险).png" alt="阴险" />。<!--more-->

<img src="https://github.com/user-attachments/assets/4f84d3e1-b54e-438a-a363-645b03ff91f9" alt="20180402_225823_248" />
<figcaption>配置Debian</figcaption>

用户名和密码随便填，记不记得住就不光我事了<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />。

在等待的同时，先让我们干点其他事<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />。

前往 [查看链接»](https://xming.en.softonic.com/?ex=REG-60.2) 下载并安装Xming，这里没有什么好说的，如果网慢的话，装完Linux也就装完了

现在回到Linux，这些Linux的软件源基本都很慢，源可以手动改，具体位置每个Linux都不一样，一般都在`C:\Users\用户名\AppData\Local\Packages\Linux包名\LocalState\rootfs\etc\apt`，比如Debian就在`C:\Users\username\AppData\Local\Packages\TheDebianProject.DebianGNULinux_76v4gfsz19hv4\LocalState\rootfs\etc\apt`

具体源我就不给了，这是原教程里提供的：

```sh
deb https://mirrors.ustc.edu.cn/debian/ stretch main contrib non-free
# deb-src https://mirrors.ustc.edu.cn/debian/ stretch main contrib non-free

deb https://mirrors.ustc.edu.cn/debian/ stretch-updates main contrib non-free
# deb-src https://mirrors.ustc.edu.cn/debian/ stretch-updates main contrib non-free

deb https://mirrors.ustc.edu.cn/debian-security/ stretch/updates main contrib non-free
# deb-src https://mirrors.ustc.edu.cn/debian-security/ stretch/updates main contrib non-free
```

按照常规操作就是更新源和组件了
照常两行命令：

```sh
sudo apt update
sudo apt upgrade
```

在这里注意一下，这里有个坑，因为是https协议的，但Win10的Debian子系统，并没有安装`apt-transport-https`，直接更新会报错，建议第一次更新先使用http协议或者官方源，在装完`apt-transport-https`之后，再使用1.2中https协议的软件源（Debian的buster以上分支也不需要，stable类的分支必须先安装`apt-transport-https`才能使用https协议的软件源，使用https协议可以有效防止运营商劫持）。

<img src="https://github.com/user-attachments/assets/1dce677d-1b10-4512-9ed3-5c7b752f5f57" alt="1528373475806" />
<figcaption>更新源</figcaption>

如果你仅仅只想运行一下Linux应用，那么你现在就可以安装应用了，以Firefox为例

运行

```sh
sudo apt install firefox
```

等码刷完

在这同时，可以先打开之前装好的Xming，如果已经打开了，就不用管它了，全部默认就行。

确定OpenSSH已经安装

在终端执行：

```sh
sudo apt-get install openssh-server
```

要是如下图这样，那就是没有安装，输入`y`确认就是了：

![20180402_230719_338](https://github.com/user-attachments/assets/1d3a180f-0718-4126-b098-6736baf8ae61)

如果你用的是Ubuntu，只需要回到Linux，执行`DISPLAY=:0 firefox`即可，等待几秒，Firefox就会弹出来。

<img src="https://github.com/user-attachments/assets/692030dd-fa7e-4d69-a1fc-dfea25b6919b" alt="屏幕截图(14)2" />
<figcaption>Firefox</figcaption>

如果是Debian，安装完xming之后你会发现并不能像Ubuntu一样运行DISPLAY=:0 firefox指令来启动Debian的应用程序，提示找不到DISPLAY方法，那是没有配置ssh相关内容，我们需要做如下配置：

1. 打开`${HOME}/.bashrc`文档，在最后面加入：

   ```sh
   if [ -d "${HOME}/bin" ] ; then
       export? PATH="${PATH}:${HOME}/bin"
       if [ -f "${HOME}/bin/ssh_login" ] ; then
           . "${HOME}/bin/ssh_login"
       fi
   fi
   ```

2. 在`${HOME}/bin/`文件夹下新增`ssh_login¢文件（bin文件夹没有就新建一个），内容如下：

   ```sh
   if [ -n "${SSH_CLIENT}" ] ; then
       if [ -z "${DISPLAY}" ] ; then
           export DISPLAY='localhost:10'
       fi
   fi
   ```

3. 给`ssh_login`文件`777`权限，代码：

   ```sh
   sudo chmod 777 ${HOME}/bin/ssh_login
   ```

   <img src="https://github.com/user-attachments/assets/f6990683-6285-495e-8d71-e5a188cd780c" alt="20180402_230906_390" />
   <figcaption>取自IT之家</figcaption>

   <img src="https://github.com/user-attachments/assets/78011ddb-8bc2-4b4c-ae76-a33d6ce7c0a0" alt="20180402_230918_3" />
   <figcaption>取自IT之家</figcaption>

   <img src="https://github.com/user-attachments/assets/df527c33-bd49-4f97-93f6-509a7608d050" alt="20180402_230928_542" />
   <figcaption>取自IT之家</figcaption>

随后，执行`DISPLAY=:0 firefox`就不会报错了。

如果你想玩一个更加完整的Linux，今天就不说了，你可以直接查看IT之家的 [查看链接»](https://www.ithome.com/html/win10/353700.htm) 或者等我下次发帖，欢迎关注[@wherewhere](https://www.coolapk.com/u/wherewhere)的铺路根据地 [查看链接»](https://www.coolapk.com/dyh/1480)，若有错误欢迎大家指正<img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://cdn.jsdelivr.net/gh/Coolapk-UWP/Coolapk-Lite@master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />。

> [Windows + Linux ≈ 1 ―― Windows运行Linux应用(GUI)教程](https://www.coolapk.com/feed/6811907?shareKey=NDlhYWZkYzgyOTEwNjY2MGEyZjg) 作者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2018年6月7日 发表于 [酷安](https://www.coolapk.com "Coolapk")，转载请注明出处
