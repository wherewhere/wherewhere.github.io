---
title: 如何查看Windows激活状态
date: 2018-06-10 21:44:04
tags: [Win10, 资源, 玩机, 教程, 转载]
categories: 玩机
banner: https://github.com/user-attachments/assets/793cc19b-19a5-4f40-9dd6-c0b91de41297
---
![如何查看Windows激活状态](https://github.com/user-attachments/assets/793cc19b-19a5-4f40-9dd6-c0b91de41297)

[#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [#电脑玩家#](https://www.coolapk.com/t/电脑玩家) [铺路根据地](https://www.coolapk.com/dyh/1480)

本图文用来补充之前的一个图文 ，方便大家激活后能够查看具体的激活情况。(相当于水贴<img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://coolapk-uwp.github.io/Coolapk-Lite/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />)

#### 第一种，粗略查看

这个很无聊，我就不说了，一个是进入 `设置`>`更新与安全`>`激活` 查看，一个是进入 `控制面板`>`系统安全`>`系统` 查看，没什么用。

![47882-7](https://github.com/user-attachments/assets/688e5a64-f365-42ae-93fb-259754fda844)

![56-1FHG41000-50-water](https://github.com/user-attachments/assets/3d7058f4-d70e-4e0d-ac23-c6185776bafa)

#### 第二种，具体查看

使用 `Windows + R` 组合快捷键打开运行命令框 

1. 运行：`slmgr.vbs -dlv`

   可以查询到Win10的激活信息，包括：激活ID、安装ID、激活截止日期等信息。

   <style>
     img.emoji {
      height: 20px;
      width: 20px;
      margin-bottom: -4px !important;
      display: inline;
     }
   </style>
   <!--more-->

   ![cc11728b4710b91245e6ec5bcffdfc039245226b](https://github.com/user-attachments/assets/b0c293bb-f159-498a-ad36-9e8d57d13aa0)

2. 运行：`slmgr.vbs -dli`

   可以查询到操作系统版本、部分产品密钥、许可证状态等。 

   ![e1fe9925bc315c605483714a81b1cb1349547704](https://github.com/user-attachments/assets/ff6e5cc9-6393-4660-90ec-1907b52baaa1)

3. 运行：`slmgr.vbs -xpr`

   可以查询激活时间。 

   ![5366d0160924ab18336dfb9239fae6cd7b890b1f](https://github.com/user-attachments/assets/95291d91-a84f-4254-9685-d1aaad897a78)

4. 运行：`winver`

   可以查询系统内核版本，以及注册用户信息。

   ![359b033b5bb5c9ea09bd1946d939b6003bf3b3cc](https://github.com/user-attachments/assets/aef545ff-bd91-4451-aa1e-bb2ffc5e73d9)

> [如何查看Windows激活状态](https://www.coolapk.com/feed/6850699?shareKey=OGJiZmViMTQ4OTQxNjY2NGEzZTE) 作者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2018年6月10日 发表于 [酷安](https://www.coolapk.com "Coolapk")，转载请注明出处
