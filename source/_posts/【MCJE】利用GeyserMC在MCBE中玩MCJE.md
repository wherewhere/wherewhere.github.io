---
title: 【MCJE】利用GeyserMC在MCBE中玩MCJE
date: 2020-11-17 08:35:39
tags: [MC, JE, BE, 教程, 游戏]
categories: 游戏
banner: https://github.com/wherewhere/wherewhere.github.io/assets/27689196/b332469e-9301-465a-91fd-fb589cb147f0
---
![【MCJE】利用GeyserMC在MCBE中玩MCJE](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/b332469e-9301-465a-91fd-fb589cb147f0)

[#Minecraft#](https://www.coolapk.com/t/Minecraft) [#我的世界#](https://www.coolapk.com/t/我的世界)

#### 前言

最近想加入一个JE服玩玩，正好加入了一个JE BE互通服，于是突发奇想，在手机上开一个Geyser服不就能玩Java版了吗？而且感觉比boat还好用，毕竟boat只能分配几百兆内存，运行1.12以上版本也不太稳定。

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/1bf88ec1-00a1-4688-9478-f301bb5ac8ea" alt="MCJE" />
<figcaption>在手机上玩JE</figcaption>

#### 注意事项

本教程默认阅读者具有一定Linux使用经验，本方案以Android搭配基于Linux Deployer的Ubuntu为例，本实例中Android版本号为10，Ubuntu版本号为21.04

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/a6a318f4-2b5b-418a-8468-2ffcef4423a2" alt="配置" />
<figcaption>配置详情</figcaption>

#### 配置环境<!--more-->

由于Geyser基于Java，所以我们需要先安装Java，非常简单，键入以下命令

```sh
sudo apt update
sudo apt install default-jre
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/86a169aa-c2a8-43f4-84e4-c8dea21406c1" alt="Java" />
<figcaption>安装Java</figcaption>

#### 下载必要文件

想要运行Geyser，就必须要下载Geyser，同时由于Geyser只是一个代理，我们还要下载JE服务端

输入命令回到根目录(或者你需要的目录)

```sh
cd
```

新建文件夹(以Geyser为例)

```sh
mkdir Geyser
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/486f65d0-48d2-4a0b-87d2-a71d2341806d" alt="文件夹" />
<figcaption>创建文件夹</figcaption>

进入文件夹

```sh
cd Geyser
```

下载Geyser(你可以使用其他方式下载)

```sh
wget https://ci.nukkitx.com/job/GeyserMC/job/Geyser/job/master/lastSuccessfulBuild/artifact/bootstrap/standalone/target/Geyser.jar
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/5ce3f54c-5231-4da1-a4fc-267567e6a930" alt="wget" />
<figcaption>获取Geyser</figcaption>

回到根目录(或你想要的目录)

```sh
cd
```

创建文件夹(以`Minecraft Java Server`为例)

```sh
mkdir "Minecraft Java Server"
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/664bee3e-0371-45ba-b7ef-3997faa6c7a7" alt="Minecraft Java Server" />
<figcaption>创建文件夹</figcaption>

进入文件夹

```sh
cd Minecraft\ Java\ Server/
```

下载JE服务端(以1.16.4为例)

```sh
wget https://launcher.mojang.com/v1/objects/35139deedbd5182953cf1caa23835da59ca3d7cd/server.jar
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/c5b6bdfd-6637-4437-a54c-d9805d837af2" alt="wget" />
<figcaption>下载服务端</figcaption>

#### 运行服务器

停留在当前路径，先配置JE服务器

输入以下命令启动服务器

```sh
Java -jar server.jar
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/2759f591-8265-4603-9c48-d8aae6a82278" alt="启动" />
<figcaption>启动服务器</figcaption>

这时终端会报错，这是因为你没有同意EULA，修改`eula.txt`(以vim为例)

```sh
vim eula.txt
```

将`false`修改为`true`

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/dd6e3897-aa47-4e95-97cf-6dfcdf1c041a" alt="eula.txt" />
<figcaption>修改<code>eula.txt</code></figcaption>

再次运行服务器，这时一切将会正常

```sh
Java -jar server.jar
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/75ce4e2f-548e-4346-b0f6-43b3afa023c4" alt="服务器" />
<figcaption>开启服务器</figcaption>

无需修改配置，新建一个终端，进入Geyser所在目录

```sh
cd Geyser
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/eb5c6c2b-635d-4fe4-ab90-f11fb00253ef" alt="文件夹" />
<figcaption>进入文件夹</figcaption>

启动Geyser

```sh
java -jar Geyser.jar
```

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/8829e231-bd28-4493-8edf-5fdd2dc891cf" alt="Geyser" />
<figcaption>启动Geyser</figcaption>

#### 进入Minecraft Java Edition

(如果你使用的是Windows 10，请先在PowerShell中运行以下命令

```ps1
CheckNetIsolation LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"
```

![Screenshot_20201116-235303](https://github.com/wherewhere/wherewhere.github.io/assets/27689196/053f23f6-c831-4df2-b540-28987caf3c64)

进入Minecraft，打开好友栏，其中将会出现Geyser

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/7184dbd6-fa8a-4aff-a447-66801b7bfbf4" alt="好友栏" />
<figcaption>Geyser</figcaption>

登录帐号

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/f5a05c74-4c2f-44e1-baaf-b9cd566062de" alt="登录" />
<figcaption>登录</figcaption>

尽情游玩吧

<img src="https://github.com/wherewhere/wherewhere.github.io/assets/27689196/97f6bc5e-6d3b-4038-bc86-db5c145609b1" alt="JE皮肤" />
<figcaption>可以加载JE皮肤</figcaption>

当然通过配置Geyser还可以登录其他的Java服务器，但是由于转译的不完善，可能会被反作弊插件判为作弊，本教程只简单介绍该方案的大致方法，若有疑问可以在评论区中提出，未来的某天可能会发布更高阶的教程，感谢大家的支持。

#### 参考资料

Geyser官方教程：[查看链接](https://github.com/GeyserMC/Geyser/wiki/Setup)

#### 推荐阅读

Geyser使用教程——通过它来实现基岩版进入Java版服务器，现已支持Java1.16.2：[查看链接](https://www.mcbbs.net/forum.php?mod=viewthread&tid=973002&highlight=)

> [【MCJE】利用GeyserMC在MCBE中玩MCJE](https://www.coolapk.com/feed/22991565?shareKey=ODBmYTQ0ZjFjZDNjNjY0N2FlMDc) 作者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2020年11月17日 发表于 [酷安](https://www.coolapk.com "Coolapk")，转载请注明出处
