---
title: 【转载】适用于Lumia950/XL的免解锁安装Windows10ARM64方案(测试)
date: 2018-10-02 00:05:00
date_accuracy: minute
updated: 2018-10-02 16:04:00
updated_accuracy: minute
tags: [Lumia, Win10, WOA, 资源, 玩机, 转载]
categories: 玩机
banner: https://github.com/user-attachments/assets/9bcc95cc-8843-45e7-9ba1-5113409e6edb
copyright_reprint: true
---
![【转载】适用于Lumia950/XL的免解锁安装Windows10ARM64方案(测试)](https://github.com/user-attachments/assets/9bcc95cc-8843-45e7-9ba1-5113409e6edb)

<span style="color: #999999;">作者: 匿名 责编: LeakerLand.S</span>

#### <span style="color: #3E65FF;">转载授权</span>

![wp_ss_20181002_0001 (2)](https://github.com/user-attachments/assets/9908d40d-2095-49b8-8e08-1110c041baa3)

#### <span style="color: #3E65FF;">注意事项</span>

此说明适用于lumia950系列免解锁（进行操作前请看完说明确定你已了解步骤再执行，建议做好备份工作）

本方案处于测试阶段，具体问题请加群（483021872）讨论

#### <span style="color: #3E65FF;">第一部分: 恢复至未上锁状态</span><!--more-->

1. 请准备一张大于64M空白tf卡，然后格式化为fat32，然后将附件中的sd启动解压至sd卡根目录，插进手机开机，若开机没有自动引导sd卡菜单，则需要重启手机，震动后长按音量键下进行引导

2. 进入大容量储存后，打开附带的“`PartitionGuru`”（以下简称pg）软件进行分区还原

3. 选择“`uefi分区`”，然后右键选择从映像文件还原分区，选择附带的“`950\xl-uefi.pmf`”（<span style="color: red;">请务必对应型号，不然变砖</span>） 

4. 完成后关机重启，挂载sd卡启动菜单，进入“`boot menu`”选择高级模式（“`advanced options`”），然后选择uefi选项，之后选择“`delete all variables`”清除所有变量

5. 然后请重启尝试启动wp系统，要是能成功进入系统，直接进行部署，要是蓝屏或其他原因不进系统，“**请必须硬重置wp系统**”（<span style="color: red;">不要刷机，这很关键</span>）

6. 到了这里，手机已是解锁状态

#### <span style="color: #3E65FF;">第二部分: 安装 Windows 10 ARM64</span>

完成以上步骤即可达到解锁效果，你可以选择两种方式安装WindowsARM 第一种就是利用安装工具进行部署（本附件不包含），第二种就是以下的手动部署，若工具部署失败 请按照以下方法手动部署

以下为手动部署方法

1. 进入大容量设定及双系统引导恢复

2. 打开pg后选择“`efiesp分区`”然后右键选择从映像文件还原分区 然后选择附带的“`efiesp-950\xl.pmf`”（<span style="color: red;">请务必对应型号 不然无法启动</span>）

3. 然后选择data分区右键选择调整分区大小，分配18g以上的空闲空间然后保存

4. 保存完成后在空闲空间创建“`boot分区`”，分区格式fat32，分区大小100M，然后保存并格式化，完成后选择该分区然后右键选择设置卷标，卷标为正常卷标，名字“`Boot`”

5. 然后将剩下的空闲空间创建“`WindowsARM分区`”，分区格式 NTFS 保存并格式化（切记创建此分区末端要剩下大于10M空闲空间），然后设置卷标为“`WindowsARM`”

6. 若因工具问题或其他原因安装不上或丢失win10arm并且有“`双系统引导`”以及“`WindowsARM以及boot分区`”可忽略以上分区创建及引导恢复操作

7. 以上操作完成后，准备好你的wim映像以及驱动，准备进行dism部署

8. 打开命令提示符（管理员），输入

   ```cmd
   dism /apply-image /imagefile:"wim映像路径" /index:1 /applydir:"Windows arm盘符"
   ```

   > 例 `dism /apply-image /imagefile:E:\install.wim /index:1 /applydir:H:`

   部署时间比较长，请耐心等待

9. 部署映像完成后，进行启动文件创建，输入命令

   ```cmd
   bcdboot "Windows arm盘符"\Windows /s "boot分区盘符" /f UEFI
   ```

   > 例 `bcdboot H:\Windows /s G: /f UEFI`

   等待提示启动文件创建成功

10. 然后进行驱动安装，输入命令

    ```cmd
    dism /image:"WindowsARM盘符"\ /add-driver /driver:"驱动目录路径" /recurse /forceunsigned
    ```

    > 例 `dism /image:H:\ /add-driver /driver:E:\Windows10ARM64\驱动\950 /recurse /forceunsigned`

    完成后继续往下操作

    （注：若部署的install映像已含驱动，无需执行驱动安装）

    若没在电脑上找到命令提示符，就在开始菜单右键 `打开Windows powershell（管理员）`并输入cmd

11. 完成以上步骤后，打开附带的“`BOOTICEx64`”选择“`bcd编辑`”，然后选择“`其他bcd文件`”，路径为boot分区下“`EFI\Microsoft\boot\bcd`”

12. 选择bcd文件后点击“`智能编辑模式`”，然后把“`禁用数字签名验证`”和“`测试模式`”打勾，点击保存全局设置，然后重启手机，等待oobe设置 

13. 若准备就绪蓝屏那就重启等待再次报错（Windows无法在此硬件上安装配置）报错也许有所偏差，然后手动触摸确定按钮实验触摸是否有效 

14. 若触摸无效请重新开始，若触摸有效请再次进入大容量储存模式 ，并且打开“`注册表编辑器`”

15. 注册表编辑器打开方法，在开始菜单右键，选择运行，输入“`regedit`”并运行，然后定位到“`HKEY_LOCAL_MACHINE`”

16. 然后点击左上角的文件，选择“`加载配置单元`”，加载路径为 Windows arm分区下“`Windows\system32\config\system`”，挂载需要命名请随意输入，例如：`123`

17. 挂载成功后，展开挂载的注册表项，定位到“`setup根目录`”，把所有带数字的项改为`0`，然后定位到挂载的根目录（如定位到123），然后点击左上角文件，卸载配置单元

18. 之后打开dism++，点击左上角文件，选择添加路径，选择Windows arm分区并确认 

19. 等待加载完成后打开会话，选择“`工具箱`”->“`账户管理`”，选择“`administrator`”并启用账户以及启用最后面的WDAG开头的账户名 

20. 之后点击左上角的文件选择“`卸载映像`”完成后重启即可直接进入桌面 

#### <span style="color: #3E65FF;">附件</span>

Lumia 950s 免解锁刷机
[百度网盘](https://pan.baidu.com/s/16XhsG91QNn7eq_k1VyMLLw) 密码：`L950`

> [【搬运】适用于 Windows 10 Mobile 的修改版 Microsoft 应用程序](https://bbs.wfun.com/thread-1017998-1-1.html) 转载者 [@wherewhere](https://bbs.wfun.com/u/2850357) 2018年10月2日 转载于 [智机社区](https://bbs.wfun.com "WFun")
