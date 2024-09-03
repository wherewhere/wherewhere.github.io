---
title: Office 365 ProPlus部署教程
date: 2018-06-14 18:02:49
tags: [Office, Win10, 玩机, 教程, 资源]
categories: 玩机
banner: https://github.com/user-attachments/assets/2594f477-550f-4c54-b811-ea0d4d9971ec
---
![Office 365 新旧UI对比](https://github.com/user-attachments/assets/2594f477-550f-4c54-b811-ea0d4d9971ec)

<style>
  img.emoji {
    height: 20px;
    width: 20px;
    margin-bottom: -4px !important;
    display: unset;
  }
</style>

[#玩机技巧#](https://www.coolapk.com/t/玩机技巧) [#酷安夜话#](https://www.coolapk.com/t/酷安夜话) [#电脑玩家#](https://www.coolapk.com/t/电脑玩家) [铺路根据地](https://www.coolapk.com/dyh/1480)

欢迎关注 [@wherewhere](https://www.coolapk.com/u/wherewhere) 的铺路根据地 [查看链接»](https://www.coolapk.com/dyh/1480)，本次图文较长，如果第4步看不懂，可以跳过，不过会默认安装英文版32位Office。

#### 什么是Office 部署工具？

Office 部署工具 (ODT) 是一个命令行工具，可用于下载并将其部署到客户端计算机 Office 365 ProPlus。ODT 为您提供了更多的 Office 安装控制： 您可以定义哪些产品和安装语言、 应该如何更新这些产品是否显示安装到您的用户体验。

#### 下面教程开始

1. 从Microsoft 下载中心([查看链接»](http://go.microsoft.com/fwlink/p/?LinkID=626065))下载 Office 部署工具。

   <img src="https://github.com/user-attachments/assets/3ff2adcf-e968-4353-92b5-e29ebd1f0d23" alt="下载" />
   <figcaption>下载页面</figcaption>

2. 双击下载的工具，如下图，勾选“`Click here to...`”，点击“`Continue`”；

   <img src="https://github.com/user-attachments/assets/e2863ba9-e10e-4477-abcf-95566cb845fd" alt="启动" />
   <figcaption>打开</figcaption>

3. 该工具会释放两个我们需要的文件（`setup.exe`和`configuration.xml`），如下图所示，选择解压的目录，这里选择解压在桌面。<!--more-->

   <img src="https://github.com/user-attachments/assets/00bca0a4-c9b2-4cf0-b72e-c2a7bdb5175c" alt="文件夹选择" />
   <figcaption>浏览文件夹</figcaption>

4. 配置`configuration.xml`

   用记事本打开第3步解压得到的`configuration`文件

   <img src="https://github.com/user-attachments/assets/ce409084-d45d-43b2-a5da-7e22e28df845" alt="configuration" />
   <figcaption>configuration.xml</figcaption>

   默认内容为(联机安装完整的英文版32位Office 365 ProPlus，包括Visio，走每月通道)

   ```xml
   <Configuration>
     <Add OfficeClientEdition="32&quot; Channel="Monthly">
       <Product ID="O365ProPlusRetail">
         <Language ID="en-us" />
       </Product>
       <Product ID="VisioProRetail">
         <Language ID="en-us" />
       </Product>
     </Add>
     ...
   </Configuration>
   ```

   首先给出几个示例配置

   1. 联机安装完整的中文简体64位Office 365 ProPlus，包括Visio 和 Project ，走快速预览通道。

      ```xml
      <Configuration>
        <Add OfficeClientEdition="64" Channel="InsiderFast">
          <Product ID="O365ProPlusRetail">
            <Language ID="zh-cn" />
          </Product>
          <Product ID="VisioProRetail">
            <Language ID="zh-cn" />
          </Product> 
          <Product ID="ProjectProRetail">
            <Language ID="zh-cn" />
          </Product> 
          <Display Level="Full" 
                   AcceptEULA="TRUE" />
        </Add>
        ...
      </Configuration>
      ```

   2. 联机安装完整的中文简体64位Office 365 ProPlus，不包括Visio 和 Project，走快速预览通道。

      ```xml
      <Configuration>
        <Add OfficeClientEdition="64" Channel="InsiderFast">
          <Product ID="O365ProPlusRetail">
            <Language ID="zh-cn" />
          </Product> 
          <Display Level="Full" 
                   AcceptEULA="TRUE" />
        </Add>
        ...
      </Configuration>
      ```

   3. 联机安装中文简体64位Office 365 ProPlus，只包括Word、PowerPoint和Excel，走快速预览通道。

      ```xml
      <Configuration>
        <Add OfficeClientEdition="64" Channel="InsiderFast">
          <Product ID="O365ProPlusRetail">
            <Language ID="zh-cn" />
          </Product>
          <ExcludeApp ID="Access" />
          <ExcludeApp ID="Groove" />
          <ExcludeApp ID="InfoPath" />
          <ExcludeApp ID="Lync" />
          <ExcludeApp ID="OneNote" />
          <ExcludeApp ID="Outlook" />
          <ExcludeApp ID="Publisher" />
          <ExcludeApp ID="SharePointDesigner" /> 
          <Display Level="Full" 
                   AcceptEULA="TRUE" />
        </Add>
        ...
      </Configuration>
      ```

   4. 联机安装中文简体64位 Visio 和 Project，走快速预览通道。

      ```xml
      <Configuration>
        <Add OfficeClientEdition="64" Channel="InsiderFast">
          <Product ID="VisioProRetail">
            <Language ID="zh-cn" />
          </Product> 
          <Product ID="ProjectProRetail">
            <Language ID="zh-cn" />
          </Product> 
          <Display Level="Full" 
                   AcceptEULA="TRUE" />
        </Add>
        ...
      </Configuration>
      ```

   以上内容只需复制并替换`configuration.xml`中如图选择部分即可。

   <img src="https://github.com/user-attachments/assets/7cbc2bc9-905a-4c8a-8185-e0f741517da1" alt="选中部分" />
   <figcaption>复制并替换图中选择部分</figcaption>

   如果以上内容已经能够满足你的要求，那么你就可以跳到第5步了，如果没有，请继续阅读

   详细配置`configuration.xml`

   1. Add 元素(定义要下载或安装的产品和语言)

      示例：

      ```xml
      <Add SourcePath="\\Server\Share" 
            OfficeClientEdition="32"
            Channel="Broad" 
            Version="16.0.8201.2193"
            ForceUpgrade="FALSE">
        <Product ID="O365ProPlusRetail">
          <Language ID="en-us" />
          <Language ID="ja-jp" />
        </Product>
        <Product ID="VisioProRetail">
          <Language ID="en-us" />
          <Language ID="ja-jp" />
        </Product>
      </Add>
      ```

      - SourcePath 属性（属于 Add 元素）

        可选。当你有完整的Office镜像文件时，即可加载该镜像文件(Windows 8及以上双机镜像文件即可)，SourcePath的值便是镜像文件加载位置

        如`SourcePath="G:\"`

      - Version 属性（属于 Add 元素）

        可选。默认值为最新版本 Office。

        如`Version="16.0.8201.2193"`

      - OfficeClientEdition 属性（属于 Add 元素）

        必需。定义是下载或安装 32 位版还是 64 位版 Office 365 专业增强版。 

        允许值：

        ```
        OfficeClientEdition="64"
        OfficeClientEdition="32"
        ```

      - Channel 属性（属于 Add 元素）

        可选。更新通道，默认为Broad

        如

        ```
        Channel="Monthly"
        Channel="Broad"
        Channel="Targeted"
        ```

   2. Product 元素(定义要下载或安装的产品)

      示例

      ```xml
      <Product ID="O365ProPlusRetail">
        <Language ID="en-us" />
        <Language ID="ja-jp" />
      </Product>
      <Product ID="VisioProRetail">
        <Language ID="en-us" />
        <Language ID="ja-jp" />
      </Product>
      ```

      - ID 属性（属于 Product 元素）

        必需。定义要下载或安装的产品的 ID。 

        如：

        ```
        ID="O365ProPlusRetail" 
        ID="VisioProRetail"
        ID="ProjectProRetail"
        ```

   3. Language 元素(定义要下载或安装的语言)

      示例：

      ```xml
      <Product ID="O365ProPlusRetail">
        <Language ID="en-us" />
        <Language ID="ja-jp" />
      </Product>
      ```

      - ID 属性（属于 Language 元素）

        必需。定义要下载或安装的语言的 ID。

        如：

        ```
        ID="en-us"
        ID="ja-jp"
        ID="MatchOS"
        ```

   4. ExcludeApp 元素(定义不应安装的 Office 365 专业增强版产品) 

      示例:

      ```xml
      <Add SourcePath="\\Server\Share" 
            OfficeClientEdition="32"
            Channel="Broad" >
        <Product ID="O365ProPlusRetail">
          <Language ID="en-us" />
          <Language ID="ja-jp" />
          <ExcludeApp ID="Publisher" />
        </Product>
      </Add>
      ```

      - ID 属性（属于 ExcludeApp 元素）

        必需。定义不应安装的产品的 ID。
        允许值：

        ```
        ID="Access"
        ID="Excel"
        ID="Groove"
        ID="Lync"
        ID="OneDrive"
        ID="OneNote"
        ID="Outlook"
        ID="PowerPoint"
        ID="Publisher"
        ID="Word"
        ```

        注：对于 OneDrive for Business，请使用 Groove。对于 Skype for Business，请使用 Lync。

   如果想了解更多，请前往[Configuration options for the Office Deployment Tool](https://docs.microsoft.com/zh-cn/DeployOffice/configuration-options-for-the-office-2016-deployment-tool?redirectSourcePath=/zh-cn/article/Office-2016-部署工具的配置选项-d3879f0d-766c-469c-9440-0a9a2a905ca8)，如果看不懂，请跳过。

5. 以管理员身份CMD，运行下面的命令即可：

   ```cmd
   cd /d H:\office365 ::(这里填你解压的目录)
   setup.exe /configure configuration.xml
   ```

   <img src="https://github.com/user-attachments/assets/25007294-bdd2-4cf6-b0a7-2c1ef7bd6c81" alt="开始" />
   <figcaption>命令提示符</figcaption>

   然后就开始了

   <img src="https://github.com/user-attachments/assets/9c2d1982-ca17-4261-924e-1581f8cf07e5" alt="启动图" />
   <figcaption>开始</figcaption>

   由于我以经安装过64位的了，所以就报错了

   <img src="https://github.com/user-attachments/assets/128dcb9b-723f-4aa8-860d-5ebe1e2516eb" alt="报错弹窗" />
   <figcaption>报错</figcaption>

   如果你是首次安装，应该是这样

   <img src="https://github.com/user-attachments/assets/a53d7dcd-b8a5-4138-b612-da1f9eb7e625" alt="安装" />
   <figcaption>正在安装</figcaption>

   安装完成后长这样

   <img src="https://github.com/user-attachments/assets/d3187fed-6785-4386-a2f7-c3d001064c32" alt="引导" />
   <figcaption>安装完成</figcaption>

   <img src="https://github.com/user-attachments/assets/1f04ed96-07da-4bcb-9df4-284760755737" alt="完成" />
   <figcaption>命令提示符</figcaption>

6. 激活

   随便找了一个<img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />[查看链接»](https://www.coolapk.com/feed/3944296?shareKey=NzdlNjlmZWNlY2NmNjY1ZTEwY2M)

7. 更换通道与卸载

   下载[Office Tool Plus](https://otp.landian.la)自行解决
   [@萌萌哒Yerong](https://www.coolapk.com/u/萌萌哒Yerong) <img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" /><img class="emoji" src="https://raw.githubusercontent.com/Coolapk-UWP/Coolapk-Lite/master/CoolapkLite/CoolapkLite/Assets/Emoji/(流汗滑稽).png" alt="流汗滑稽" />

   <img src="https://github.com/user-attachments/assets/18bc3659-7f4e-407d-8316-bf7d1abb7a34" alt="Download Office" />
   <figcaption>Office Tool Plus</figcaption>

> [Office 365 ProPlus部署教程](https://www.coolapk.com/feed/6904874?shareKey=ODQxNzgzNGM1OWNkNjY1ZTBkMjA) 作者 [@wherewhere](https://www.coolapk.com/u/wherewhere) 2018年6月14日 发表于 [酷安](https://www.coolapk.com "Coolapk")，转载请注明出处
